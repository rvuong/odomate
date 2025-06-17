import React from 'react';

const ArtworkDetails = ({ data }) => {
    if (!data) return null;
    if (data.error) return <p style={{ color: 'red' }}>{data.error}</p>;

    return (
        <div>
            <h3>{data.title}</h3>
            <p><strong>Auteur :</strong> {data.author}</p>
            <p><strong>Date :</strong> {data.date}</p>
            <p>{data.description}</p>
        </div>
    );
};

export default ArtworkDetails;
