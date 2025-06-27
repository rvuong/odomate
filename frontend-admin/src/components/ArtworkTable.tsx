import './ArtworkTable.css';

const ArtworkTable = ({ artworks }: { artworks: any[] }) => (
    <table>
        <thead>
        <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Artiste</th>
                <th>Year</th>
        </tr>
        </thead>
        <tbody>
        {artworks.map((a, i) => (
            <tr key={i}>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>{a.artist}</td>
                <td>{a.year}</td>
            </tr>
        ))}
        </tbody>
    </table>
);
export default ArtworkTable;
