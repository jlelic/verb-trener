import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (<div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
                Verb Trener
            </h1>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <Link href="/test-beginner">
                        <a>
                            <h2>Beginner&rarr;</h2>
                            <p>Test 20 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test-intermediate">
                        <a>
                            <h2>Intermediate&rarr;</h2>
                            <p>100 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test-advanced">
                        <a>
                            <h2>Advanced&rarr;</h2>
                            <p>1000 most common verbs</p>
                        </a>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link href="/test-intermediate">
                        <a>
                            <h2>Expert&rarr;</h2>
                            <p>All verbs</p>
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
