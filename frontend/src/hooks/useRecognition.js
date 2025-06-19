import { useState } from "react";

export const useRecognition = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const recognize = async (blob) => {
        setResult(null);
        setError(null);

        const form = new FormData();
        form.append("artpiece", blob);

        try {
            const res = await fetch("/api/artpiece", {
                method: "POST",
                body: form,
            });

            if (res.ok) {
                const data = await res.json();
                setResult(data.matches);
            } else {
                setError("Recognition failed.");
            }
        } catch {
            setError("Network error.");
        }
    };

    return {
        result,
        error,
        recognize,
        clear: () => {
            setResult(null);
            setError(null);
        }
    };
};
