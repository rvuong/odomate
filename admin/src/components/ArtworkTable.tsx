const ArtworkTable = ({ artworks }: { artworks: any[] }) => (
    <table>
        <thead>
        <tr>
                <th>Title</th>
        </tr>
        </thead>
        <tbody>
        {artworks.map((a, i) => (
            <tr key={i}>
                <td>{a.title}</td>
            </tr>
        ))}
        </tbody>
    </table>
);
export default ArtworkTable;
