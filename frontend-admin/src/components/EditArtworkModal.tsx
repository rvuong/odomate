import React, {useState} from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField
} from '@mui/material';

type Props = {
    artwork: any;
    onClose: () => void;
    onUpdated: () => void;
    onDeleted: () => void;
};

const EditArtworkModal: React.FC<Props> = ({artwork, onClose, onUpdated, onDeleted}) => {
    const [form, setForm] = useState({
        title: artwork.title || '',
        artist: artwork.artist || '',
        year: artwork.year || '',
        description: artwork.description || ''
    });

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
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Modifier l'œuvre</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Titre"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Artiste"
                        name="artist"
                        value={form.artist}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Année"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={form.description || 'xxxx'}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                        required
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleDelete} color="error">Supprimer</Button>
                <Button onClick={handleUpdate} variant="contained">Enregistrer</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditArtworkModal;
