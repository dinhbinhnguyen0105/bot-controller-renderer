import { useState } from 'react';
import styles from "./List.module.css";

const List = ({ listUID, setListUID, callAPIs, handleInputChange }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSort = (field) => {
        const sorted = [...listUID].sort((a, b) => {
            if (field in a.info) {
                if (a.info[field] < b.info[field]) return -1;
                if (a.info[field] > b.info[field]) return 1;

            } else if (field in a.config) {
                if (a.config[field] < b.config[field]) return -1;
                if (a.config[field] > b.config[field]) return 1;
            }
            return 0;

        });
        setListUID(sorted);
    };

    const filteredList = listUID.filter(({ info }) => {
        return (
            info.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (info.username && info.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (info.username && info.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            info.date.includes(searchTerm) // Có thể thêm các trường khác nếu cần
        );
    });

    return (
        <div className={styles.listContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th onClick={() => handleSort("date")}>Date</th>
                            <th onClick={() => handleSort("uid")}>UID</th>
                            <th onClick={() => handleSort("username")}>Username</th>
                            <th onClick={() => handleSort("type")}>Type</th>
                            <th onClick={() => handleSort("proxy")}>Proxy</th>
                            <th>Add Friend</th>
                            <th>Reel</th>
                            <th>Join Group</th>
                            <th>Post New Feed</th>
                            <th>Post Groups</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map(({ info, config }, index) => (
                            <tr key={index} data-uid={info.uid}>
                                <td>{index + 1}</td>
                                <td>{info?.date}</td>
                                <td>{info?.uid}</td>
                                <td className={styles.cellBtn}>
                                    {info?.username ? (
                                        <button onClick={(e) => callAPIs(e, "robot:launch-browser", info.uid)}>{info.username}</button>
                                    ) : (
                                        <button onClick={(e) => callAPIs(e, "robot:get-name", info.uid)}>Get username</button>
                                    )}
                                    {/* <button onClick={(e) => callAPIs(e, "robot:launch-browser", info.uid)}>{info.username}</button> */}

                                </td>
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
                                <td className={styles.cellCheck}>
                                    <input

                                        type="checkbox"
                                        checked={config?.addFriend || false}
                                        onChange={e => handleInputChange(info.uid, { config: { addFriend: e.target.checked } })}
                                    />
                                </td>
                                <td className={styles.cellCheck}>
                                    <input

                                        type="checkbox"
                                        checked={config?.reelAndLike || false}
                                        onChange={e => handleInputChange(info.uid, { config: { reelAndLike: e.target.checked } })}
                                    />
                                </td>
                                <td className={styles.cellCheck}>
                                    <input

                                        type="checkbox"
                                        checked={config?.joinGroup || false}
                                        onChange={e => handleInputChange(info.uid, { config: { joinGroup: e.target.checked } })}
                                    />
                                </td>
                                <td className={styles.cellCheck}>
                                    <input

                                        type="checkbox"
                                        checked={config?.postNewFeed || false}
                                        onChange={e => handleInputChange(info.uid, { config: { postNewFeed: e.target.checked } })}
                                    />
                                </td>
                                <td className={styles.cellCheck}>
                                    <input

                                        type="checkbox"
                                        checked={config?.postGroups || false}
                                        onChange={e => handleInputChange(info.uid, { config: { postGroups: e.target.checked } })}
                                    />
                                </td>
                                <td>
                                    <button className={`${styles.deleteBtn} ${styles.cellBtn}`} onDoubleClick={(e) => callAPIs(e, "robot:del-uid", info.uid)}>Delete</button>
                                </td>
                                <td>
                                    <button className={`${styles.configBtn} ${styles.cellBtn}`} onClick={(e) => callAPIs(e, "robot:config-uid", index)}>Config</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2>No results found</h2>
            )}
        </div>
    );
};

export default List;