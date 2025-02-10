import { useEffect, useState } from "react";
import styles from "./Robot.module.css";
import Create from "./Modals/Create/Create";
import List from "./components/List/List";
import Config from "./Modals/Config/Config";

const Robot = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [configModalDisplay, setConfigModalDisplay] = useState(false);
    const [uidInfo, setUidInfo] = useState({});
    const [listUid, setListUid] = useState([]);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);
    const openConfig = () => setConfigModalDisplay(true);
    const closeConfig = () => setConfigModalDisplay(false);

    return (
        <div className={styles.robot}>
            <button onClick={openCreate}>
                Add
            </button>
            {isCreateOpen && <Create isOpen={isCreateOpen} onClose={closeCreate} />}
            {configModalDisplay && <Config isOpen={configModalDisplay} onClose={closeConfig} uidInfo={uidInfo} />}
            {/* <h1>Robot page</h1> */}
            <List setUidInfo={(info) => { setUidInfo(info); openConfig(); }} listUid={listUid} setListUid={setListUid} />
        </div>
    );
}

export default Robot;