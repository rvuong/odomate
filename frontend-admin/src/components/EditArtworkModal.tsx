import React, {useState} from "react";

type Props = {
    artwork: any;
    onClose: () => void;
    onUpdated: () => void;
    onDeleted: () => void;
};

const EditArtworkModal: React.FC<Props> = ({artwork, onClose, onUpdated, onDeleted}) => {
    const [form, setForm] = useState({...artwork});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prev: any) => ({...prev, [name]: value}));
    };

    const handleUpdate = async () => {
        const res = await fetch(`/api/admin/artworks/${artwork.uuid}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        });

        if (res.ok) {
            onUpdated();
            onClose();
        } else {
            alert("Erreur lors de la mise à jour.");
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Supprimer "${artwork.title}" ?`)) return;

        const res = await fetch(`/api/admin/artworks/${artwork.uuid}`, {
            method: "DELETE",
        });
        if (res.ok) {
            onDeleted();
            onClose();
        } else {
            alert("Erreur lors de la suppression.");
        }
    };

    return (
        <div className="modal">
            <h2>Modifier les données de l'oeuvre</h2>
            <input name="title" value={form.title} onChange={handleChange}/>
            <input name="artist" value={form.artist || ""} onChange={handleChange}/>
            <input name="year" value={form.year || ""} onChange={handleChange}/>
            <textarea name="description" value={form.description || ""} onChange={handleChange}/>

            <div className="buttons">
                <button onClick={handleUpdate}>Enregistrer</button>
                <button onClick={onClose}>Annuler</button>
                <button onClick={handleDelete} style={{color: "red"}}>Supprimer</button>
            </div>
        </div>
    );
}

export default EditArtworkModal;
