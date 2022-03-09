import {generateInflections} from './inflection-generator'


const OPTIONS_NUM = 4

const shuffle = array => array.sort(() => 0.5 - Math.random())
const pickInflections = (inflId) => [...(shuffle(Object.keys(InflectionGenerator)
    .filter(iId => iId != inflId))
    .slice(0, 3)),
    inflId
]

//ANY inflectionTableRows.definition.rowName = "v." && inflectionTableRows.@count = 6

const generateOptions = (verb, form, inflections) => {
    const index = form == 'preteritum' ? 1 : 2
    const correctSet = new Set()
    verb.inflections.forEach(infl => correctSet.add(infl.forms[index]))
    const wrongOptions = [...inflections]
        .filter(i => !correctSet.has(i))
        .map(i => ({correct: false, inflection: i}))
    const correctOptions = [...correctSet].map(i=> ({correct: true, inflection: i}))
    return shuffle(
        [
            ...correctOptions,
            ...shuffle(wrongOptions).slice(0, OPTIONS_NUM - correctSet.size)
        ]
    )
}

const generateQuestions = (verbs) => verbs.map((verb) => {
    const inflId = verb.inflId
    const [preteritumInflections, perfektumInflections] = generateInflections(verb.infinitiv)

    const preteritumOptions = generateOptions(verb, 'preteritum', preteritumInflections)
    const perfektumOptions = generateOptions(verb, 'perfektum', perfektumInflections)
    return {verb, preteritumOptions, perfektumOptions}
})

export {generateQuestions}
