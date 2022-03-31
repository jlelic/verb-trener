import styles from '/styles/Home.module.css'
import clsx from 'clsx'
import React, {Fragment} from 'react'
import WordSummary from './word-summary'
import tableStyles from '/styles/Table.module.css'

export default function TestSummary(props) {
    const {questions, answers} = props
    return <table className={tableStyles.inflectionTable}>
        {questions.map((question, i) => <Fragment key={'question ' + i}><WordSummary
            compact={true}
            verb={question.verb}
            answeredPreteritum={answers[i * 2]}
            answeredPerfektum={answers[i * 2 + 1]}
        />
            <tbody>
            <tr>
                <td className={tableStyles.space}></td>
            </tr>
            <tr>
                <td className={clsx(tableStyles.lineRow)} colSpan={3}> </td>
            </tr>
            <tr>
                <td className={tableStyles.space}></td>
            </tr>
            </tbody>
        </Fragment>)
        }
    </table>
}
