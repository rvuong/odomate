import React, {useState} from "react";
import './AddArtworkForm.css';

type Props = { onSuccess: () => void };

const AddArtworkForm: React.FC<Props> = ({onSuccess}) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        file: null as File | null,
    });

    // const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setForm(prev => ({...prev, file}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.description || !form.file) return;

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("file", form.file);

        try {
            const res = await fetch("/api/admin/artworks", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setMessage("Artwork uploaded successfully!");
                setMessageType("success");
                if (typeof onSuccess === "function") {
                    try {
                        onSuccess();
                    } catch (e) {
                        console.error("Error in onSuccess callback:", e);
                    }
                }
                setForm({title: "", description: "", file: null});
            } else {
                setMessage(`Failed to upload artwork`);
                setMessageType("error");
            }
        } catch (error) {
            setMessage(`Failed to upload artwork exception`);
            setMessageType("error");
        }

        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000);

    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange}/>
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}/>
            <input type="file" accept="image/*" onChange={handleFileChange}/>
            <button type="submit">Valider</button>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}
        </form>
    );
};

export default AddArtworkForm;
