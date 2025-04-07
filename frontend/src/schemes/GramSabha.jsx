import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/GramSabha.css";

const GramSabha = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://52.66.183.128:5000/api/gram-sabha")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <motion.div className="gramsabha-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <h1>📢 आगामी ग्रामसभा बैठक</h1>
            <div className="gramsabha-list">
                {data.length > 0 ? data.map((item) => (
                    <motion.div 
                        key={item.id} 
                        className="gramsabha-card"
                        whileHover={{ scale: 1.1 }}
                    >
                        <h2>{item.name}</h2>
                        <p><strong>📅 दिनांक:</strong> {new Date(item.date).toDateString()}</p>
                        <p><strong>⏰ वेळ:</strong> {item.time}</p>
                        <p><strong>📆 वार:</strong> {new Date(item.date).toLocaleDateString('mr-IN', { weekday: 'long' })}</p>
                        <p><strong>📝 टीप:</strong> {item.description}</p>
                    </motion.div>
                )) : <p>🚧 कोणतीही ग्रामसभा बैठक उपलब्ध नाही!</p>}
            </div>
        </motion.div>
    );
};

export default GramSabha;
