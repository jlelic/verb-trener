import { EOL } from 'os'
import * as fs from 'fs'
import { parse } from 'fast-csv'

import VERBS_CSV from './verbs.csv'

const headers = VERBS_CSV[0]
const verbs = []
let lastVerb
VERBS_CSV.forEach((row,i) => {
    if(i == 0) {
        return
    }
    const inflections = {id: row[5], forms: [row[2], row[3], row[4]]}
    const verb = {
        id: row[0],
        infinitiv: row[1],
        inflections: [inflections],
    }
    if(!lastVerb || lastVerb.id != verb.id || lastVerb.infinitiv != verb.infinitiv) {
        verbs.push(verb)
    } else {
        lastVerb.inflections.push(inflections)
    }
    lastVerb = verb
})

const getRandomSubarray = (arr, size) => {
    let shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export async function getVerbs (num) {
    // await readCsv()
    return getRandomSubarray(verbs, num)
}
