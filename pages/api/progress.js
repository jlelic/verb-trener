import Cookies from 'cookies'
import dbClient from '/lib/mongodb'
import {ObjectID} from 'bson'
import getLoggedInUser from '../../lib/get-logged-in-user'
import {isCI} from 'next/dist/telemetry/ci-info'
import {getNextTime} from '../../lib/spacial-repetiton'

export default async function index(req, res) {
    if (req.method === 'POST') {
        const client = await dbClient
        const user = await getLoggedInUser(req)
        if (!user) {
            res.json({ok: false, error: 404, errorMessage: 'User not found'})
        }
        const userId = ObjectID(user._id)

        const db = client.db('norsk')
        const words = db.collection('words')

        const {result} = JSON.parse(req.body)
        const correctWordsUids = result.filter(r => r.correct === 2).map(r => r.uid)
        const wordsToIncrementCursor = await words.find({
            user: userId, wordUid: {
                $in: correctWordsUids
            }
        })
        const wordsToIncrement = await wordsToIncrementCursor.toArray()
        const consMap = {}
        wordsToIncrement.forEach(w => {
            consMap[w.wordUid] = w.consecutive
        })
        const wordsToReset = result
            .map(r => {
                return {
                    updateOne: {
                        filter: {wordUid: r.uid, user: userId},
                        update: r.correct === 2 ?
                            {
                                $inc: {consecutive: 1},
                                $set: {
                                    preteritum: null,
                                    perfektum: null,
                                    time: getNextTime(r.uid, (consMap[r.uid] + 1) || 1)
                                }
                            } : {
                                $set: {
                                    consecutive: 0,
                                    preteritum: r.preteritum,
                                    perfektum: r.perfektum,
                                    time: getNextTime(r.uid, 0)
                                }
                            },
                        upsert: true
                    }
                }
            })
        const updateResult = await words.bulkWrite(wordsToReset)
        const ok = updateResult.ok
        res.json({ok})
    } else {

    }
}
