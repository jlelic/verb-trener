import styles from '/styles/Home.module.css'
import clsx from 'clsx'
import React from 'react'
import WordSummary from './WordSummary'

export default function TestSummary(props) {
    const {questions, answers} = props
    return <table className={styles.inflectionTable}>
        {questions.map((question, i) => <><WordSummary
            key={'question ' + i}
            compact={true}
            verb={question.verb}
            answeredPreteritum={answers[i * 2]}
            answeredPerfektum={answers[i * 2 + 1]}
        />
            <tbody>
            <tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/>
            <tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/>
            <tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/>
            </tbody>
        </>)
        }
    </table>
}
