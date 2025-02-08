import { useState, useEffect, useCallback } from "react";

import styles from "./List.module.css";
import Row from "./Row";

const data = [
    {
        "info": {
            "date": "25-02-07",
            "uid": "11111",
            "note": "",
            "type": "take_care"
        },
        "config": {
            "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
            "proxy": ""
        }
    },
    {
        "info": {
            "date": "25-02-07",
            "uid": "1123",
            "note": "",
            "type": "take_care"
        },
        "config": {
            "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
            "proxy": ""
        }
    },
    {
        "info": {
            "date": "25-02-07",
            "uid": "123",
            "password": "",
            "twoFA": "",
            "email": "",
            "phone": "",
            "note": "",
            "type": "take_care"
        },
        "config": {
            "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 YaBrowser/24.12.0.0 Safari/537.36",
            "proxy": ""
        }
    },
    {
        "info": {
            "date": "25-02-07",
            "uid": "456",
            "password": "",
            "twoFA": "",
            "email": "",
            "phone": "",
            "note": "",
            "type": "take_care"
        },
        "config": {
            "useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
            "proxy": ""
        }
    },
    {
        "info": {
            "date": "25-02-07",
            "uid": "8910",
            "password": "",
            "twoFA": "",
            "email": "",
            "phone": "",
            "note": "",
            "type": "take_care"
        },
        "config": {
            "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15",
            "proxy": ""
        }
    }
];

const List = () => {
    const [listUid, setListUid] = useState([]);
    useEffect(() => {
        if (window?.electronAPIs) {
            requestUid();
            window.electronAPIs.on("robot", res => {
                console.log(res.message);
                if (res.method === "get-uids") {
                    console.log(res.data);
                    setListUid(res.data);
                } else if (res.method === "put-uid") {
                    requestUid();
                } else if (res.method === "get-name") {
                    console.log("re-render")
                    requestUid();
                }
            });
        };
    }, []);

    const requestUid = () => {
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot", { method: "get-uids", payload: null });
        } else { setListUid(data) };
    };

    const handleGetName = useCallback((uid) => {
        window.electronAPIs.send("robot", { method: "get-name", payload: uid });
    }, []);

    const handleInputChange = useCallback((uidInfo, field, value) => {
        if (field in uidInfo.info) {
            uidInfo.info[field] = value;
        } else {
            uidInfo.config[field] = value;
        };
        if (window?.electronAPIs) {
            window.electronAPIs.send("robot", {
                method: "put-uid",
                payload: uidInfo,
            });
        } else {
            return;
        }
    }, []);

    return (
        <div className={styles.list}>
            {listUid && listUid.length > 0 ? (
                <table className={styles.table}>
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
                        {listUid.map((uid, index) => (
                            <Row
                                key={index}
                                uid={uid}
                                handleGetName={handleGetName}
                                handleInputChange={handleInputChange}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}

export default List;