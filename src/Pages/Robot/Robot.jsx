import { useEffect, useState } from "react";

import styles from "./Robot.module.css";
import List from "./List/List";
import Detail from "./modals/Detail/Detail";

const Robot = () => {
    const [listUID, setListUID] = useState(null);
    const [info, setInfo] = useState(null);
    const [isDetailOpen, setDetailOpen] = useState(false);
    const [isCreateOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:list-uid", { payload: null });
            window.electronAPIs.on("robot:list-uid", res => setListUID(res.data));
        } else {
            setListUID([
                {
                    info: {
                        date: "25-02-08",
                        uid: "61570948720725",
                        username: "test-1",
                        type: "takecare",
                    },
                    config: {
                        addFriend: true,
                    }
                },
                {
                    info: {
                        date: "25-02-08",
                        uid: "001",
                        username: "test-2",
                        type: "takecare",
                    },
                    config: {
                        addFriend: true,
                    }
                },
            ]);
        };
    }, []);

    const callAPIs = async (method, value, UIDIndex) => {
        if (!listUID.length) { console.log("listUID = []"); return; };
        if (window?.electronAPIs) {
            switch (method) {
                case "robot:list-uid": {
                    window.electronAPIs.send("robot:list-uid", { payload: null });
                    break;
                }
                case "robot:put-uid": {
                    window.electronAPIs.send("robot:put-uid", { payload: value });
                    break;
                }
                case "robot:del-uid": {
                    window.electronAPIs.send("robot:del-uid", { payload: value });
                    break;
                }
                case "robot:launch-browser": {
                    window.electronAPIs.send("robot:launch-browser", { payload: value });
                    break;
                }
                case "robot:get-name": {
                    window.electronAPIs.send("robot:get-name", { payload: value });
                    break;
                }
                case "robot:detail-uid": {
                    setInfo(value);
                    setDetailOpen(true);
                    break;
                }
                default: throw new Error("Invalid method");
            };
        } else {
            if (method === "robot:detail-uid") {
                setInfo(value);
                setDetailOpen(true);
            };
        };
    };

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
            </div>
            {isDetailOpen && info && <Detail uidInfo={info} callAPIs={callAPIs} isOpen={isDetailOpen} onClose={() => setDetailOpen(false)} />}
        </>
    )
}

export default Robot;