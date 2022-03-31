import {getVerbs, getMistakeVerbs} from './verb-database'
import {generateQuestions} from './question-generator'



export const generateReviewTest = async (count, user) => {
    const verbs = await getMistakeVerbs(count, user)
    const test = {numQuestions: verbs.length, questions: generateQuestions(verbs)}
    return test
}


export const generateTest = async (numQuestions, difficulty, user) => {
    numQuestions = numQuestions || 5
    const verbs = await getVerbs(numQuestions, difficulty, user)
    const test = {numQuestions, questions: generateQuestions(verbs)}
    return test
}
