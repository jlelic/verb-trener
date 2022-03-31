import '../node_modules/animate.css/animate.css'
import styles from '/styles/Home.module.css'
import menuStyles from '/styles/Menu.module.css'
import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import WordSummary from '/compoments/word-summary'
import TestSummary from '/compoments/test-summary'
import clsx from 'clsx'
import CreateProfileButton from './create-profile-button'
import Header from './header'
import MenuItem from './menu-item'


const PRETERITUM = 'preteritum'
const PERFEKTUM = 'perfektum'
const TRANSITION_TIME = 450

export default function Test(props) {
    const { test, user } = props
    console.log(props)
    const [questionNum, setQuestionNum] = useState(0)
    const [correctNum, setCorrectNum] = useState(0)
    const [correctArray, setCorrectArray] = useState([])
    const [showWordSummary, setShowWordSummary] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [answers, setAnswers] = useState([])
    const [isPreteritumPhase, setPreteritumPhase] = useState(true)
    const phaseName = isPreteritumPhase ? PRETERITUM : PERFEKTUM

    const [dataSent, setDataSend] = useState(false)

    const exitButtonRef = useRef(null)

    const [createdProfile, setCreatedProfile] = useState(null)
    const onProfileCreated = (profile) => {
        console.log(profile)
        setCreatedProfile(profile)
    }

    const nextQuestion = () => {
        setShowWordSummary(false)
        if (!isPreteritumPhase) {
            setQuestionNum(questionNum + 1)
        }
        setAnswered(false)
        setPreteritumPhase(!isPreteritumPhase)
    }

    const testResult = test.questions.map((q, i) => ({
        uid: q.verb.uid,
        correct: correctArray[i * 2] + correctArray[i * 2 + 1],
        preteritum: correctArray[i * 2] ? null : answers[i * 2],
        perfektum: correctArray[i * 2 + 1] ? null : answers[i * 2 + 1]
    }))

    useEffect(() => {
        if (questionNum !== test.numQuestions) {
            return
        }
        if (!dataSent) {
            setTimeout(() => {
                document.getElementById('exitTextButton').scrollIntoView({
                    behavior: 'smooth'
                })
            }, 900)
            setDataSend(true)
            if (user) {
                fetch('/api/progress', {
                    method: 'POST', body: JSON.stringify({ result: testResult })
                })
            }
        }
    }, [questionNum, dataSent])

    if (questionNum == test.numQuestions) {
        return <div className={styles.container}>
            <main className={styles.main}>
                <h1>Finished</h1>
                <TestSummary questions={test.questions} answers={answers}/>
                <h2 className="animate__animated animate__jackInTheBox animate__delay-1s">
                    Correct: {Math.round(correctNum * 50 / test.numQuestions)}%
                </h2>
                {createdProfile && <p className={styles.correct}>Created profile {createdProfile.fullName}!</p>}
                <div className={menuStyles.group}>
                {!user && !createdProfile && <CreateProfileButton testResult={testResult} onProfileCreated={onProfileCreated}>Save progress</CreateProfileButton>}
                <MenuItem  innerRef={exitButtonRef} link='/' title='Return to menu'/>
                </div>
            </main>
        </div>
    }

    const verb = test.questions[questionNum].verb
    const presens = verb.presensCounts ? verb.inflections.sort((a, b) => {
        (verb.presensCounts[b.forms[0]] || 0) - (verb.presensCounts[a.forms[0]] || 0)
    })[0].forms[0] : verb.inflections[0].forms[0]

    return <div className={styles.container}>
        <Head>
            <title>Verb Test</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <main className={styles.main}>
            {
                showWordSummary ? <><WordSummary
                        verb={test.questions[questionNum].verb}
                        answeredPreteritum={answers[questionNum * 2]}
                        answeredPerfektum={answers[questionNum * 2 + 1]}
                    />
                            <div className={clsx(styles.option,styles.nextButton)} onClick={nextQuestion}>
                                Next
                            </div>
                    </>
                    :
                    <>
                        <div className={styles.question}>
                            What is&nbsp;
                            <div
                                id={phaseName + questionNum}
                                className={clsx(answered || 'animate__animated animate__pulse', styles.phaseName)}
                            >
                                {phaseName}
                            </div>
                            &nbsp;of
                        </div>
                        <h1 className={styles.verbTitle}>
                            {presens}
                        </h1>


                        <div className={styles.optionGrid}>
                            {
                                test.questions[questionNum][phaseName + 'Options'].map(option =>
                                    <div
                                        className={clsx(
                                            styles.option,
                                            option.inflection.length > 10 && styles.longOption,
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
                                                setCorrectArray(correctArray.concat([1]))
                                            } else {
                                                setCorrectArray(correctArray.concat([0]))
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
                    </>
            }
        </main>
        <footer className={styles.footer}>
            <Link href="/">
                <div className={styles.exitButton}>
                    <img
                        className={clsx(styles.mediumIcon)}
                        src="/icons/exit.svg"
                    />
                </div>
            </Link>
            <div>
                {questionNum + 1}/{test.numQuestions}
            </div>
            <div className={clsx(styles.exitButton, styles.hidden)}>
                <img
                    className={clsx(styles.mediumIcon)}
                    src="/icons/exit.svg"
                />
            </div>
        </footer>
    </div>
}
