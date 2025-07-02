import React from "react";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";


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
    <TableContainer component={Paper} sx={{mt: 3}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Artiste</TableCell>
                    <TableCell>Année</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {artworks.map((artwork) => (
                    <TableRow
                        key={artwork.uuid}
                        hover
                        onClick={() => onEdit(artwork)}
                        sx={{cursor: 'pointer'}}
                    >
                        <TableCell>{artwork.title}</TableCell>
                        <TableCell>{artwork.artist}</TableCell>
                        <TableCell>{artwork.year}</TableCell>
                        <TableCell>{artwork.description}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation(); // Empêche la propagation du clic
                                    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${artwork.title}" ?`)) {
                                        onDelete(artwork.uuid);
                                    }
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default ArtworkTable;
