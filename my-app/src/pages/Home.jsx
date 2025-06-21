import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Train, Search, Security, ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", pt: 6, pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 30%, #42a5f5 90%)",
          py: 10,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Railway Reservation System 🚆
          </Typography>
          <Typography variant="h6" color="white" gutterBottom>
            Book your train tickets easily and travel hassle-free with our seamless experience.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/search")}
          >
            Book Your Train Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
          Why Choose Us?
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={3}>
          {[
            {
              icon: <Search sx={{ fontSize: 50 }} />,
              title: "Easy Train Search",
              desc: "Find and book trains in just a few clicks.",
            },
            {
              icon: <Security sx={{ fontSize: 50 }} />,
              title: "Secure Transactions",
              desc: "Your payments and personal data are safe with us.",
            },
            {
              icon: <ThumbUp sx={{ fontSize: 50 }} />,
              title: "Trusted by Thousands",
              desc: "Over 10,000+ happy travelers book with us.",
            },
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  transition: "transform 0.3s ease",
                  ":hover": { transform: "translateY(-5px)" },
                }}
                elevation={4}
              >
                <CardContent>
                  <Box
                    sx={{
                      color: "#ff9800",
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ready to start your journey?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/search")}
        >
          Find Your Train
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
