// import { useState } from "react";
// import styles from "./List.module.css";

const List = ({ listUID, setListUID, callAPIs }) => {
    const handleSort = (field) => {
        const sorted = [...listUID].sort((a, b) => {
            if (a.info[field] < b.info[field]) return -1;
            if (a.info[field] > b.info[field]) return 1;
            return 0;
        });
        setListUID(sorted);
    };

    const handleInputChange = (index, field, value) => {
        setListUID(prev => {
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

    return (
        <div className="list">
            {listUID.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("date")}>Date</th>
                            <th onClick={() => handleSort("uid")}>UID</th>
                            <th onClick={() => handleSort("username")}>Username</th>
                            <th onClick={() => handleSort("type")}>Type</th>
                            <th>Proxy</th>
                            <th>Add Friend</th>
                            <th>Reel</th>
                            <th>Join Group</th>
                            <th>Post New Feed</th>
                            <th>Post Groups</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUID.map(({ info, config }, index) => (
                            <tr key={index}>
                                <td>{info.date}</td>
                                <td>{info.uid}</td>
                                <td>{info.username ? (
                                    <button onClick={(e) => callAPIs({ method: "robot:launch-browser", value: info.uid, setListUID: setListUID, e: e })}>Open {info.username}</button>
                                ) : (
                                    <button onClick={(e) => callAPIs({ method: "robot:get-name", value: info.uid, setListUID: setListUID, e: e })}>Get username</button>
                                )}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={info.type || ""}
                                        onChange={e => handleInputChange(index, "type", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={info.proxy || ""}
                                        onChange={e => handleInputChange(index, "proxy", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config.addFriend || false}
                                        onChange={e => handleInputChange(index, "addFriend", e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config.reelAndLike || false}
                                        onChange={e => handleInputChange(index, "reelAndLike", e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config.joinGroup || false}
                                        onChange={e => handleInputChange(index, "joinGroup", e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config.postNewFeed || false}
                                        onChange={e => handleInputChange(index, "postNewFeed", e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config.postGroups || false}
                                        onChange={e => handleInputChange(index, "postGroups", e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <button onDoubleClick={() => callAPIs("robot:del-uid", info.uid)}>Delete</button>
                                </td>
                                <td><button onClick={(e) => callAPIs({ method: "robot:config-uid", value: { info: info, config: config }, setListUID: setListUID, e: e })}>Config</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>Data not available</h2>
            )}
        </div>
    )
}

export default List;