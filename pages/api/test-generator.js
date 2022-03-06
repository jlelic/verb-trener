import {getVerbs} from './verb-database'
import {generateQuestions} from './question-generator'

const generateTest = async (numQuestions) => {
    numQuestions = 10 || numQuestions
    const verbs = await getVerbs(numQuestions)
    return {numQuestions: 10, questions: generateQuestions(verbs)}
}

export {generateTest}
