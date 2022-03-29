import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import getLoggedInUser from '../lib/get-logged-in-user'

export async function getServerSideProps(context) {
    const {req, res} = context
    const user = await getLoggedInUser(req)
    if (!user) {
        return {props: {}}
    }
    return {
        props: {
            user
        }
    }
}

export default function Home(props) {
    const {user} = props
    return (<div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
                Verb Trener
            </h1>
            {
                user && <p>
                    Welcome {user.name}
                </p>
            }

            <div className={styles.grid}>
                <div className={styles.card}>
                    <Link href="/test/beginner">
                        <a>
                            <h2>Beginner&rarr;</h2>
                            <p>Test 20 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test/intermediate">
                        <a>
                            <h2>Intermediate&rarr;</h2>
                            <p>100 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test/advanced">
                        <a>
                            <h2>Advanced&rarr;</h2>
                            <p>1000 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test/intermediate">
                        <a>
                            <h2>Expert&rarr;</h2>
                            <p>All verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/review">
                        <a>
                            <h2>Review&rarr;</h2>
                            <p>See mistakes you have done</p>
                        </a>
                    </Link>
                </div>
            </div>
        </main>

        <footer className={styles.footer}>
            {/*<a*/}
            {/*    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*>*/}

            {/*          <span className={styles.logo}>*/}
            {/*  <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>*/}
            {/*</span>*/}
            {/*      </a>*/}
        </footer>
    </div>)
}
