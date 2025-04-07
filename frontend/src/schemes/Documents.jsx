import React, { useState, useEffect } from "react";
import axios from "axios";

const Documents = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPdfs();
    }, []);

    const fetchPdfs = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://52.66.183.128:5000/pdfs");
            setPdfs(res.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching PDFs:", err);
            setError("Failed to load PDFs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-container">
            <h2>📄 Available PDFs</h2>

            {loading && <p>Loading PDFs...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="pdf-grid">
                {pdfs.length > 0 ? (
                    pdfs.map((pdf) => (
                        <div key={pdf.id} className="pdf-box">
                            <a href={`http://52.66.183.128:5000/${pdf.pdf_path}`} 
                               target="_blank" 
                               rel="noopener noreferrer">
                                📂 {pdf.name}
                            </a>
                        </div>
                    ))
                ) : (
                    !loading && <p>No PDFs available.</p>
                )}
            </div>
        </div>
    );
};

export default Documents;
