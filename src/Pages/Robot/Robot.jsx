import { useRef, useCallback, useEffect, useState } from "react";

import styles from "./Robot.module.css";
import List from "./List/List";
import Modify from "./modals/Modify/Modify";
import Create from "./modals/Create/Create";

const Robot = () => {
    const [listUID, setListUID] = useState([]);
    const [isModify, setModify] = useState(false);
    const [modifyIndex, setModifyIndex] = useState(null);
    const [isCreate, setCreate] = useState(false);
    const debounceTimeout = useRef(null);
    const abortController = useRef(new AbortController());
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
        const closestParent = e.target.closest("[data-uid]");
        let currentUID = null;
        if (closestParent) { currentUID = closestParent.getAttribute("data-uid"); };
        if (window?.electronAPIs) {
            handleElectronAPIs(e, method, value, currentUID);
        } else {
            handleRestAPIs(e, method, value, currentUID);
        };

    }, [listUID]);

    const handleRestAPIs = useCallback((e, method, value, currentUID) => {
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
    }, []);

    const handleElectronAPIs = useCallback((e, method, value, currentUID) => {
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
                    // res.data = {}
                    if (res.data && res.status) {
                        setListUID(prev => [...prev, res.data]);
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
                    window.electronAPIs.send(method, { payload: base64 });
                    window.electronAPIs.on(method, res => {
                        if (res.status) {
                            setListUID(prev => [...prev, ...res.data]);
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
                console.log(value);
                window.electronAPIs.send(method, { payload: value });
                window.electronAPIs.on(method, res => {
                    if (res.status) {
                        setListUID(prev => prev.map(uidInfo => {
                            if (uidInfo.info.uid === currentUID) {
                                return res.data;
                            } else { return uidInfo; };
                        }));
                    };
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
                    console.log(res);
                    if (res.status) {
                        setListUID(prev => prev.filter(uidInfo => uidInfo.info.uid !== res.data));
                    };
                    e.target.textContent = defaultLabel;
                    e.target.disabled = false;
                });
                break;
            }
            case "robot:config-uid": {
                setModifyIndex(value);
                setModify(true);
                break;
            }
            case "robot:launch-browser": {
                e.target.textContent = "Opening ...";
                e.target.disabled = true;
                window.electronAPIs.send(method, { payload: value });
                window.electronAPIs.on(method, res => {
                    if (res.status) {
                        console.log(res);
                    }
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
                    console.log(res);
                    if (res.status) {
                        const username = res.data;
                        if (username) {
                            setListUID(prev => prev.map(uidInfo => {
                                if (uidInfo.info.uid === currentUID) {
                                    const newUidInfo = {
                                        ...uidInfo,
                                        info: {
                                            ...uidInfo.info,
                                            username: username,
                                        }
                                    };
                                    return newUidInfo;
                                } else { return uidInfo; }
                            }));
                        } else {
                            setListUID(prev => prev.map(uidInfo => {
                                if (uidInfo.info.uid === currentUID) {
                                    const newUidInfo = {
                                        ...uidInfo,
                                        info: {
                                            ...uidInfo.info,
                                            username: " Open to login",
                                        }
                                    };
                                    return newUidInfo;
                                } else { return uidInfo; }
                            }));
                        }
                    } else {
                        // setListUID(prev => prev.map(uidInfo => {
                        //     if (uidInfo.info.uid === currentUID) {
                        //         const newUidInfo = {
                        //             ...uidInfo,
                        //             info: {
                        //                 ...uidInfo.info,
                        //                 username: "undefined",
                        //             }
                        //         };
                        //         return newUidInfo;
                        //     } else { return uidInfo; }
                        // }));
                    }
                    e.target.textContent = defaultLabel;
                    e.target.disabled = false;
                })
                break;
            }
            case "robot:run-bot": {
                e.target.textContent = "Running ...";
                e.target.disabled = true;
                window.electronAPIs.send(method, { payload: null });
                break;
            }
            default: throw new Error("Invalid method");
        }
    }, []);

    // Hàm debounce API call
    const debounceAPICall = useCallback((callback, delay = 500) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
            abortController.current.abort(); // Hủy request cũ
            abortController.current = new AbortController();
        }
        debounceTimeout.current = setTimeout(callback, delay);
    }, []);

    // Cleanup khi component unmount
    useEffect(() => {
        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            abortController.current.abort();
        };
    }, []);

    const handleInputChange = useCallback((uid, value) => {
        // console.log(value);
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
                    } else if (value?.config) {
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
            debounceAPICall(() => {
                const updatedItem = newList.find(item => item.info.uid === uid);
                if (window?.electronAPIs) {
                    window.electronAPIs.send("robot:put-uid", { payload: updatedItem });
                }
            }, 500);
            return newList;
        });
    }, [debounceAPICall, callAPIs]);

    const handleStart = (e) => {
        callAPIs(e, "robot:run-bot", { value: null });
    }

    return (
        <>
            <div className={styles.robot}>
                <div className={styles.header}>
                    <button onClick={() => setCreate(true)}>Add</button>
                </div>
                <div className="list">
                    {listUID ? (
                        <List listUID={listUID} setListUID={setListUID} callAPIs={callAPIs} handleInputChange={handleInputChange} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className={styles.footer}>
                    <button onClick={handleStart}>Start</button>
                </div>
            </div>
            {isModify && typeof modifyIndex !== "boolean" && listUID[modifyIndex] && <Modify uidInfo={listUID[modifyIndex]} callAPIs={callAPIs} handleInputChange={handleInputChange} isOpen={isModify} onClose={() => setModify(false)} />}
            {isCreate && <Create createForm={createForm} setCreateForm={setCreateForm} importFile={importFile} setImportFile={setImportFile} isOpen={isCreate} onClose={() => setCreate(false)} callAPIs={callAPIs} />}
        </>
    )
}

export default Robot;