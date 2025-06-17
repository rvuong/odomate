import React, { useState } from 'react';
import Camera from '../Camera';
import ArtworkDetails from '../ArtworkDetails';
import { sendImageForDetection } from '../../services/detectionService';

const ArtworkDetection = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFrame = async (blob) => {
        setLoading(true);
        try {
            const response = await sendImageForDetection(blob);
            setResult(response);
        } catch (e) {
            setResult({ error: "Erreur de détection." });
        }
        setLoading(false);
    };

    return (
        <div>
            <Camera onFrameCaptured={handleFrame} />
            {loading && <p>Analyse en cours...</p>}
            <ArtworkDetails data={result} />
        </div>
    );
};

export default ArtworkDetection;
