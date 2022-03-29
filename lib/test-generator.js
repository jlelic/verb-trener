import {getVerbs} from './verb-database'
import {generateQuestions} from './question-generator'

const generateTest = async (numQuestions, difficulty, user) => {
    numQuestions = numQuestions || 5
    const verbs = await getVerbs(numQuestions, difficulty, user)
    const test = {numQuestions, questions: generateQuestions(verbs)}
    return test
}

export {generateTest}
