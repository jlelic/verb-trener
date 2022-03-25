import '../node_modules/animate.css/animate.css'
import styles from '../styles/Home.module.css'
import {useRef, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import WordSummary from '/compoments/word-summary'
import TestSummary from '/compoments/test-summary'
import clsx from 'clsx'


const PRETERITUM = 'preteritum'
const PERFEKTUM = 'perfektum'
const TRANSITION_TIME = 450

export default function Test(props) {
    const {test} = props
    const [questionNum, setQuestionNum] = useState(0)
    const [correctNum, setCorrectNum] = useState(0)
    const [showWordSummary, setShowWordSummary] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [answers, setAnswers] = useState([])
    const [isPreteritumPhase, setPreteritumPhase] = useState(true)
    const phaseName = isPreteritumPhase ? PRETERITUM : PERFEKTUM

    const exitButtonRef = useRef(null)

    console.log(test)

    const nextQuestion = () => {
        setShowWordSummary(false)
        if (!isPreteritumPhase) {
            setQuestionNum(questionNum + 1)
        }
        setAnswered(false)
        setPreteritumPhase(!isPreteritumPhase)
    }

    const verb = test.questions[questionNum].verb
    const presens = verb.inflections.sort((a, b) => {
        (verb.presensCounts[b.forms[0]] || 0) - (verb.presensCounts[a.forms[0]] || 0)
    })[0].forms[0]

    if (questionNum == test.numQuestions) {
        setTimeout(() => {
            document.getElementById('exitTextButton').scrollIntoView({
                behavior: 'smooth'
            })
        }, 900)
        return <div className={styles.container}>
            <main className={styles.main}>
                <h1>Finished</h1>
                <TestSummary questions={test.questions} answers={answers}/>
                <h2 className="animate__animated animate__jackInTheBox animate__delay-1s">
                    Correct: {Math.round(correctNum * 50 / test.numQuestions)}%
                </h2>
                <Link href="/" innerRef={exitButtonRef}>
                    <a id="exitTextButton" className={styles.card}>
                        <p>Go back</p>
                    </a>
                </Link>
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
                {questionNum + 1}/{test.numQuestions}
            </p>
            {
                showWordSummary ? <><WordSummary
                        verb={test.questions[questionNum].verb}
                        answeredPreteritum={answers[questionNum * 2]}
                        answeredPerfektum={answers[questionNum * 2 + 1]}
                    />
                        <div className={styles.footer}>
                            <div className={styles.option} onClick={nextQuestion}>
                                Next
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div>
                            What is&nbsp;
                            <div
                                id={phaseName + questionNum}
                                className={clsx(answered || 'animate__animated animate__pulse', styles.phaseName)}
                            >
                                {phaseName}
                            </div>
                            &nbsp;of{presens}
                        </div>
                        <h1 className={styles.title}>
                            {presens}
                        </h1>


                        <div className={styles.footer}>

                            <div className={styles.grid + ' ' + styles.footer}>
                                {
                                    test.questions[questionNum][phaseName + 'Options'].map(option =>
                                        <div
                                            className={clsx(
                                                styles.option,
                                                answered && option.inflection == answers[answers.length - 1] && 'animate__animated animate__fadeOut',
                                                answered && option.inflection != answers[answers.length - 1] && 'animate__animated animate__fadeOutRight',
                                                !answered && 'animate__animated animate__fadeIn',
                                            )}

                                            onClick={() => {
                                                if (answered) {
                                                    return
                                                }
                                                setAnswered(true)
                                                if (option.correct) {
                                                    setCorrectNum(correctNum + 1)
                                                }
                                                setAnswers([...answers, option.inflection])
                                                window.setTimeout(() => {
                                                    if (phaseName === PRETERITUM) {
                                                        nextQuestion()
                                                    } else {
                                                        setShowWordSummary(true)
                                                    }
                                                }, TRANSITION_TIME)
                                            }}
                                            key={option.inflection + phaseName}>
                                            {option.inflection}
                                        </div>)
                                }
                            </div>
                        </div>
                    </>
            }
        </main>
    </div>
}