import React, { useState } from "react";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import "../styles/GovSchemes.css";

const schemesData = [
    {
        title: "शासकीय योजना",
        bgColor: "#FFEBEE",
        schemes: [
            { name: "प्रधानमंत्री आवास योजना", link: "https://pmaymis.gov.in/" },
            { name: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना (MGNREGA)", link: "https://nrega.nic.in/" },
            { name: "प्रधानमंत्री किसान सन्मान निधी", link: "https://pmkisan.gov.in/" },
            { name: "सुकन्या समृद्धी योजना", link: "https://www.nsiindia.gov.in/" },
            { name: "प्रधानमंत्री उज्ज्वला योजना", link: "https://pmuy.gov.in/" }
        ]
    },
    {
        title: "कृषी आणि शेतकरी योजना",
        bgColor: "#E3F2FD",
        schemes: [
            { name: "किसान क्रेडिट कार्ड", link: "https://pmkisan.gov.in/" },
            { name: "प्रधानमंत्री पीक विमा योजना", link: "https://pmfby.gov.in/" },
            { name: "मृदा आरोग्य कार्ड योजना", link: "https://soilhealth.dac.gov.in/" },
            { name: "प्रधानमंत्री कुसुम योजना", link: "https://mnre.gov.in/pm-kusum" }
        ]
    },
    {
        title: "महिला आणि बालकल्याण योजना",
        bgColor: "#E8F5E9",
        schemes: [
            { name: "बेटी बचाओ बेटी पढाओ", link: "https://wcd.nic.in/" },
            { name: "मातृत्व लाभ योजना", link: "https://pmsma.nhp.gov.in/" },
            { name: "आंगणवाडी आणि मध्यान्ह भोजन योजना", link: "https://middaymeal.gov.in/" }
        ]
    },
    {
        title: "शिक्षण आणि शिष्यवृत्ती योजना",
        bgColor: "#FFF3E0",
        schemes: [
            { name: "राष्ट्रीय शिष्यवृत्ती पोर्टल", link: "https://scholarships.gov.in/" },
            { name: "मोफत कोचिंग योजना", link: "https://socialjustice.gov.in/" },
            { name: "डिजिटल इंडिया ई-लर्निंग", link: "https://www.digitalindia.gov.in/" }
        ]
    },
    {
        title: "आरोग्य आणि वैद्यकीय योजना",
        bgColor: "#F3E5F5",
        schemes: [
            { name: "आयुष्मान भारत योजना", link: "https://pmjay.gov.in/" },
            { name: "जनऔषधी केंद्र", link: "https://janaushadhi.gov.in/" },
            { name: "लसीकरण आणि रोगप्रतिकारक कार्यक्रम", link: "https://www.mohfw.gov.in/" }
        ]
    },
    {
        title: "रोजगार आणि कौशल्य विकास योजना",
        bgColor: "#E1F5FE",
        schemes: [
            { name: "प्रधानमंत्री कौशल्य विकास योजना", link: "https://www.pmkvyofficial.org/" },
            { name: "स्टार्टअप इंडिया आणि मुद्रा लोन", link: "https://www.startupindia.gov.in/" },
            { name: "स्वयं सहायता गट (SHG)", link: "https://nrlm.gov.in/shgReport.do?methodName=showInit" }
        ]
    }
];

function GovSchemes() {
    const [selectedCategory, setSelectedCategory] = useState(schemesData[0]); // Default selection

    return (
        <Box className="gov-schemes-container">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="gov-schemes-title"
            >
                शासकीय योजना
            </motion.h2>

            <Box className="vertical-list">
                {schemesData.map((category, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <Card className="scheme-card" style={{ backgroundColor: category.bgColor }}>
                            <CardContent>
                                <Typography variant="h6">{category.title}</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            {selectedCategory && (
                <motion.div
                    className="scheme-details"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h5" className="scheme-category-title">{selectedCategory.title}</Typography>
                    <List>
                        {selectedCategory.schemes.map((scheme, idx) => (
                            <ListItem key={idx} component="a" href={scheme.link} target="_blank" className="scheme-link">
                                <ListItemText primary={scheme.name} />
                            </ListItem>
                        ))}
                    </List>
                </motion.div>
            )}
        </Box>
    );
}

export default GovSchemes;
