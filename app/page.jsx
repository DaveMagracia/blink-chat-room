"use client";

import { useState, useEffect, useRef } from "react";
import DefaultForm from "./components/DefaultForm";
import HostingForm from "./components/HostingForm";
import JoiningForm from "./components/JoiningForm";
import Loading from "./components/Loading";
import { initializeApp } from "firebase/app";
import MODES from "./modes";

export default function Home() {
    const [mode, setMode] = useState(MODES.DEFAULT);
    const [alias, setAlias] = useState(process.env.FIREBASE_DB_URL);
    const [password, setPassword] = useState("");
    console.log(process.env.NEXT_PUBLIC_FIREBASE_DB_URL);
    // const app = initializeApp();

    if (mode == MODES.START) {
        initRoom(alias, password, (newMode) => setMode(newMode));
    }

    const setFormMode = (newMode, newAlias, password) => {
        setPassword(password);
        setAlias(newAlias);
        setMode(newMode);
    };

    const getForm = () => {
        switch (mode) {
            case MODES.HOSTING:
                return (
                    <HostingForm
                        callback={(newMode, alias, password) => {
                            setFormMode(newMode, alias, password);
                        }}
                        alias={alias}
                    />
                );
            case MODES.JOINING:
                return (
                    <JoiningForm
                        callback={(newMode, alias) => {
                            setFormMode(newMode, alias);
                        }}
                        alias={alias}
                    />
                );
            case MODES.DEFAULT:
                return (
                    <DefaultForm
                        callback={(newMode, alias) => {
                            setFormMode(newMode, alias);
                        }}
                        myAlias={alias}
                    />
                );
            case MODES.LOADING:
                return <Loading />;
            default:
                return <>no mode set</>;
        }
    };

    return (
        <>
            <h1 className="text-9xl">Blink</h1>
            <div>{getForm()}</div>
        </>
    );
}
