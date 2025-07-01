import './ArtworkTable.css';
import React from "react";

type Artwork = {
    uuid: string;
    title: string;
    artist?: string;
    year?: number;
    description?: string;
}

type Props = {
    artworks: Artwork[];
    onDelete: (id: string) => void; // ✅ Ajout obligatoire
    onEdit: (artwork: Artwork) => void;
};

const ArtworkTable: React.FC<Props> = ({artworks, onDelete, onEdit}) => (
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
            <tr key={i} style={{ cursor: 'pointer' }}>
                <td align={"left"} onClick={() => onEdit(a)}>- {a.title}</td>
                <td align={"left"} onClick={() => onEdit(a)}>- {a.description}</td>
                <td align={"left"} onClick={() => onEdit(a)}>- {a.artist}</td>
                <td onClick={() => onEdit(a)}>{a.year}</td>
                <td>
                    <button onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
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
