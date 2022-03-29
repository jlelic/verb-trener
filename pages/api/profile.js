import Cookies from 'cookies'
import dbClient from '/lib/mongodb'
import {getNextTime} from '../../lib/spacial-repetiton'

export default async function index(req, res) {
    if (req.method === 'PUT') {
        const client = await dbClient
        const cookies = new Cookies(req, res)
        const db = client.db('norsk')
        const users = db.collection('users')
        const {name, result} = JSON.parse(req.body)
        const fullName = name.length > 0 ? `${name}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}` : (Math.random() * 10000).toString().padStart(4, '0')
        const user = await users.insertOne(
            {name, fullName}
        )

        const wordsToInsert = result.map(r =>
            ({
                wordUid: r.uid,
                user: user.insertedId,
                consecutive: r.correct ? 1 : 0,
                preteritum: r.preteritum,
                perfektum: r.perfektum,
                time: getNextTime(r.uid, r.correct ? 1 : 0)
            })
        )
        const words = db.collection('words')
        await words.insertMany(wordsToInsert)

        const sessions = db.collection('sessions')
        const sessionRecord = await sessions.insertOne({
            user: user.insertedId,
        })


        cookies.set('sid', sessionRecord.insertedId, {expires: false})
        res.json({ok: true, name, fullName})
    } else {

    }
}
