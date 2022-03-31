import getLoggedInUser from '/lib/get-logged-in-user'
import {ObjectID} from 'bson'
import dbClient from '/lib/mongodb'
import {generateQuestionsForMistakes} from '../lib/question-generator'
import TestSummary from '/compoments/test-summary'
import styles from '/styles/Home.module.css'
import React from 'react'
import Header from '/compoments/header'


export async function getServerSideProps(context) {
    const {req, res} = context
    const user = await getLoggedInUser(req)
    if (!user) {
        return {props: {}}
    }
    const userId = ObjectID(user._id)

    const client = await dbClient
    const db = client.db('norsk')
    const words = db.collection('words')
    const mistakesCursor = await words.find(
        {consecutive: 0, user: userId},
        {limit: 12, sort: 'time'},
    )
    const mistakes = await mistakesCursor.toArray()
    const questions = generateQuestionsForMistakes(mistakes)
    const answers = []
    mistakes.forEach(m => {
        answers.push(m.preteritum)
        answers.push(m.perfektum)
    })
    return {
        props: {
            user,
            reviewTest: {
                questions,
                answers,
            }
        }
    }
}

export default function Review(props) {
    const {reviewTest = {}} = props
    if (!reviewTest || reviewTest.questions.length === 0) {
        return <div>
            No mistakes to review!
        </div>

    }
    return <div className={styles.container}>
        <Header>
            Your previous mistakes
        </Header>
        <main className={styles.main}>
            <div style={{minHeight: '80px'}}></div>
            <TestSummary {...reviewTest}/>
        </main>
    </div>
}
