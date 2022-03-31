import styles from '../styles/Home.module.css'
import menuStyles from '../styles/Menu.module.css'
import getLoggedInUser from '../lib/get-logged-in-user'
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
                </p> : <p>Lære norsk verbbøying! </p>
            }

            <div className={menuStyles.menu}>
                <div className={menuStyles.group}>
                    <div className={menuStyles.groupName}>
                        PRACTICE
                    </div>
                    <MenuItem link="/test/basic" title="Basic" description="20 most common verbs"/>
                    <MenuItem link="/test/beginner" title="Beginner" description="100 most common verbs"/>
                    <MenuItem link="/test/intermediate" title="Intermediate" description="500 most common verbs"/>
                    <MenuItem link="/test/advanced" title="Advanced" description="1000 most common verbs"/>
                    <MenuItem link="/test/expert" title="Expert" description="All the verbs"/>
                </div>
                {user &&
                    <div className={menuStyles.group}>
                        <div className={menuStyles.groupName}>
                            REVIEW
                        </div>
                        <MenuItem link="/review" title="Mistakes" description="Check the mistakes you have done"/>
                        <MenuItem link="/stats" title="Your stats" description="See how many verbs you know"/>
                    </div>
                }
            </div>
            <div className={styles.authorSpace}/>
        </main>
        <footer className={styles.author}>
            by joseph.lelic@gmail.com
        </footer>
    </div>)
}
