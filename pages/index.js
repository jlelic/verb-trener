import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import menuStyles from '../styles/Menu.module.css'
import getLoggedInUser from '../lib/get-logged-in-user'
import Background from '../compoments/background'
import MenuItem from '../compoments/menu-item'

export async function getServerSideProps(context) {
    const { req, res } = context
    const user = await getLoggedInUser(req)
    if (!user) {
        return { props: {} }
    }
    return {
        props: {
            user
        }
    }
}

export default function Home(props) {
    const { user } = props
    return (<div className={styles.container}>
        <main className={styles.main}>
            <h1 className={styles.title}>
                Verb Trener
            </h1>
            {
                user ? <p>
                    Welcome {user.name || `#${user.fullName}`}
                </p> : <div style={{height:30}} />
            }

            <div className={menuStyles.menu}>
                <div className={menuStyles.group}>
                    <div className={menuStyles.groupName}>
                        PRACTICE
                    </div>
                    <MenuItem link="/test/beginner" title="Basic" description="20 most common verbs"/>
                    <MenuItem link="/test/intermediate" title="Intermediate" description="100 most common verbs"/>
                    <MenuItem link="/test/advanced" title="Advanced" description="1000 most common verbs"/>
                    <MenuItem link="/test/expert" title="Expert" description="All the verbs"/>
                </div>
                {user &&
                    <div className={menuStyles.group}>
                        <div className={menuStyles.groupName}>
                            REVIEW
                        </div>
                        <MenuItem link="/review" title="Mistakes" description="See the mistakes you have done"/>
                    </div>
                }
            </div>
        </main>
    </div>)
}
