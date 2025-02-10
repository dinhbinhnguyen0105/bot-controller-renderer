// import { useState } from "react";
// import styles from "./List.module.css";

const List = ({ listUID, setListUID, callAPIs, handleInputChange }) => {
    const handleSort = (field) => {
        const sorted = [...listUID].sort((a, b) => {
            if (a.info[field] < b.info[field]) return -1;
            if (a.info[field] > b.info[field]) return 1;
            return 0;
        });
        setListUID(sorted);
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
                                <td>{info?.date}</td>
                                <td>{info?.uid}</td>
                                <td>{info?.username ? (
                                    <button onClick={(e) => callAPIs(e, "robot:launch-browser", info.uid)}>Open {info.username}</button>

                                ) : (
                                    <button onClick={(e) => callAPIs(e, "robot:get-name", info.uid)}>Get username</button>
                                )}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={info?.type || ""}
                                        onChange={e => handleInputChange(info.uid, { info: { type: e.target.value } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={config?.proxy || ""}
                                        onChange={e => handleInputChange(info.uid, { config: { proxy: e.target.value } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config?.addFriend || false}
                                        onChange={e => handleInputChange(info.uid, { config: { addFriend: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config?.reelAndLike || false}
                                        onChange={e => handleInputChange(info.uid, { config: { reelAndLike: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config?.joinGroup || false}
                                        onChange={e => handleInputChange(info.uid, { config: { joinGroup: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config?.postNewFeed || false}
                                        onChange={e => handleInputChange(info.uid, { config: { postNewFeed: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={config?.postGroups || false}
                                        onChange={e => handleInputChange(info.uid, { config: { postGroups: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <button onDoubleClick={(e) => callAPIs(e, "robot:del-uid", info.uid)}>Delete</button>
                                </td>
                                <td><button onClick={(e) => callAPIs(e, "robot:config-uid", index)}>Config</button></td>
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