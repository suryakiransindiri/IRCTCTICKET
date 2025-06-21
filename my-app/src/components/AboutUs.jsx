import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  People,
  VerifiedUser,
  Speed,
  Train,
  Star,
  EmojiEvents,
} from "@mui/icons-material";

const AboutUs = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9", py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
            borderRadius: 3,
            color: "#fff",
            px: 4,
            py: 8,
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Get to Know Us 🚆
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "800px", mx: "auto" }}>
            We make train booking <strong>simple, fast, and reliable</strong>.
            Travel worry-free with real-time updates and secure transactions.
          </Typography>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
            Our Impact 📈
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              {
                title: "1K+",
                subtitle: "Happy Users",
                icon: <People fontSize="large" />,
              },
              {
                title: "4.9",
                subtitle: "Google Rating",
                icon: <Star fontSize="large" />,
              },
              {
                title: "4.8",
                subtitle: "Trustpilot Score",
                icon: <EmojiEvents fontSize="large" />,
              },
              {
                title: "10K+",
                subtitle: "Total Bookings",
                icon: <Train fontSize="large" />,
              },
            ].map((item, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 3,
                    px: 1,
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: "#f57c00", mb: 1 }}>{item.icon}</Box>
                    <Typography variant="h5" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Core Values */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
            Our Core Values 🌟
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <Star />,
                title: "Customer First",
                desc: "We prioritize user satisfaction and experience.",
              },
              {
                icon: <VerifiedUser />,
                title: "Security",
                desc: "Your data and payments are always protected.",
              },
              {
                icon: <Speed />,
                title: "Efficiency",
                desc: "Fast, intuitive, and smooth booking experience.",
              },
            ].map((value, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Card
                  sx={{
                    textAlign: "center",
                    px: 3,
                    py: 4,
                    boxShadow: 2,
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: 5 },
                  }}
                >
                  <CardContent>
                    <Box sx={{ fontSize: 40, color: "#ff9800", mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

     
      </Container>
    </Box>
  );
};

export default AboutUs;
