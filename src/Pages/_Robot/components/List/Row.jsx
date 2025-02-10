import { memo, useState } from "react";

const Row = memo(({ uid, handleInputChange, handleGetName }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        handleGetName(uid.info.uid);
        // setIsLoading(false);
    };

    return (
        <tr>
            <td>{uid.info.date}</td>
            <td>{uid.info.uid}</td>
            <td>
                {uid.info.username ? (
                    uid.info.username
                ) : (
                    <button onClick={handleClick} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Get Username"}
                    </button>
                )}
            </td>
            <td>
                <input
                    type="text"
                    value={uid.info.type || ""}
                    onChange={e => handleInputChange(uid, 'type', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={uid.config.proxy || "N/A"}
                    onChange={e => handleInputChange(uid, 'proxy', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={uid.config.addFriend || false}
                    onChange={e => handleInputChange(uid, 'addFriend', e.target.checked)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={uid.config.reelAndLike || false}
                    onChange={e => handleInputChange(uid, 'reelAndLike', e.target.checked)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={uid.config.joinGroup || false}
                    onChange={e => handleInputChange(uid, 'joinGroup', e.target.checked)}
                />
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={uid.config.postNewFeed || false}
                    onChange={e => handleInputChange(uid, 'postNewFeed', e.target.checked)}
                />
            </td>
        </tr>
    );
});

Row.displayName = "Row";
export default Row;