import React, {useState, useEffect} from "react";
import CameraView from "./components/CameraView";
import ResultOverlay from "./components/ResultOverlay";
import {useRecognition} from "./hooks/useRecognition";

function App() {
    const {result, error, recognize, clear} = useRecognition();
    const [showOverlay, setShowOverlay] = useState(false);

    // Affiche overlay dès qu’un résultat ou une erreur est dispo
    useEffect(() => {
        if (result || error) {
            setShowOverlay(true);
        }
    }, [result, error]);

    const handleClose = () => {
        setShowOverlay(false);
        clear();
    };

    return (
        <>
            <CameraView onCapture={recognize}/>
            {showOverlay && (
                <ResultOverlay
                    matches={result}
                    error={error}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export default App;
