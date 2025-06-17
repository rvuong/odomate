import React, { useRef, useEffect } from 'react';
import './style.css';

const Camera = ({ onFrameCaptured }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(console.error);
    }, []);

    const captureFrame = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        // canvas.toBlob(blob => onFrameCaptured(blob), 'image/jpeg');
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'photo.jpg');

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (data.status === 'ok') {
                    alert('✅ Image envoyée avec succès !');
                } else {
                    alert('❌ Réponse inattendue du serveur');
                }
            } catch (error) {
                console.error(error);
                alert('❌ Erreur lors de l’envoi de l’image');
            }
        }, 'image/jpeg');
    };

    return (
        <div className="camera-wrapper">
            <video ref={videoRef} autoPlay playsInline muted width="100%" />
            <button onClick={captureFrame}>📤 Analyser</button>
        </div>
    );
};

export default Camera;
