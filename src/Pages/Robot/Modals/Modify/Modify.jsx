import { useEffect, useState } from "react";
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
                        <div className="header">{uidInfo.info.uid} - {uidInfo.info.username}</div>
                        <div className="content">
                            {uidInfo.config.addFriend && (
                                <div className="contentItem">
                                    <p>Add friends: Count:
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { addFirendCount: e.target.value } })}
                                            value={uidInfo?.actions?.addFirendCount || ""}
                                        /> GID source:
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { addFirendSource: e.target.value } })}
                                            value={uidInfo?.actions?.addFirendSource || ""}
                                        />
                                    </p>
                                </div>
                            )}
                            {uidInfo.config.reelAndLike && (
                                <div className="contentItem">
                                    <p>Watch reel & like: Count:
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { reelAndLikeCount: e.target.value } })}
                                            value={uidInfo?.actions?.reelAndLikeCount || ""}
                                        />
                                    </p>
                                </div>
                            )}
                            {uidInfo.config.joinGroup && (
                                <div className="contentItem">
                                    <p>Join new groups: Count:
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { joinGroupCount: e.target.value } })}
                                            value={uidInfo?.actions?.joinGroupCount}
                                        />
                                        Source
                                        <input
                                            type="file"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { joinGroupSource: e.target.files[0] } })}
                                        // value={uidInfo?.actions?.joinGroupSource}
                                        />
                                    </p>
                                </div>
                            )}
                            {uidInfo.config.postNewFeed && (
                                <div className="contentItem">
                                    <p>Post new feed: PID
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postNewFeedPID: e.target.value } })}
                                            value={uidInfo?.actions?.postNewFeedPID}
                                        />
                                    </p>
                                </div>
                            )}
                            {uidInfo.config.postGroups && (
                                <div className="contentItem">
                                    <p>Post groups: PID
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postGroupsPID: e.target.value } })}
                                            value={uidInfo?.actions?.postGroupsPID}
                                        />
                                        GIDs
                                        <input
                                            type="text"
                                            onChange={e => handleInputChange(uidInfo.info.uid, { actions: { postGroupsGID: e.target.value } })}
                                            value={uidInfo?.actions?.postGroupsGID}
                                        />
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="footer">
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