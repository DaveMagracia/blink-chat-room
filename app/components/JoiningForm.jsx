import React from "react";

const JoiningForm = ({ callback, alias }) => {
    return (
        <div>
            <p>Joining as {alias}</p>
            <input
                type="text"
                placeholder="Enter ID"
                className="border-2 border-b-blue-300"
            />
            <button>Next</button>
            <button onClick={() => callback("DEFAULT", alias)}>Back</button>
        </div>
    );
};

export default JoiningForm;
