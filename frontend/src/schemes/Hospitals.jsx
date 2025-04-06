import React from "react";
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// वाई तालुक्यातील रुग्णालये
const hospitals = [
    { 
        name: "रुरल हॉस्पिटल, वाई", 
        address: "1054, Brahmanshahi, Wai, Maharashtra 412803", 
        contact: "+91 7755886633",
        googleMaps: "https://www.google.com/maps/place/Rural+Hospital,+Wai/@17.9151606,73.8520708,13z/data=!4m10!1m2!2m1!1swai+hospital+list!3m6!1s0x3bc25cdf6d63069b:0xc6af8ec7b6e6e8ce!8m2!3d17.9535652!4d73.8902922!15sChF3YWkgaG9zcGl0YWwgbGlzdFoTIhF3YWkgaG9zcGl0YWwgbGlzdJIBE2dvdmVybm1lbnRfaG9zcGl0YWyaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTkVkV1pmU2xoM0VBReABAPoBBAgaECs!16s%2Fg%2F11rvv8tf8?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3Dw.google.com/maps?q=civil+hospital+wai"
    },
    { 
        name: "प्रायमरी हेल्थ सेंटर, बावधन", 
        address: "WV7W+8GM, Satara Rd, Bavdhan, Satara, Maharashtra 412804", 
        contact: "+91 02167276176",
        googleMaps: "https://www.google.com/maps/place/Bavdhan,+Maharashtra+412804/@17.915165,73.8881207,16z/data=!3m1!4b1!4m22!1m15!4m14!1m6!1m2!1s0x3bc243223f86f2eb:0xeddae65d2c586aa5!2sPrimary+Health+Centre,+Bavdhan!2m2!1d73.8962933!2d17.9133363!1m6!1m2!1s0x3bc243223f86f2eb:0xeddae65d2c586aa5!2sWV7W%2B8GM+Primary+Health+Centre,+Bavdhan,+Satara+Rd,+Bavdhan,+Satara,+Maharashtra+412804!2m2!1d73.8962933!2d17.9133363!3m5!1s0x3bc2432112dd7819:0x2f0c765b9e62aa57!8m2!3d17.9148407!4d73.8911548!16s%2Fg%2F1tz6_vl1?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D.com/maps?q=primary+health+center+menawali"
    },
    { 
        name: "गीतांजली हॉस्पिटल वाई", 
        address: "2410/B, Wai, near S.T. Stand Road, Tal, Siddhanathwadi, Wai, Maharashtra 412803", 
        contact: "+91 08605064788",
        googleMaps: "https://www.google.com/maps/dir/Geetanjali+Multispeciality+Hospital+Wai+%7C+Top+General+%26+Laparoscopic+Surgeon+in+Satara+District/Geetanjali+Multispeciality+Hospital+Wai+%7C+Top+General+%26+Laparoscopic+Surgeon+in+Satara+District,+2410%2FB,+Wai+-+Satara+Rd,+near+S.T.+Stand+Road,+Tal,+Siddhanathwadi,+Wai,+Maharashtra+412803/@17.9487936,73.8433832,13z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3bc25d26f2e19ed7:0xd002e2655d796244!2m2!1d73.884583!2d17.9487979!1m5!1m1!1s0x3bc25d26f2e19ed7:0xd002e2655d796244!2m2!1d73.884583!2d17.9487979?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D://www.google.com/maps?q=siddhivinayak+hospital+wai"
    },
];

const Hospitals = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            style={{ padding: "20px" }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                <LocalHospitalIcon fontSize="large" color="primary" /> Hospitals
            </Typography>

            {/* हॉस्पिटल्स कार्ड स्वरूपात */}
            <Grid container spacing={3} justifyContent="center">
                {hospitals.map((hospital, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#f3e5f5" }}>
                                <CardContent>
                                    <Typography variant="h6">{hospital.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        📍 {hospital.address}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        📞 {hospital.contact}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        startIcon={<CallIcon />}
                                        href={`tel:${hospital.contact}`}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        कॉल करा
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<LocationOnIcon />}
                                        href={hospital.googleMaps} 
                                        target="_blank"
                                        sx={{ mt: 1 }}
                                    >
                                        नकाशावर पहा
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* हॉस्पिटल्स तक्ता स्वरूपात */}
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                रुग्णालयांचा तपशील
            </Typography>
            <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5 }}
            >
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>नाव</b></TableCell>
                                <TableCell><b>पत्ता</b></TableCell>
                                <TableCell><b>संपर्क</b></TableCell>
                                <TableCell><b>नकाशा</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitals.map((hospital, index) => (
                                <TableRow key={index}>
                                    <TableCell>{hospital.name}</TableCell>
                                    <TableCell>{hospital.address}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            href={`tel:${hospital.contact}`}
                                            startIcon={<CallIcon />}
                                        >
                                            कॉल करा
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            href={hospital.googleMaps} 
                                            target="_blank"
                                            startIcon={<LocationOnIcon />}
                                        >
                                            नकाशावर पहा
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>
        </motion.div>
    );
};

export default Hospitals;
