import {generateInflections} from './inflection-generator'
import {allVerbs} from './verb-database'


const OPTIONS_NUM = 6
const POPULAR_COUNT_RATIO = 0.25

const shuffle = array => array.sort(() => 0.5 - Math.random())
const pickInflections = (inflId) => [...(shuffle(Object.keys(InflectionGenerator)
    .filter(iId => iId != inflId))
    .slice(0, 3)),
    inflId
]

//ANY inflectionTableRows.definition.rowName = "v." && inflectionTableRows.@count = 6

const generateOptions = (verb, form) => {
    const index = form == 'preteritum' ? 1 : 2
    const correctSet = new Set()
    verb.inflections.forEach(infl => {
        correctSet.add(infl.forms[index])
    })
    const sortedCorrect = [...correctSet]
        .map(word => ({word, count: (verb[form + 'Counts'] || {})[word] || 1}))
        .sort((a, b) => b.count - a.count)
    const popularCorrect = sortedCorrect
        .filter(x => x.count / sortedCorrect[0].count > POPULAR_COUNT_RATIO)
        .map(x => x.word)

    if (popularCorrect.length === 0) {
        debugger
    }
    const allInflections = generateInflections(verb, form, popularCorrect)
    const wrongOptionsInflections = [...allInflections]
        .filter(i => i)
        .filter(i => !correctSet.has(i))
    const wrongOptions = wrongOptionsInflections.map(i => ({correct: false, inflection: i}))

    const correctOptions = popularCorrect.map(i => ({correct: true, inflection: i}))
    return shuffle(
        [
            ...correctOptions,
            ...shuffle(wrongOptions.slice(0, OPTIONS_NUM * 2)).slice(0, OPTIONS_NUM - popularCorrect.length)
        ]
    )
}

const generateQuestions = (verbs) => verbs.map((verb) => {
    // const preteritumInflections = generateInflections(verb, 'preteritum')
    const preteritumOptions = generateOptions(verb, 'preteritum')

    const perfektumOptions = generateOptions(verb, 'perfektum')

    return {verb, preteritumOptions, perfektumOptions}
})

const generateQuestionsForMistakes = (mistakes) => mistakes
    .map(m => ({verb: allVerbs[m.wordUid]}))

export {generateQuestions, generateQuestionsForMistakes}
