import React from "react";
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Container, List, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import "../styles/AboutHealth.css";


const healthTopics = [
    { 
        title: "स्वच्छतेचे महत्त्व", 
        points: [
            "• नियमित हात धुणे आजार टाळण्यासाठी महत्त्वाचे आहे.",
            "• घर आणि परिसर स्वच्छ ठेवा.",
            "• दूषित पाणी आणि अन्न सेवन करू नका.",
            "• सार्वजनिक ठिकाणी शिष्टाचार पाळा, मास्क आणि हॅण्ड सॅनिटायझर वापरा.",
            "• कपडे नियमितपणे धुवा आणि सूर्यप्रकाशात वाळवा.",
            "• आजारी व्यक्तींशी संपर्क साधताना काळजी घ्या."
        ]
    },
    { 
        title: "सामान्य आजार आणि प्रतिबंध", 
        points: [
            "• मलेरिया आणि डेंग्यू टाळण्यासाठी मच्छरदाणी वापरा.",
            "• स्वच्छ व शुद्ध पाणी प्या आणि उकळून वापरा.",
            "• टायफॉईड आणि कावीळ यांसारख्या आजारांपासून बचावासाठी योग्य लसीकरण करा.",
            "• नियमित आरोग्य तपासणी करून घ्या.",
            "• जंतासंसर्ग टाळण्यासाठी स्वच्छता आणि संतुलित आहार घ्या.",
            "• ताप, सर्दी आणि खोकला असल्यास त्वरित डॉक्टरांचा सल्ला घ्या."
        ]
    },
    { 
        title: "पौष्टिक आहार", 
        points: [
            "• रोजीच्या आहारात प्रथिने, जीवनसत्त्वे आणि खनिजे असावी.",
            "• ताजे फळे आणि पालेभाज्या अधिक खा.",
            "• जंक फूड आणि गोड पदार्थांचे प्रमाण कमी ठेवा.",
            "• शरीराला आवश्यक असणाऱ्या पोषणतत्त्वांची माहिती घ्या.",
            "• भरपूर पाणी प्या आणि हायड्रेटेड राहा.",
            "• तुप, गूळ आणि सुकामेवा यांचा आहारात समावेश करा."
        ]
    },
    { 
        title: "नियमित व्यायाम", 
        points: [
            "• दररोज किमान ३० मिनिटे व्यायाम करा.",
            "• चालणे, धावणे, सायकलिंग आणि योगासन करा.",
            "• स्नायू मजबूत करण्यासाठी स्ट्रेचिंग आणि वेट ट्रेनिंग करा.",
            "• मानसिक आरोग्यासाठी ध्यान आणि श्वसनव्यायाम करा.",
            "• सततच्या बसण्यामुळे होणारे आजार टाळण्यासाठी शरीर हालचालीत ठेवा.",
            "• झोपण्यापूर्वी हलका व्यायाम केल्याने झोप सुधारते."
        ]
    },
];

const AboutHealth = () => {
    return (
<Container maxWidth="md" className="about-health-container">
<motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
            >
                <Typography variant="h3" align="center" gutterBottom>
                    आरोग्याविषयी माहिती
                </Typography>

                <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#f5f5f5" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            आरोग्य जागरूकता का महत्त्वाची आहे?
                        </Typography>
                        <Typography variant="body1">
                            चांगले आरोग्य ही आनंदी आणि निरोगी जीवनाची गुरुकिल्ली आहे. स्वच्छता राखणे, पौष्टिक आहार घेणे आणि नियमित व्यायाम करणे 
                            यामुळे अनेक आजार टाळता येतात आणि एकूण आरोग्य सुधारते.
                        </Typography>
                    </CardContent>
                </Card>

                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                    महत्त्वाचे आरोग्य विषय
                </Typography>

                {healthTopics.map((topic, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <Accordion sx={{ mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{topic.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {topic.points.map((point, idx) => (
                                        <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                                            {point}
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    </motion.div>
                ))}
            </motion.div>
        </Container>
    );
};

export default AboutHealth;
