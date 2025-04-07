import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateGramSabha = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ name: "", date: "", time: "", description: "" });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://52.66.183.128:5000/api/gram-sabha")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://52.66.183.128:5000/api/gram-sabha/add", form)
            .then(() => { fetchData(); setForm({ name: "", date: "", time: "", description: "" }); })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://52.66.183.128:5000/api/gram-sabha/delete/${id}`)
            .then(() => fetchData())
            .catch(err => console.log(err));
    };

    return (
        <div className="admin-container">
            <h1>📌 ग्राम सभा प्रबंधन</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ग्राम सभा का नाम" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                <textarea placeholder="नोट्स" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                <button type="submit">➕ ग्राम सभा जोड़ें</button>
            </form>

            <h2>📋 सभी ग्राम सभा बैठकें</h2>
            <table>
                <thead>
                    <tr>
                        <th>नाम</th>
                        <th>दिनांक</th>
                        <th>समय</th>
                        <th>नोट्स</th>
                        <th>⚙️ प्रबंधन</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{new Date(item.date).toDateString()}</td>
                            <td>{item.time}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>🗑️ हटाएं</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UpdateGramSabha;
