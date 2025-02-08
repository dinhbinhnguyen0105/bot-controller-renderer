import { useState } from "react";
import styles from "./Robot.module.css";
import Create from "./Modals/Create/Create";
import List from "./components/List/List";

const Robot = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);

    return (
        <div className={styles.robot}>
            <button onClick={openCreate}>
                Add
            </button>
            {isCreateOpen && <Create isOpen={isCreateOpen} onClose={closeCreate} />}
            <h1>Robot page</h1>
            <List />
        </div>
    );
}

export default Robot;