import { useState, useEffect } from "react";
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

const Create = ({ isOpen, onClose, callAPIs }) => {
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

    return (
        <>
        </>
    )
}