import { useEffect, useState } from "react";
import styles from "./Detail.module.css";

const Detail = ({ uidInfo, callAPIs, isOpen, onClose }) => {
    const [info, setInfo] = useState(uidInfo);
    if (!isOpen) { return null; };

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}>
                <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <div className={styles.modalContent}>

                        <h2>Modal: {uidInfo}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;