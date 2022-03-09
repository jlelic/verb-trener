import {getVerbs} from './verb-database'
import {generateQuestions} from './question-generator'

const generateTest = async (numQuestions) => {
    numQuestions = 5 || numQuestions
    const verbs = await getVerbs(numQuestions)
    return {numQuestions, questions: generateQuestions(verbs)}
}

export {generateTest}
