import React from "react";
import "./ResultOverlay.css";

const ResultOverlay = ({ matches, error, onClose }) => {
    if (!matches && !error) return null;

    const first = matches?.[0];

    return (
        <div className="overlay">
            <div className="card">
                <button onClick={onClose}>✖</button>
                {error && <p>{error}</p>}
                {matches?.length === 0 && <p>No known artwork found.</p>}
                {first && (
                    <>
                        <h2>🎨 {first.properties.title}</h2>
                        <p>🧑‍🎨 {first.properties.artist}</p>
                        {matches.length > 1 && (
                            <ul>
                                {matches.slice(1).map((m, i) => (
                                    <li key={i}>
                                        <button onClick={() => alert(JSON.stringify(m.properties))}>
                                            {m.properties.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultOverlay;
