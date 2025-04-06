import React from "react";
import { Card, CardContent, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const schemes = [
    { 
        name: "आयुष्मान भारत योजना", 
        description: "गरिब आणि दुर्बल कुटुंबांसाठी प्रति वर्ष ₹5 लाखांपर्यंत मोफत आरोग्य कवच प्रदान करते.", 
        link: "https://pmjay.gov.in/"
    },
    { 
        name: "जननी सुरक्षा योजना", 
        description: "राष्ट्रीय आरोग्य अभियानाच्या अंतर्गत सुरक्षित मातृत्वासाठी सुरू करण्यात आलेली योजना.", 
        link: "https://nhm.gov.in/"
    },
    { 
        name: "राष्ट्रीय आरोग्य विमा योजना", 
        description: "गरीबीरेषेखालील (BPL) कुटुंबांसाठी आरोग्य विमा सुविधा प्रदान करते.", 
        link: "https://www.rsby.gov.in/"
    },
];

const GovernmentSchemes = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            style={{ padding: "20px" }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                सरकारी आरोग्य योजना
            </Typography>

            {/* योजना माहिती कार्ड */}
            <Grid container spacing={3} justifyContent="center">
                {schemes.map((scheme, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#e8f5e9" }}>
                                <CardContent>
                                    <Typography variant="h6">{scheme.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {scheme.description}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        href={scheme.link} 
                                        target="_blank"
                                        sx={{ mt: 1 }}
                                    >
                                        अधिक माहिती
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* विस्तार माहिती */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                अधिक तपशील
            </Typography>
            {schemes.map((scheme, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <Accordion sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{scheme.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{scheme.description}</Typography>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                href={scheme.link} 
                                target="_blank"
                                sx={{ mt: 1 }}
                            >
                                अधिक माहितीसाठी भेट द्या
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default GovernmentSchemes;
