import { useState, useEffect } from "react";
import styles from "./Create.module.css";

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
const Create = ({ isOpen, onClose }) => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-CA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).format(today);

    const [form, setForm] = useState({
        date: formattedDate,
        uid: "",
        password: "",
        twoFA: "",
        email: "",
        phone: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isForm, setIsForm] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        if (window?.electronAPIs) {
            window.electronAPIs.on("robot:create-uid", () => setIsSaving(false));
            window.electronAPIs.on("robot:launch-browser", res => res.data ? setIsOpening(true) : setIsOpening(false));
        }
    }, []);

    const onLogin = () => {
        onSave();
        setIsOpening(true);
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:launch-browser", {
                payload: form.uid,
            });
        };
    };

    const onSave = () => {
        if (isForm) {
            if (!form.uid) return;
            setIsSaving(true);
            if (!window?.electronAPIs) {
                return;
            } else {
                window.electronAPIs.send("robot:create-uid", {
                    payload: form
                });
            };
        } else {
            if (!form) return;
            if (!selectedFile) return;
            setIsSaving(true);
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                if (window?.electronAPIs) {
                    window.electronAPIs.send("robot:import-uid", {
                        payload: base64
                    });
                };
            };
            reader.readAsDataURL(selectedFile);
        };
    };
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
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
                        {isForm ? <Form state={form} setState={setForm} /> : <Import setState={setSelectedFile} />}
                    </div>
                    <div className={styles.footer}>
                        {isForm && (<button onClick={onLogin} disabled={isOpening}>{isOpening ? "Logging in ..." : "Save & login"}</button>)}
                        <button onClick={onSave} disabled={isSaving}>{isSaving ? "Saving ..." : "Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;