import InflectionGenerator from './inflection-generator'


const shuffle = array => array.sort(() => 0.5 - Math.random());
const pickInflections = (inflId) => [...(shuffle(Object.keys(InflectionGenerator)
    .filter(iId => iId != inflId))
    .slice(0,3)),
    inflId
]

const generateQuestions = (verbs) => verbs.map((verb) => {
    const inflId = verb.inflId
    const picked = pickInflections(inflId)
    const preteritumOptions = shuffle(picked
        .map(iId => {
            console.log(iId)
            return ({
            inflId: iId,
            correct: iId == inflId,
            inflection: InflectionGenerator[iId](verb.infinitiv).preteritum
        })}))
    const perfektumOptions = shuffle(pickInflections(inflId)
        .map(iId => ({
            inflId: iId,
            correct: iId == inflId,
            inflection: InflectionGenerator[iId](verb.infinitiv).perfektum
        })))
    return {verb, preteritumOptions, perfektumOptions}
})

export {generateQuestions}
