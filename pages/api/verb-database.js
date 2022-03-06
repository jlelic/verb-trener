import { EOL } from 'os'
import * as fs from 'fs'
import { parse } from 'fast-csv'

import VERBS_CSV from './verbs.csv'

const headers = VERBS_CSV[0]
const verbs = []
VERBS_CSV.forEach((row,i) => {
    if(i == 0) {
        return
    }
    const verb = {}
    headers.forEach((header,j) => {
        verb[header] = row[j]
    })
    verbs.push(verb)
})
let loaded = false

const sleep = ms => new Promise(r => setTimeout(r, ms));



// const readCsv = async () => {
//     if(verbs.length > 0) {
//         return verbs
//     }
//     console.log('Starting reading')
//     return new Promise((resolve, reject) => {
//         fs.createReadStream('pages/api/verbs.csv')
//             .pipe(parse({headers: true}))
//             .on('error', error => {
//                 console.error(error)
//                 reject()
//             })
//             .on('headers', row => headers = row)
//             .on('data', row => verbs.push(row))
//             .on('end', (rowCount) => {
//                 resolve()
//                 console.log('Finished reading')
//             });
//     })
// }

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
