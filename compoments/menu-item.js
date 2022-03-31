import menuStyles from '../styles/Menu.module.css'
import Link from 'next/link'

export default function MenuItem(props) {
    return <div className={menuStyles.item}>
        <Link href={props.link}>
            <a>
                <div className={menuStyles.title}>{props.title}</div>
                <div className={menuStyles.description}>{props.description}</div>
                <div className={menuStyles.arrow}></div>
            </a>
        </Link>
    </div>
}
