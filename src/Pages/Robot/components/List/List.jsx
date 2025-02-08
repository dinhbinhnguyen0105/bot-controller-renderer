import { useState, useEffect } from "react";

import styles from "./List.module.css";

const List = () => {
    const [listUid, setListUid] = useState([]);
    useEffect(() => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:list-uid", { payload: null });
            window.electronAPIs.on("robot:list-uid", res => {
                setListUid(res.data)
            });
        }
    }, []);

    const handleLaunchBrowser = (e, uid) => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:launch-browser", { payload: uid });
            const defaultBtnLabel = e.target.innerText;
            e.target.innerText = "Opening ...";
            window.electronAPIs.on("robot:launch-browser", res => !res.data ? e.target.innerText = defaultBtnLabel : undefined);
        };
    };
    const handleGetUserName = (e, index) => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:get-name", { uid: listUid[index].info.uid });
            window.electronAPIs.on("robot:get-name", res => {
                if (res.data === true) { e.target.innerText = "Loading ..."; }
                else if (typeof res.data === "string") {
                    setListUid(prev => {
                        const newList = [...prev];
                        newList[index].info.username = res.data;
                        return newList;
                    });
                }
            })
        }
    };
    const handleInputChange = (index, field, value) => {
        setListUid(prev => {
            const newList = [...prev];
            if (field in newList[index].info) {
                newList[index] = {
                    ...newList[index],
                    info: {
                        ...newList[index].info,
                        [field]: value,
                    }
                };
            } else {
                newList[index] = {
                    ...newList[index],
                    config: {
                        ...newList[index].config,
                        [field]: value,
                    }
                };
            }
            return newList;
        });
    };
    const handleOnBlur = index => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:put-uid", { payload: listUid[index] });
        };
    };
    const handleDelete = index => {
        setListUid(prev => prev.filter((_, i) => i !== index));
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot:del-uid", { payload: listUid[index].info.uid });
        }
    };
    const handleConfig = index => { index };

    return (
        <div className={styles.list}>
            {listUid.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>UID</th>
                            <th>Username</th>
                            <th>Type</th>
                            <th>Proxy</th>
                            <th>Add Friend</th>
                            <th>Reel</th>
                            <th>Join Group</th>
                            <th>Post New Feed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUid.map((uid, index) => (
                                <tr key={index}>
                                    <td>{uid.info.date}</td>
                                    <td>{uid.info.uid}</td>
                                    <td>
                                        {uid.info.username ? (
                                            <button
                                                onClick={e => handleLaunchBrowser(e, uid.info.uid)}
                                            >Open {uid.info.username}</button>
                                        ) : (
                                            <button
                                                onClick={e => handleGetUserName(e, index)}
                                            >Get username</button>
                                        )}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={uid.info.type || ""}
                                            onChange={e => handleInputChange(index, "type", e.target.value)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={uid.config.proxy || ""}
                                            onChange={e => handleInputChange(index, "proxy", e.target.value)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={uid.config.addFriend || false}
                                            onChange={e => handleInputChange(index, "addFriend", e.target.checked)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={uid.config.reelAndLike || false}
                                            onChange={e => handleInputChange(index, 'reelAndLike', e.target.checked)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={uid.config.joinGroup || false}
                                            onChange={e => handleInputChange(index, 'joinGroup', e.target.checked)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={uid.config.postNewFeed || false}
                                            onChange={e => handleInputChange(index, 'postNewFeed', e.target.checked)}
                                            onBlur={() => handleOnBlur(index)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleConfig(index)}>Config</button>
                                        <button onDoubleClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default List;