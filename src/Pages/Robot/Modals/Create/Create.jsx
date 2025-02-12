import { useState } from "react";
import styles from "./Create.module.css"

const Form = ({ state, setState }) => {
    const onInputChanged = (e) => {
        const { id, value } = e.target;
        setState(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div className={styles.form}>
            <div className={styles.formItem}>
                <label htmlFor="date">Last modified date</label>
                <input type="text" id="date" value={state.date} disabled />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="uid">UID</label>
                <input type="text" id="uid" value={state.uid} onChange={onInputChanged} />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={state.password} onChange={onInputChanged} />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="twoFA">2FA</label>
                <input type="text" id="twoFA" value={state.twoFA} onChange={onInputChanged} />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={state.email} onChange={onInputChanged} />
            </div>
            <div className={styles.formItem}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={state.phone} onChange={onInputChanged} />
            </div>
        </div>
    );
}
const Import = ({ setState }) => {
    const onInputChanged = (e) => {
        const file = e.target.files?.[0] || null;
        setState(file);
    };

    return (
        <div className={styles.import}>
            <input type="file" onChange={onInputChanged} />
        </div>
    );
}

const Create = ({ createForm, setCreateForm, importFile, setImportFile, isOpen, onClose, callAPIs }) => {
    const [isForm, setIsForm] = useState(true);
    if (!isOpen) { return null; };

    const handleSave = (e) => {
        if (isForm) {
            if (!createForm.uid) { return; };
            callAPIs(e, "robot:create-uid", createForm);
        } else {
            if (!createForm) { return; };
            callAPIs(e, "robot:import-uid", importFile);
        };
    };

    const handleSaveAndOpen = e => {
        if (!createForm.uid) { return; };
        callAPIs(e, "robot:create-uid", createForm);
        callAPIs(e, "robot:launch-browser", createForm.uid);
    }

    return (
        <>
            return (
            <div className={styles.modalOverlay} onClick={onClose}>
                <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                    {/* <button className={styles.closeBtn} onClick={onClose}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button> */}
                    <div className={styles.modalContent}>
                        <div className={styles.header}>
                            <label htmlFor="form" className={`${isForm ? styles.active : ""}`}>
                                Form
                                <input
                                    id="form"
                                    type="radio"
                                    value="form"
                                    name="isForm"
                                    checked={isForm}
                                    onChange={() => setIsForm(true)}
                                    hidden
                                />
                            </label>
                            <label htmlFor="import" className={`${!isForm ? styles.active : ""}`}>
                                Import
                                <input
                                    id="import"
                                    type="radio"
                                    value="import"
                                    name="isForm"
                                    checked={!isForm}
                                    onChange={() => setIsForm(false)}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className={styles.content}>
                            {isForm ? <Form state={createForm} setState={setCreateForm} /> : <Import setState={setImportFile} />}
                        </div>
                        <div className={styles.footer}>
                            {/* {isForm && (<button onClick={onLogin} disabled={isOpening}>{isOpening ? "Logging in ..." : "Save & login"}</button>)} */}
                            {isForm && <button onClick={handleSaveAndOpen}>Save & open</button>}
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            );
        </>
    )
}

export default Create