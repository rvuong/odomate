import React, {useRef, useEffect} from "react";
import {Box, Button} from '@chakra-ui/react';


const CameraView = ({onCapture}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Camera not supported in this browser.");
            return;
        }

        navigator.mediaDevices
            .getUserMedia({video: {facingMode: "environment"}})
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
        <Box position="relative" w="100%" h="100vh" bg="black">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            <Button
                position="absolute"
                bottom={6}
                left="50%"
                transform="translateX(-50%)"
                colorScheme="teal"
                onClick={capture}
                size="lg"
                borderRadius="full"
            >
                Analyser
            </Button>
        </Box>
    );
};

export default CameraView;
