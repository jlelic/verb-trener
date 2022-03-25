import VERB_JSON from './verbs.json'

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

export async function getVerbs(num, difficulty) {
    if (!difficulty) {
        return getRandomSubarray(VERB_JSON, num)
    }
    return getRandomSubarray(VERB_JSON.slice(0, difficulty), num)
    // await readCsv()
}
