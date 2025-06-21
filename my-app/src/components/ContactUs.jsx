import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: 6, bgcolor: "#f4f6f8" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Contact Us 📞
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2} maxWidth="600px" mx="auto">
            We'd love to hear from you! Whether it’s support, inquiries, or feedback—feel free to reach out.
          </Typography>
        </Box>

        {/* Contact Info Grid */}
        <Grid container spacing={4} justifyContent="center">
          {/* Address */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                boxShadow: 4,
                bgcolor: "#ffffff",
              }}
            >
              <LocationOn sx={{ fontSize: 50, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Head Office
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                123 Railway Avenue, Sector 10,
                <br />
                New Delhi - 110001, India
              </Typography>
            </Paper>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                boxShadow: 4,
                bgcolor: "#ffffff",
              }}
            >
              <Phone sx={{ fontSize: 50, color: "#388e3c" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Customer Support
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Toll-Free: 1800-123-4567
                <br />
                Landline: +91-11-45678901
              </Typography>
            </Paper>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                boxShadow: 4,
                bgcolor: "#ffffff",
              }}
            >
              <Email sx={{ fontSize: 50, color: "#d32f2f" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Email Support
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                support@trackvision.com
                <br />
                booking@trackvision.com
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Working Hours */}
        <Box textAlign="center" mt={10}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h4" fontWeight="bold" color="primary" mb={1}>
            Working Hours 🕒
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Mon - Sat:</strong> 8:00 AM - 10:00 PM
            <br />
            <strong>Sunday & Holidays:</strong> 9:00 AM - 6:00 PM
          </Typography>
        </Box>

        {/* Social Media */}
        <Box textAlign="center" mt={10}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h4" fontWeight="bold" color="primary">
            Connect With Us 🌐
          </Typography>
          <Box mt={3} display="flex" justifyContent="center" gap={4}>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook sx={{ fontSize: 40, color: "#1877F2" }} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter sx={{ fontSize: 40, color: "#1DA1F2" }} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram sx={{ fontSize: 40, color: "#E1306C" }} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
