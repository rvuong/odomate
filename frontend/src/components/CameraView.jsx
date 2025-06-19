import React, { useRef, useEffect } from "react";
import "./CameraView.css";

const CameraView = ({ onCapture }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Camera not supported in this browser.");
            return;
        }

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(console.error);
    }, []);

    const capture = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => onCapture(blob), "image/jpeg");
    };

    return (
        <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
            <button className="capture-button" onClick={capture}>📷</button>
        </div>
    );
};

export default CameraView;
