import { useCallback, useEffect, useState } from "react";

import styles from "./Robot.module.css";
import List from "./List/List";
import Modify from "./modals/Modify/Modify";

const Robot = () => {
    const [listUID, setListUID] = useState(null);
    const [info, setInfo] = useState(null);
    const [isDetailOpen, setDetailOpen] = useState(false);
    // const [isCreateOpen, setCreateOpen] = useState(false);

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

    const callAPIs = useCallback(({ method, value, setListUID, e }) => {
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
            case "robot:put-uid": {

                break;
            }
            case "robot:del-uid": {

                break;
            }
            case "robot:launch-browser": {
                e.target.textContent = "Opening ...";
                fetch(`${serverUrl}/robot-launch-browser`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: value })
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        e.target.textContent = defaultLabel;
                    })
                    .catch(err => {
                        e.target.textContent = defaultLabel;
                        console.error(err);
                    });
                break;
            }
            case "robot:get-name": {

                break;
            }
            case "robot:config-uid": {
                setDetailOpen(true);
                setInfo(value);
                break;
            }
            default: throw new Error("Invalid method");
        };
    }, []);

    const handleStart = () => {
        console.log(listUID);
    }

    return (
        <>
            <div className="robot">
                <div className="header">
                    <button onClick={() => setCreateOpen(true)}>Add</button>
                </div>
                {listUID ? (
                    <List listUID={listUID} setListUID={setListUID} callAPIs={callAPIs} />
                ) : (
                    <p>Loading...</p>
                )}
                <div className="footer">
                    <button onClick={handleStart}>Start</button>
                </div>
            </div>
            {isDetailOpen && info && <Modify uidInfo={info} callAPIs={callAPIs} isOpen={isDetailOpen} onClose={() => setDetailOpen(false)} />}
        </>
    )
}

export default Robot;