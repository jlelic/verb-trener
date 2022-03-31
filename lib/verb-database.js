import VERB_JSON from './verbs.json'
import dbClient from './mongodb'
import {ObjectID} from 'bson'
import {generateQuestionsForMistakes} from './question-generator'

let markedIds = new Set()
let lastUid = 0
VERB_JSON.forEach(v => {
    v.uid = lastUid++
})
console.log(VERB_JSON.length)

const getRandomSubarray = (arr, size) => {
    let shuffled = arr.slice(0), i = arr.length, temp, index
    while (i--) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
    }
    return shuffled.slice(0, size)
}

export const allVerbs = VERB_JSON

export async function getMistakeVerbs(count, user) {
    const client = await dbClient
    const userId = ObjectID(user._id)
    const db = client.db('norsk')
    const words = db.collection('words')
    const mistakesCursor = await words.find(
        {
            user: userId,
            consecutive: 0,
        },
        {
            sort: 'time',
            limit: count
        }
    )
    const result = []
    for await (const m of mistakesCursor) {
        result.push({
            ...allVerbs[m.wordUid],
            consecutive: 0
        })
    }

    return result
}

export async function getVerbs(count, difficulty, user) {
    difficulty = difficulty || VERB_JSON.length
    if (user) {
        const client = await dbClient
        const userId = ObjectID(user._id)
        const db = client.db('norsk')
        const words = db.collection('words')

        const seenCursor = await words.find({
            wordUid: { $lt: difficulty },
            user: userId
        })
        const infoMap = {}
        for await (const m of seenCursor) {
            infoMap[m.wordUid] = {
                consecutive: m.consecutive,
                time: m.time
            }
        }
        const seenCount = Object.keys(infoMap).length

        if (seenCount === 0) {
            return getRandomSubarray(allVerbs.slice(0, difficulty), count)
        }

        const timeZero = { time: 0 }
        const sortedCandidates = allVerbs
            .slice(0, difficulty)
            .sort((a, b) => (infoMap[a.uid] || timeZero).time - (infoMap[b.uid] || timeZero).time)


        if (seenCount === difficulty) {
            return sortedCandidates.slice(0, count)
        }

        const unseenCount = difficulty - seenCount
        const useUnseen = Math.min(~~(0.8 * count), unseenCount)
        const useSeen = count - useUnseen
        const chosenUnseen = getRandomSubarray(sortedCandidates.slice(0, unseenCount), useUnseen)
        const chosenSeen = sortedCandidates
            .slice(unseenCount, unseenCount + useSeen)
            .map(v => ({ ...v, consecutive: infoMap[v.uid].consecutive }))
        const result = chosenUnseen.concat(chosenSeen)
        return result
    }
    return getRandomSubarray(VERB_JSON.slice(0, difficulty), count)
    // await readCsv()
}
