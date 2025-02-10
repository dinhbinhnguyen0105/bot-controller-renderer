import { useState, useEffect } from "react";

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