import styles from '/styles/Home.module.css'
import tableStyles from '/styles/Table.module.css'
import clsx from 'clsx'
import React from 'react'

const inflectionNames = ['presens', 'preteritum', 'perfektum']

export default function WordSummary(props) {
    const { verb, answeredPreteritum, answeredPerfektum, compact } = props
    const forms = [0, 1, 2].map(i => [...new Set(
            verb.inflections.map(infl => infl.forms[i])
        )].sort((a, b) => (
                (verb[inflectionNames[i] + 'Counts'] || {})[b] || 0)
            -
            (verb[inflectionNames[i] + 'Counts'] || {})[a])
    )
    const preteritumCorrect = !answeredPreteritum || verb.inflections.some(infl => infl.forms[1] === answeredPreteritum)
    const perfektumCorrect = !answeredPerfektum || verb.inflections.some(infl => infl.forms[2] === answeredPerfektum)
    const answers = [undefined, answeredPreteritum, answeredPerfektum]
    const content =
        <>
            <thead>
            <tr>
                <th className={tableStyles.header}>
                    {compact ? verb.infinitiv : 'Presens'}
                </th>
                <th className={tableStyles.header}>
                    {!compact && 'Preteritum'}
                </th>
                <th className={tableStyles.header}>
                    {!compact && 'Perfektum'}
                </th>
            </tr>
            </thead>
            <tbody>
            {
                [0, 1, 2, 3].map(i => <tr key={verb.infinitiv + i.toString()}>
                    {
                        forms.map((f, j) => {
                                const form = f[i] || ''
                                return <td key={i + form + j} className={tableStyles.cell}>
                                <span className={clsx(form === answers[j] && styles.correct)}>
                            {form}
                        </span>
                                </td>
                            }
                        )
                    }
                </tr>)
            }
            {
                (!preteritumCorrect || !perfektumCorrect) &&
                <>
                    <tr className={styles.incorrect}>
                        <td>
                        </td>
                        <td>
                            {!preteritumCorrect && <span>
                                {answeredPreteritum} &nbsp;
                                <img className={clsx(styles.smallIcon, styles.incorrect)} src="/icons/warning.svg"/><br/>
                                {!compact && 'Mistake!'}
                            </span>
                            }
                        </td>
                        <td>
                            {!perfektumCorrect && <span>
                                {answeredPerfektum}
                                <img className={clsx(styles.smallIcon, styles.incorrect)} src="/icons/warning.svg"/> <br/>
                                {!compact && 'Mistake!'}
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
            <table className={tableStyles.inflectionTable}>
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
