import { useCallback, useEffect, useState } from "react";

// import styles from "./Robot.module.css";
import List from "./List/List";
import Modify from "./modals/Modify/Modify";
import Create from "./modals/Create/Create";

const Robot = () => {
    const [listUID, setListUID] = useState([]);
    const [isModify, setModify] = useState(false);
    const [modifyIndex, setModifyIndex] = useState(null);
    const [isCreate, setCreate] = useState(false);
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-CA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).format(today);
    const [createForm, setCreateForm] = useState({
        date: formattedDate,
        uid: "",
        password: "",
        twoFA: "",
        email: "",
        phone: "",
    });
    const [importFile, setImportFile] = useState(null);

    useEffect(() => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:list-uid", { payload: null });
            window.electronAPIs.on("robot:list-uid", res => setListUID(res.data));
        } else {
            fetch("http://localhost:3000/api/robot")
                .then(res => res.json())
                .then(res => setListUID(res))
                .catch(err => console.error(err));
        };
    }, []);

    const callAPIs = useCallback((e, method, value) => {
        if (window?.electronAPIs) {
            const defaultLabel = e.target.textContent;
            switch (method) {
                case "robot:list-uid": {
                    window.electronAPIs.send(method, { payload: null });
                    break;
                }
                case "robot:create-uid": {
                    e.target.textContent = "Saving ...";
                    e.target.disabled = true;
                    window.electronAPIs.send(method, { payload: { uid: value } });
                    window.electronAPIs.on(method, res => {
                        if (res.data) {
                            setListUID(res.data);
                            setCreateForm({
                                date: formattedDate,
                                uid: "",
                                password: "",
                                twoFA: "",
                                email: "",
                                phone: "",
                            });
                        };
                        e.target.textContent = defaultLabel;
                        e.target.disabled = false;
                    });
                    break;
                }
                case "robot:import-uid": {
                    e.target.textContent = "Importing ...";
                    e.target.disabled = true;
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result;
                        console.log(base64);
                        window.electronAPIs.send(method, { payload: base64 });
                        window.electronAPIs.on(method, res => {
                            if (res.data) {
                                setListUID(res.data);
                            };
                            e.target.textContent = defaultLabel;
                            e.target.disabled = false;
                        });
                    };
                    reader.readAsDataURL(value);
                    break;
                }
                case "robot:put-uid": {
                    e.target.textContent = "Saving ...";
                    e.target.disabled = true;
                    window.electronAPIs.send(method, { payload: value });
                    window.electronAPIs.on(method, res => {
                        setListUID(res.data);
                        e.target.textContent = defaultLabel;
                        e.target.disabled = false;
                    })
                    break;
                }
                case "robot:del-uid": {
                    e.target.textContent = "Deleting ...";
                    e.target.disabled = true;
                    window.electronAPIs.send(method, { payload: value });
                    window.electronAPIs.on(method, res => {
                        setListUID(res.data);
                        e.target.textContent = defaultLabel;
                        e.target.disabled = false;
                    });
                    break;
                }
                case "robot:config-uid": {
                    console.log(value);
                    setModifyIndex(value);
                    setModify(true);
                    break;
                }
                case "robot:launch-browser": {
                    e.target.textContent = "Opening ...";
                    e.target.disabled = true;
                    window.electronAPIs.send(method, { payload: value });
                    window.electronAPIs.on(method, res => {
                        setListUID(res.data);
                        e.target.textContent = defaultLabel;
                        e.target.disabled = false;
                    });

                    break;
                }
                case "robot:get-name": {
                    e.target.textContent = "Getting ..."
                    e.target.disabled = true;
                    window.electronAPIs.send(method, { payload: value });
                    window.electronAPIs.on(method, res => {
                        setListUID(res.data);
                        e.target.textContent = defaultLabel;
                        e.target.disabled = false;
                    })
                    break;
                }

                default: throw new Error("Invalid method");

            }
        } else {
            const serverUrl = "http://localhost:3000/api";
            const defaultLabel = e.target.textContent;
            switch (method) {
                case "robot:list-uid": {
                    fetch(serverUrl)
                        .then(res => res.json())
                        .then(res => setListUID(res))
                        .catch(err => console.error(err));
                    break;
                }
                case "robot:create-uid": {
                    e.target.textContent = "Saving ...";
                    e.target.disabled = true;
                    fetch(`${serverUrl}/robot-create-uid`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: { info: value } })
                    })
                        .then(res => res.json())
                        .then(res => {
                            setListUID(res.data);
                            console.log(res);
                            setCreateForm({
                                date: formattedDate,
                                uid: "",
                                password: "",
                                twoFA: "",
                                email: "",
                                phone: "",
                            })
                            e.target.textContent = defaultLabel;
                            e.target.disabled = false;
                        })
                        .catch(err => {
                            e.target.textContent = defaultLabel;
                            console.error(err);
                        });
                    break;
                }
                case "robot:import-uid": {
                    e.target.textContent = "Importing ...";
                    e.target.disabled = true;
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result;
                        fetch(`${serverUrl}/robot-import-uid`, {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ file: base64 })
                        })
                            .then(res => res.json())
                            .then(res => {
                                setListUID(res.data);
                                console.log(res);
                                e.target.disabled = false;
                                e.target.textContent = defaultLabel;
                                setImportFile(null)
                            })
                            .catch(err => {
                                e.target.textContent = defaultLabel;
                                console.error(err);
                            });
                    };
                    reader.readAsDataURL(value);
                    break;
                }
                case "robot:put-uid": {
                    e.target.textContent = "Saving ...";
                    e.target.disabled = true;
                    fetch(`${serverUrl}/robot-put-uid`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(listUID)
                    })
                        .then(res => res.json())
                        .then(res => {
                            setListUID(res.data);
                            console.log(res);
                            e.target.textContent = defaultLabel;
                            e.target.disabled = false;
                        })
                        .catch(err => {
                            e.target.textContent = defaultLabel;
                            console.error(err);
                        });
                    break;
                }
                case "robot:del-uid": {
                    e.target.textContent = "Deleting ...";
                    e.target.disabled = true;
                    fetch(`${serverUrl}/robot-del-uid`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: value })
                    })
                        .then(res => res.json())
                        .then(res => {
                            setListUID(res.data)
                            console.log(res);
                            e.target.textContent = defaultLabel;
                            e.target.disabled = false;
                        })
                        .catch(err => {
                            e.target.textContent = defaultLabel;
                            console.error(err);
                        });
                    break;
                }
                case "robot:launch-browser": {
                    e.target.textContent = "Opening ...";
                    e.target.disabled = true;
                    fetch(`${serverUrl}/robot-launch-browser`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: value })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            e.target.disabled = false;
                            e.target.textContent = defaultLabel;
                        })
                        .catch(err => {
                            e.target.textContent = defaultLabel;
                            console.error(err);
                        });
                    break;
                }
                case "robot:get-name": {
                    e.target.textContent = "Getting ..."
                    e.target.disabled = true;
                    fetch(`${serverUrl}/robot-get-name`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: value })
                    })
                        .then(res => res.json())
                        .then(res => {
                            setListUID(res.data)
                            console.log(res);
                            e.target.textContent = defaultLabel;
                            e.target.disabled = false;
                        })
                        .catch(err => {
                            e.target.textContent = defaultLabel;
                            console.error(err);
                        });
                    break;
                }
                case "robot:config-uid": {
                    setModifyIndex(value);
                    setModify(true);
                    break;
                }
                default: throw new Error("Invalid method");
            };
        }

    }, [listUID]);

    const handleInputChange = useCallback((uid, value) => {
        if (listUID.length < 1) return;
        setListUID(prev => {
            const newList = prev.map(item => {
                if (item.info.uid === uid) {
                    if (value?.info) {
                        return {
                            ...item,
                            info: {
                                ...item.info,
                                ...value.info,
                            }
                        };

                    }
                    else if (value?.config) {
                        return {
                            ...item,
                            config: {
                                ...item.config,
                                ...value.config,
                            }
                        };
                    } else if (value?.actions) {
                        if (value.actions?.joinGroupSource) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64 = reader.result;
                                setListUID(prevList => prevList.map(i => {
                                    if (i.info.uid === uid) {
                                        return {
                                            ...i,
                                            actions: {
                                                ...i.actions,
                                                joinGroupSource: base64,
                                            }
                                        };
                                    }
                                    return i;
                                }));
                            };
                            reader.readAsDataURL(value.actions.joinGroupSource);
                        } else {
                            return {
                                ...item,
                                actions: {
                                    ...item.actions,
                                    ...value.actions
                                }
                            };
                        }
                    }
                }
                return item;
            });
            return newList;
        });
    }, [listUID]);

    const handleStart = (e) => {
        const defaultLabel = e.target.textContent;
        e.target.textContent = "Saving ...";
        fetch("http://localhost:3000/api/robot-put-uid", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listUID)
        })
            .then(res => res.json())
            .then(res => {
                setListUID(res.data);
                console.log(res);
                e.target.textContent = defaultLabel;
            })
            .catch(err => {
                e.target.textContent = defaultLabel;
                console.error(err);
            });
    }

    return (
        <>
            <div className="robot">
                <div className="header">
                    <button onClick={() => setCreate(true)}>Add</button>
                </div>
                {listUID ? (
                    <List listUID={listUID} setListUID={setListUID} callAPIs={callAPIs} handleInputChange={handleInputChange} />
                ) : (
                    <p>Loading...</p>
                )}
                <div className="footer">
                    <button onClick={handleStart}>Start</button>
                </div>
            </div>
            {isModify && typeof modifyIndex !== "boolean" && listUID[modifyIndex] && <Modify uidInfo={listUID[modifyIndex]} callAPIs={callAPIs} handleInputChange={handleInputChange} isOpen={isModify} onClose={() => setModify(false)} />}
            {isCreate && <Create createForm={createForm} setCreateForm={setCreateForm} importFile={importFile} setImportFile={setImportFile} isOpen={isCreate} onClose={() => setCreate(false)} callAPIs={callAPIs} />}
        </>
    )
}

export default Robot;