import getLoggedInUser from '/lib/get-logged-in-user'
import {ObjectID} from 'bson'
import dbClient from '/lib/mongodb'
import styles from '/styles/Home.module.css'
import statStyles from '/styles/StatTable.module.css'
import React from 'react'
import Header from '/compoments/header'
import {VERB_COUNT} from '/lib/verb-database'
import StatPercentage from '/compoments/stat-percentage'
import clsx from 'clsx'


export async function getServerSideProps(context) {
    const difficulties = [20, 100, 500, 1000, VERB_COUNT]
    const { req, res } = context
    const user = await getLoggedInUser(req)
    if (!user) {
        return { props: {} }
    }
    const userId = ObjectID(user._id)

    const client = await dbClient
    const db = client.db('norsk')
    const words = db.collection('words')
    const result = []
    for (const diff of difficulties) {
        const line = []
        const seen = await words.countDocuments({
            user: userId,
            wordUid: { $lt: diff }
        })
        const correct = await words.countDocuments({
            user: userId,
            wordUid: { $lt: diff },
            consecutive: { $gt: 0 }
        })
        const tripleCorrect = await words.countDocuments({
            user: userId,
            wordUid: { $lt: diff },
            consecutive: { $gte: 3 }
        })
        result.push([seen, correct, tripleCorrect].map(x => x / diff))
    }
    console.log(result)
    return {
        props: {
            user,
            stats: result
        }
    }
}


const difficultyNames = [
    'basic',
    'beginner',
    'intermediate',
    'advanced',
    'expert'
]

export default function Review(props) {
    const { user, stats } = props
    return <div className={styles.container}>
        <Header>
            {user.name || user.fullName}&apos;s Stats
        </Header>
        <div style={{ minHeight: '80px' }}></div>
        <main className={styles.main}>
            <table className={statStyles.statTable}>
                <thead>
                <tr>
                    <th></th>
                    <th>Seen</th>
                    <th>Correct</th>
                    <th>3x Correct</th>
                </tr>
                </thead>
                <tbody>
                {
                    difficultyNames.map((name, i) => {
                        return <tr key={name}>
                            <th  className={statStyles.rowName}>{name}</th>
                            {stats[i].map((s, j) => <td key={i * 3 + j} className={clsx(j === 2 && statStyles.triple)}>
                                <StatPercentage value={s} colorBy={j ? (s / stats[i][0]) : s}/>
                            </td>)}
                        </tr>
                    })
                }
                </tbody>
            </table>
        </main>
    </div>
}
