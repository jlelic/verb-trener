import styles from '../styles/Home.module.css'
import {useState} from 'react'
import {generateTest} from './api/test-generator'
import Head from 'next/head'

export async function getServerSideProps(context) {
    return {
        props: {test: await generateTest(10)}, // will be passed to the page component as props
    }
}

export default function Test(props) {
    const {test} = props
    const [questionNum, setQuestionNum] = useState(0)
    const [correctNum, setCorrectNum] = useState(0)
    const [finished, setFinished] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [isPreteritumPhase, setPreteritumPhase] = useState(true)
    const phaseName = isPreteritumPhase ? 'preteritum' : 'perfektum'

    if(questionNum == test.numQuestions) {
        return <div className={styles.container}>
            <h1>Finished</h1>
            <main className={styles.main}>
                Correct: {correctNum/2} / {test.numQuestions}
            </main>
        </div>
    }

    return <div className={styles.container}>
        <Head>
            <title>Verb Test</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main className={styles.main}>
            <p>
                {questionNum}/{test.numQuestions}
            </p>
            <p>
                What is {phaseName} of
            </p>
            <h1 className={styles.title}>
                {test.questions[questionNum].verb.infinitiv}
            </h1>

            {
                answered && <div>
                    <br/><br/>
                    <div className={correct ? styles.correct : styles.incorrect}>
                        {correct ? 'Correct!' : 'Incorrect!'}
                    </div>
                    <br/>
                    Answer:
                    <h2 className={correct ? styles.correct : styles.incorrect}>
                        {test.questions[questionNum].verb[phaseName]}
                    </h2>
                </div>
            }

            <div className={styles.footer}>
                {
                    answered ?
                        <div
                            className={styles.card}
                            onClick={() => {
                                if(!isPreteritumPhase) {
                                    setQuestionNum(questionNum+1)
                                }
                                setAnswered(false)
                                setPreteritumPhase(!isPreteritumPhase)
                            }
                            }
                        >
                            <h2>Next</h2>
                        </div> :
                        <div className={styles.grid + ' ' + styles.footer}>
                            {
                                test.questions[questionNum][phaseName + 'Options'].map(option =>
                                    <div
                                        onClick={() => {
                                            setCorrect(option.correct)
                                            setAnswered(true)
                                            if(option.correct) {
                                                setCorrectNum(correctNum+1)
                                            }
                                        }}
                                        className={styles.option}
                                        key={option.inflection}>
                                        {option.inflection}
                                    </div>)
                            }
                        </div>}
            </div>
        </main>
        <div className={styles.footer}>
        </div>
    </div>
}
