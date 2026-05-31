import React, { useEffect } from "react";
import { useState } from "react";

const DefaultForm = ({ callback, myAlias }) => {
    const maxChars = 10;
    const [alias, setAlias] = useState(myAlias);
    const [errorMsg, setErrorMsg] = useState("");

    const handleAliasOnChange = (event) => {
        setAlias((prev) => {
            let newValue = event.target.value;
            if (newValue.slice(-1) == " ") newValue = newValue.slice(0, -1);
            return newValue.length > maxChars ? prev : newValue;
        });
    };

    const handleButtonClick = (mode) => {
        if (alias.length == 0) {
            setErrorMsg("No alias provided");
        } else {
            callback(mode, alias);
        }
    };

    const showErrors = () => {
        if (errorMsg) return <p className="text-red-500">{errorMsg}</p>;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="alias"
                value={alias}
                onChange={handleAliasOnChange}
                className="border-2 border-b-blue-300"
            />
            {showErrors()}
            <button onClick={() => handleButtonClick("HOSTING", alias)}>
                Host
            </button>
            <button onClick={() => handleButtonClick("JOINING", alias)}>
                Join
            </button>
        </div>
    );
};

export default DefaultForm;
