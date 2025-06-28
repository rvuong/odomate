import './ArtworkTable.css';
import React from "react";

type Artwork = {
    uuid: string;
    title: string;
    artist?: string;
    description: string;
    year: number;
}

type Props = {
    artworks: Artwork[];
    onDelete: (id: string) => void; // ✅ Ajout obligatoire
};

const ArtworkTable: React.FC<Props> = ({artworks, onDelete}) => (
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Artiste</th>
            <th>Year</th>
            <th>🗑️</th>
        </tr>
        </thead>
        <tbody>
        {artworks.map((a, i) => (
            <tr key={i}>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>{a.artist}</td>
                <td>{a.year}</td>
                <td>
                    <button onClick={() => {
                        if (confirm(`Are you sure you want to delete ${a.title}?`)) {
                            onDelete(a.uuid);
                        }
                    }}>🗑️
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);
export default ArtworkTable;
