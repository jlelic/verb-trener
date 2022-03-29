import styles from '/styles/Home.module.css'
import clsx from 'clsx'
import React from 'react'

export default function WordSummary(props) {
    const {verb, answeredPreteritum, answeredPerfektum, compact} = props
    const preteritumCorrect = !answeredPreteritum || verb.inflections.some(infl => infl.forms[1] === answeredPreteritum)
    const perfektumCorrect = !answeredPerfektum || verb.inflections.some(infl => infl.forms[2] === answeredPerfektum)
    const answers = [undefined, answeredPreteritum, answeredPerfektum]

    const content =
        <>
            <thead>
            <tr>
                <th>
                    {compact ? verb.infinitiv : 'Presens'}
                </th>
                <th>
                    {!compact && 'Preteritum'}
                </th>
                <th>
                    {!compact && 'Perfektum'}
                </th>
            </tr>
            </thead>
            <tbody>
            {verb.inflections.map((infl, i) => <tr key={i}>
                {
                    infl.forms.map((form, j) => <td key={i + form + j}>
                        <span className={clsx(form == answers[j] && styles.correct)}>
                            {(!i || form != verb.inflections[i - 1].forms[j]) && form}
                        </span>
                    </td>)
                }
            </tr>)}
            {
                (!preteritumCorrect || !perfektumCorrect) &&
                <>
                    <tr/>
                    <tr/>
                    <tr className={styles.incorrect}>
                        <td>
                        </td>
                        <td>
                            {!preteritumCorrect && <span>
                                {answeredPreteritum}<br/>
                                <img className={clsx(styles.smallIcon, styles.incorrect)} src="/icons/warning.svg"/> Mistake!
                            </span>
                            }
                        </td>
                        <td>
                            {!perfektumCorrect && <span>
                                {answeredPerfektum}<br/>
                                <img className={clsx(styles.smallIcon, styles.incorrect)} src="/icons/warning.svg"/> Mistake!
                            </span>
                            }
                        </td>
                    </tr>
                </>
            }
            </tbody>
        </>

    if (compact) {
        return content
    } else {
        return <>
            <h2 className={styles.verbTitle}>
                {verb.infinitiv}
            </h2>
            <table className={styles.inflectionTable}>
                {content}
            </table>
            <br/><br/><br/><br/>
            {answeredPreteritum &&
                preteritumCorrect &&
                answeredPerfektum &&
                perfektumCorrect && <div className={styles.correct}>
                    <h3>
                        Good job!
                    </h3>
                    {typeof verb.consecutive === 'number' && <p>
                        {verb.consecutive
                            ? `You answered this word correctly ${verb.consecutive} times in a row!`
                            : 'You corrected your mistake from the last time!'
                        }
                    </p>}
                </div>}
        </>
    }

}
