import styles from '../styles/Home.module.css'
import {useRef, useState} from 'react'
import Modal from 'react-modal'
import clsx from 'clsx'

Modal.setAppElement('#__next')

export default function CreateProfileButton(props) {
    const {testResult} = props
    console.log(testResult)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [inputError, setInputError] = useState('')
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

    const createProfile = () => {
        if (inputError) {
            return
        }
        const data = {
            name
        }
        if(testResult) {
            data.result = testResult
        }
        fetch('/api/profile', {
            method: 'PUT', body: JSON.stringify(data)
        })
    }

    console.log(modalIsOpen)

    return <div className={styles.card} onClick={openModal}>
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
                <button className={styles.card} disabled={inputError} onClick={createProfile}>
                    Create {name ? '' : 'anonymous'} profile
                </button>
            </div>
        </Modal>
        <p>Save progress</p>
    </div>

}
