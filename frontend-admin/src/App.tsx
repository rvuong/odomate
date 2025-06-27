import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import AddArtworkForm from "./components/AddArtworkForm";
import ArtworkTable from "./components/ArtworkTable";

const App = () => {
    const [artworks, setArtworks] = useState<any[]>([]);

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

    return (
        <div className="App">
            <h1>🎨 Museum Artwork Admin</h1>
            <ArtworkTable artworks={artworks}/>
            <AddArtworkForm onSuccess={fetchArtworks}/>
        </div>
    )
}

export default App;
