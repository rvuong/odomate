import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import AddArtworkForm from "./components/AddArtworkForm";
import ArtworkTable from "./components/ArtworkTable";
import EditArtworkModal from "./components/EditArtworkModal";


const App = () => {
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
        <div className="App">
            <h1>🎨 Museum Artwork Admin</h1>
            <ArtworkTable artworks={artworks} onDelete={deleteArtwork} onEdit={setSelectedArtwork}/>
            {selectedArtwork && (
                <EditArtworkModal
                    artwork={selectedArtwork}
                    onClose={() => setSelectedArtwork(null)}
                    onUpdated={fetchArtworks}
                    onDeleted={fetchArtworks}
                />
            )}
            <AddArtworkForm onSuccess={fetchArtworks}/>
        </div>
    )
}

export default App;
