import React from "react";
import "../../styles/About.css";

const About = () => {
  return (
    <div className="panchayat-container">

      {/* Header Section */}
      <section className="panchayat-header">
        <h1>Gram Panchayat </h1>
        <p>Explore all about village governance, services, and development projects.</p>
      </section>

      {/* About Panchayat */}
      <section className="about-panchayat">
        <h2> Gram Panchayat</h2>
        <p>
        आपलं गाव ही ग्रामपंचायत म्हणजे आपल्या गावाचा एक सामाजिक, प्रशासनिक आणि विकासात्मक पाया आहे. ग्रामपंचायतीद्वारे गावातील सर्व नागरिकांना विविध सरकारी सेवा आणि योजना उपलब्ध करून दिल्या जातात.

ग्रामपंचायत गावातील स्थानिक स्वराज्य संस्था असून ती गावाच्या सर्वांगीण विकासासाठी कार्य करते. गावातील पाणीपुरवठा, रस्ते, स्वच्छता, आरोग्य, शिक्षण, वीज, महिला-बालकल्याण योजना, वृद्धांसाठी सेवा, कृषी सहाय्य अशा अनेक क्षेत्रांमध्ये ग्रामपंचायत महत्त्वाची भूमिका बजावते.

ग्रामसभा ही ग्रामपंचायतीची सर्वोच्च संस्था असून नागरिकांच्या सहभागातून निर्णय घेतले जातात. गावातील प्रत्येक व्यक्तीचा सहभाग ग्रामविकासात महत्त्वाचा असतो.

आपल्या ग्रामपंचायतीचे ध्येय गावाचा सर्वांगीण विकास करणे व प्रत्येक गावकऱ्याच्या जीवनमानात सुधारणा घडवून आणणे हेच आहे.

**मुख्य कार्य:**
- गावातील पायाभूत सुविधा उभारणे
- स्वच्छता आणि आरोग्य योजनांची अंमलबजावणी
- सरकारी योजना आणि निधींचे वितरण
- ग्रामसभा आयोजित करणे
- महिला, बालक आणि वृद्ध नागरिकांसाठी उपयुक्त सेवा

**आपली ग्रामपंचायत, आपली जबाबदारी!**

        </p>
      </section>

      {/* Key Officials */}
      <section className="panchayat-members">
        <h2>Key Officials</h2>
        <div className="members-grid">
          <div className="member-card">
            <img src="/assets/sarpanch.jpg" alt="Sarpanch" />
            <h3>Sarpanch: Mr. Ramesh Patil</h3>
            <p>Contact: +91 9876543210</p>
          </div>

          <div className="member-card">
            <img src="/assets/secretary.jpg" alt="Secretary" />
            <h3>Secretary: Mrs. Anjali Deshmukh</h3>
            <p>Contact: +91 9876543211</p>
          </div>

          <div className="member-card">
            <img src="/assets/upasarpanch.jpg" alt="Upa-Sarpanch" />
            <h3>Upa-Sarpanch: Mr. Pravin Shinde</h3>
            <p>Contact: +91 9876543212</p>
          </div>
        </div>
      </section>

      {/* Schemes Section */}
      <section className="panchayat-schemes">
        <h2>Active Government Schemes</h2>
        <ul>
          <li>
            <strong>PM Awas Yojana:</strong> Affordable housing for rural families. <a href="https://pmay.gov.in" target="_blank" rel="noopener noreferrer">Learn More</a>
          </li>
          <li>
            <strong>MNREGA:</strong> Guaranteed 100 days of rural employment. <a href="https://nrega.nic.in" target="_blank" rel="noopener noreferrer">Learn More</a>
          </li>
          <li>
            <strong>Swachh Bharat:</strong> Sanitation and hygiene improvement. <a href="https://swachhbharat.mygov.in" target="_blank" rel="noopener noreferrer">Learn More</a>
          </li>
        </ul>
      </section>

      {/* Development Projects */}
      <section className="development-projects">
        <h2>Ongoing & Upcoming Projects</h2>
        <p>Here are the latest development initiatives in our village:</p>
        <ul>
          <li>✅ Road Construction Project – Estimated Completion: Dec 2025</li>
          <li>✅ Water Supply Enhancement – Ongoing</li>
          <li>✅ Solar Street Lighting – Planned for 2025</li>
        </ul>
      </section>

      {/* Grievance Section */}
      <section className="grievance-box">
        <h2>Submit a Complaint</h2>
        <p>If you have any grievances or issues, please let us know.</p>
        <a href="/complaints" className="complaint-btn">Submit Complaint</a>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <h2>Contact Gram Panchayat</h2>
        <p>Office Address: Gram Panchayat Office, Village Center</p>
        <p>Phone: +91 9876543210</p>
        <a href="https://wa.me/1234567890" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
          📲 Join Our WhatsApp Group
        </a>
      </section>

    </div>
  );
};

export default About;
