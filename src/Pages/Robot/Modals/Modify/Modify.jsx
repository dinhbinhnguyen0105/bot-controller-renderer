import styles from "./Modify.module.css";

const Modify = ({ uidInfo, callAPIs, handleInputChange, isOpen, onClose }) => {
    if (!isOpen) { return null; };
    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}>
                <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <div className={styles.modalContent}>
                        <div className={styles.header}><h3>{uidInfo.info.uid} - {uidInfo.info.username}</h3></div>
                        <div className={styles.content}>
                            {uidInfo.config.addFriend && (
                                <div className={styles.contentItem}>
                                    <h4 className={styles.itemTitle}>Add friends: </h4>
                                    <div className={styles.itemContainer}>
                                        <div className={styles.itemInputContainer}>
                                            <label htmlFor="addFriend-count" className={styles.itemLabel}>Count
                                            </label>
                                            <input
                                                className={styles.itemInput}
                                                id="addFriend-count"
                                                type="text"
                                                onChange={e => handleInputChange(uidInfo.info.uid, { actions: { addFriendCount: e.target.value } })}
                                                value={uidInfo?.actions?.addFriendCount || ""}
                                            />
                                        </div>
                                        <div className={styles.itemInputContainer}>
                                            <label htmlFor="addFriend-source" className={styles.itemLabel}>GID
                                            </label>
                                            <input
                                                className={styles.itemInput}
                                                id="addFriend-source"
                                                type="text"
                                                onChange={e => handleInputChange(uidInfo.info.uid, { actions: { addFriendSource: e.target.value } })}
                                                value={uidInfo?.actions?.addFriendSource || ""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {uidInfo.config.reelAndLike && (
                                <div className={styles.contentItem}>
                                    <div className={styles.contentItem}>
                                        <h4 className={styles.itemTitle}>Watch reel & like: </h4>
                                        <div className={styles.itemContainer}>
                                            <div className={styles.itemInputContainer}>
                                                <label htmlFor="reelAndLike-count" className={styles.itemLabel}>Count
                                                </label>
                                                <input
                                                    className={styles.itemInput}
                                                    id="reelAndLike-count"
                                                    type="text"
                                                    onChange={e => handleInputChange(uidInfo.info.uid, { actions: { reelAndLikeCount: e.target.value } })}
                                                    value={uidInfo?.actions?.reelAndLikeCount || ""}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {uidInfo.config.joinGroup && (
                                <>
                                    <div className={styles.contentItem}>
                                        <h4 className={styles.itemTitle}>Join groups: </h4>
                                        <div className={styles.itemContainer}>
                                            <div className={styles.itemInputContainer}>
                                                <label htmlFor="joinGroupCount-count" className={styles.itemLabel}>Count
                                                </label>
                                                <input
                                                    className={styles.itemInput}
                                                    id="joinGroupCount-count"
                                                    type="text"
                                                    onChange={e => handleInputChange(uidInfo.info.uid, { actions: { joinGroupCount: e.target.value } })}
                                                    value={uidInfo?.actions?.joinGroupCount || ""}
                                                />
                                            </div>
                                            <div className={styles.itemInputContainer}>
                                                <label htmlFor="joinGroupSource-source" className={styles.itemLabel}>GID
                                                </label>
                                                <input
                                                    className={styles.itemInput}
                                                    type="file"
                                                    onChange={e => handleInputChange(uidInfo.info.uid, { actions: { joinGroupSource: e.target.files[0] } })}
                                                    style={{ border: "none" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {uidInfo.config.postNewFeed && (
                                <div className={styles.contentItem}>
                                    <h4 className={styles.itemTitle}>Post new feed: </h4>
                                    <div className={styles.itemContainer}>
                                        <div className={styles.itemInputContainer}>
                                            <label htmlFor="postNewFeedPID" className={styles.itemLabel}>PID
                                            </label>
                                            <input
                                                className={styles.itemInput}
                                                id="postNewFeedPID"
                                                type="text"
                                                onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postNewFeedPID: e.target.value } })}
                                                value={uidInfo?.actions?.postNewFeedPID || ""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {uidInfo.config.postGroups && (
                                <div className={styles.contentItem}>
                                    <h4 className={styles.itemTitle}>Post groups: </h4>
                                    <div className={styles.itemContainer}>
                                        <div className={styles.itemInputContainer}>
                                            <label htmlFor="postGroupsPID" className={styles.itemLabel}>PID
                                            </label>
                                            <input
                                                className={styles.itemInput}
                                                id="postGroupsPID"
                                                type="text"
                                                onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postGroupsPID: e.target.value } })}
                                                value={uidInfo?.actions?.postGroupsPID || ""}
                                            />
                                        </div>
                                        <div className={styles.itemInputContainer}>
                                            <label htmlFor="postGroupsGID" className={styles.itemLabel}>GIDs
                                            </label>
                                            <input
                                                className={styles.itemInput}
                                                id="postGroupsGID"
                                                type="text"
                                                onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postGroupsGID: e.target.value } })}
                                                value={uidInfo?.actions?.postGroupsGID || ""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.footer}>
                            <button
                                onClick={e => callAPIs(e, "robot:put-uid", uidInfo)}
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modify;