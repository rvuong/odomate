export const sendImageForDetection = async (blob) => {
    const formData = new FormData();
    formData.append('image', blob, 'frame.jpg');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/detect`, {
        method: 'POST',
        body: formData,
    });

    return await response.json();
};
