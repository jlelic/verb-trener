import styles from '../styles/Home.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import React from 'react'

export default function Header(props) {
    const {icon = 'back', children} = props
    return <header className={styles.header}>
        <Link href="/">
            <div className={styles.backButton}>
                <img
                    className={clsx(styles.mediumIcon)}
                    src="/icons/back.svg"
                />
            </div>
        </Link>
        <div className={styles.pageTitle}>
            {children}
        </div>
        <div className={clsx(styles.backButton,styles.hidden)}>
            <img
                className={clsx(styles.mediumIcon)}
                src="/icons/back.svg"
            />
        </div>

    </header>
}
