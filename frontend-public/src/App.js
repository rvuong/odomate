import React from "react";
import CameraView from "./components/CameraView";
import ResultOverlay from "./components/ResultOverlay";
import { useRecognition } from "./hooks/useRecognition";
import './App.css';

function App() {
    const { result, error, recognize, clear } = useRecognition();

    return (
        <>
            <CameraView onCapture={recognize} />
            <ResultOverlay matches={result} error={error} onClose={clear} />
        </>
    );
}

export default App;
