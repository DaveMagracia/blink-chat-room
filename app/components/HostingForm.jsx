import React from "react";
import { useState } from "react";

const HostingForm = ({ callback, alias }) => {
    const maxChars = 15;
    const [password, setPassword] = useState("");

    const handlePasswordOnChange = (event) => {
        setPassword((prev) => {
            let newValue = event.target.value;
            if (newValue.slice(-1) == " ") newValue = newValue.slice(0, -1);
            return newValue.length > maxChars ? prev : newValue;
        });
    };

    return (
        <div>
            <p>Joining as {alias}</p>
            <input
                type="password"
                value={password}
                placeholder="Create password (optional)"
                onChange={handlePasswordOnChange}
                className="border-2 border-b-blue-300"
            />
            <button onClick={() => callback("START", alias, password)}>
                Start
            </button>
            <button onClick={() => callback("DEFAULT", alias)}>Back</button>
        </div>
    );
};

export default HostingForm;
