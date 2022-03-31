import styles from '../styles/Home.module.css'
import {useRef, useState} from 'react'
import Modal from 'react-modal'
import clsx from 'clsx'
import MenuItem from './menu-item'
import menuStyles from '../styles/Menu.module.css'
import Link from 'next/link'

Modal.setAppElement('#__next')

export default function CreateProfileButton(props) {
    const { testResult } = props
    console.log(testResult)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [inputError, setInputError] = useState('')
    const [requestError, setRequestError] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false)

    const nameInputRef = useRef(null)
    const openModal = () => {
        setIsOpen(true)
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    const closeModal = (e) => {
        setIsOpen(false)
        e.stopPropagation()
    }

    const onNameChange = (e) => {
        const value = e.target.value
        setInputError('')
        if (value.length > 12) {
            setInputError('Name cannot be longer than 12 characters')
        }

        if (value && !value.match(/^[a-zA-ZØÅÆæøå]+$/)) {
            setInputError('Name can only contain letters')
        }

        setName(value)
    }

    const createProfile = async () => {
        if (inputError || loading) {
            return
        }
        const data = {
            name
        }
        if (testResult) {
            data.result = testResult
        }
        setLoading(true)
        const result = await fetch('/api/profile', {
            method: 'PUT', body: JSON.stringify(data)
        })
        setLoading(false)
        if (result.ok) {
            setIsOpen(false)
            const createdProfile = await result.json()
            props.onProfileCreated(createdProfile)

        } else {
            setRequestError(result.statusText || 'Unknown error')
        }
    }


    return <div className={clsx(menuStyles.item)} onClick={openModal}>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Create profile modal"
            className={styles.modalWindow}
            overlayClassName={styles.modalOverlay}
        >
            <div className={styles.closeButton} onClick={closeModal}>
                <img
                    className={clsx(styles.smallIcon)}
                    src="/icons/close.svg"
                />
            </div>
            <div>
                <div>
                    Enter name or create anonymous profile
                </div>
                <div>
                    <input ref={nameInputRef} type="text" onChange={onNameChange} maxLength={12}/>
                </div>
                <div className={styles.incorrect}>
                    {inputError}
                </div>
                {requestError && <div className={styles.incorrect}>
                    Something went wrong
                    {requestError}
                </div>}
                <div className={clsx({ [menuStyles.item]: true, [styles.disabled]: inputError || loading })}
                     style={{textAlign: 'center', maxWidth:300}}
                     onClick={createProfile}>
                    {loading
                        ? <div className={menuStyles.title}>
                            <svg className="svg-container" height="20" width="20" viewBox="0 0 100 100">
                                <circle className={clsx(styles.loaderSvg, styles.animate)} cx="50" cy="50"
                                        r="45"></circle>
                            </svg>
                            Wait
                        </div>
                        :
                        <div className={menuStyles.title}>
                            Create {name ? '' : 'anonymous'} profile
                        </div>
                    }
                </div>
            </div>
        </Modal>
        <div className={menuStyles.title}>Save progress</div>
        <div className={menuStyles.save}></div>
    </div>

}
