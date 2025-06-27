import './App.css';
import React, {useEffect, useState} from "react";
import AddArtworkForm from "./components/AddArtworkForm";
import ArtworkTable from "./components/ArtworkTable";

const App = () => {
    const [artworks, setArtworks] = useState<any[]>([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('/api/admin/artworks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArtworks(data);
            } catch (error) {
                console.error('Failed to fetch artworks:', error);
            }
        };

        fetchArtworks();
    }, []);
    
    return (
        <div>
            <h1>🎨 Museum Artwork Admin</h1>
            <ArtworkTable artworks={artworks} />
            <AddArtworkForm onSuccess={function(): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
    )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
