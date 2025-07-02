import React, {useCallback, useEffect, useState} from "react";
import {Box, Container, FormControlLabel, Switch, Typography} from "@mui/material";
import AddArtworkForm from "./components/AddArtworkForm";
import ArtworkTable from "./components/ArtworkTable";
import EditArtworkModal from "./components/EditArtworkModal";


type Props = {
    toggleMode?: () => void; // Optional for theme toggle
    mode?: 'light' | 'dark'; // Optional for theme mode
};

const App: React.FC<Props> = ({toggleMode, mode}) => {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null); // Placeholder for potential future state

    const fetchArtworks = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/artworks');
            if (!res.ok) throw new Error('Network error');
            const data = await res.json();
            setArtworks(data);
        } catch (err) {
            console.error("❌ Failed to fetch artworks:", err);
        }
    }, []);

    useEffect(() => {
        fetchArtworks();
    }, [fetchArtworks]);


    const deleteArtwork = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/artworks/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                fetchArtworks(); // 🔄 refresh list
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (err) {
            console.error("❌ Suppression échouée :", err);
            alert("Erreur réseau");
        }
    };

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                mt={4}
                mb={2}
            >
                <Typography variant="h4" component="h1">
                    Museum Artwork Admin
                </Typography>
                <FormControlLabel
                    control={<Switch checked={mode === 'dark'} onChange={toggleMode}/>}
                    label={mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                />
            </Box>

            <ArtworkTable artworks={artworks} onDelete={deleteArtwork} onEdit={setSelectedArtwork}/>
            <AddArtworkForm onSuccess={fetchArtworks}/>
            {selectedArtwork && (
                <EditArtworkModal
                    artwork={selectedArtwork}
                    onClose={() => setSelectedArtwork(null)}
                    onUpdated={fetchArtworks}
                    onDeleted={fetchArtworks}
                />
            )}
        </Container>
    );
};

export default App;
