import menuStyles from '../styles/Menu.module.css'
import Link from 'next/link'

export default function MenuItem(props) {
    return <Link href={props.link}>
        <a>
            <div className={menuStyles.item}>
                <div className={menuStyles.title}>{props.title}</div>
                <div className={menuStyles.description}>{props.description}</div>
                <div className={menuStyles.arrow}></div>
            </div>
        </a>
    </Link>
}
