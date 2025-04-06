import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// ✅ वर्कर फाइल को लोकल से लोड करें (CDN एरर से बचने के लिए)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// ✅ Use the latest stable version of PDF.js Worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js`;

const ManageMember = () => {
  const [members, setMembers] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members", error);
      setError("❌ सदस्य लोड करने में समस्या आई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("क्या आप वाकई इस सदस्य को हटाना चाहते हैं?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      fetchMembers();
    } catch (error) {
      console.error("❌ सदस्य को हटाने में समस्या आई", error);
      alert("सदस्य को हटाने में समस्या आई। कृपया पुनः प्रयास करें।");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/members/download", {
        responseType: "blob",
      });
      setPdfData(URL.createObjectURL(res.data));
    } catch (error) {
      console.error("❌ PDF डाउनलोड करने में समस्या आई", error);
      alert("PDF डाउनलोड करने में समस्या आई। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>📋 सदस्य प्रबंधन (Manage Members)</h2>

      <button onClick={handleDownloadPDF} style={{ marginBottom: "10px", padding: "5px 10px" }}>
        📄 PDF डाउनलोड करें
      </button>

      {/* ✅ PDF Preview */}
      {pdfData && (
        <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "20px" }}>
          <Document file={pdfData} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
            ))}
          </Document>
        </div>
      )}

      {/* ✅ Loading & Error Handling */}
      {loading ? (
        <p>⏳ डेटा लोड हो रहा है...</p>
      ) : error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>सदस्य का नाम</th>
              <th>मोबाइल</th>
              <th>गाँव</th>
              <th>फोटो</th>
              <th>आईडी डॉक्यूमेंट</th>
              <th>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.fullName}</td>
                <td>{member.mobile}</td>
                <td>{member.village}</td>
                <td>
                  {member.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${member.photo}`}
                      alt="Profile"
                      width="50"
                      height="50"
                      onError={(e) => (e.target.src = "/default-profile.png")}
                      style={{ borderRadius: "5px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {member.govId ? (
                    <a
                      href={`http://localhost:5000/uploads/${member.govId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🔗 View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(member.id)}
                    style={{ background: "red", color: "white", padding: "5px 10px", cursor: "pointer" }}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMember;
