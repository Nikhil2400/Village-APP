import React from "react";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Primary Schools",
    description: "Well-equipped primary schools with trained staff and digital classrooms.",
  },
  {
    title: "High Schools & Colleges",
    description: "Science, Commerce, and Arts streams with hostel & transportation facilities.",
  },
  {
    title: "Libraries",
    description: "Village and school libraries for students & citizens with free resources.",
  },
  {
    title: "Scholarships",
    description: "Government schemes and financial aid for underprivileged students.",
  },
  {
    title: "Student Help Desks",
    description: "Guidance, form filling support, and career counseling at panchayat office.",
  },
  {
    title: "Digital Learning Centers",
    description: "Smart classrooms and e-learning setups for rural students.",
  },
  {
    title: "Anganwadi Centers",
    description: "Pre-primary learning for children with nutrition and care facilities.",
  },
  {
    title: "Computer Training",
    description: "Free computer training for students and youth to enhance digital literacy.",
  },
  {
    title: "Adult Education Programs",
    description: "Evening classes and literacy drives for adult villagers.",
  },
  {
    title: "Girl Child Education",
    description: "Special focus programs to promote education for girls in the village.",
  },
  {
    title: "Vocational Training",
    description: "Skill development courses in tailoring, electrical work, and farming tech.",
  },
  {
    title: "Education for Specially-Abled",
    description: "Inclusive education centers with facilities for children with disabilities.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Edu = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, color: "#fff" }}
      >
        📚 Education 
      </Typography>

      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card
                sx={{
                  height: "100%",
                  background: "#f5f5f5",
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s",
                  ":hover": { transform: "scale(1.05)", background: "#e3f2fd" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "#1565c0" }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body2">{section.description}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Edu;
