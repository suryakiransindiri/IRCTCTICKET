import React from "react";
import { Box, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const SearchResults = ({ trains = [], onBookTicket }) => {
  return (
    <Box p={4} bgcolor="#f0f4f8" minHeight="50vh">
      <Typography variant="h4" mb={3} textAlign="center" fontWeight="bold" color="#1976d2">
        Train Search Results
      </Typography>

      {trains.length > 0 ? (
        trains.map((train) => (
          <Card
            key={train.trainNumber}
            elevation={6}
            sx={{
              maxWidth: "800px",
              margin: "auto",
              mb: 3,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f3f4f6, #e3eaf2)",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              {/* Train Name and Type */}
              <Box display="flex" alignItems="center" mb={2}>
                <TrainIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontWeight="bold" ml={1} color="#333">
                  {train.name} ({train.trainType})
                </Typography>
              </Box>

              {/* Train Number & Timing */}
              <Typography variant="body1" color="#444">
                <b>Train Number:</b> {train.trainNumber}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <AccessTimeIcon color="action" fontSize="small" />
                <Typography variant="body1" ml={1} color="#444">
                  <b>Departure:</b> {train.departureTime} - <b>Arrival:</b> {train.arrivalTime}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Fare and Seats */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  <MonetizationOnIcon color="success" fontSize="small" />
                  <Typography variant="body1" ml={1} fontWeight="bold" color="#2e7d32">
                    Fare: ₹{train.fare}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <EventSeatIcon color="secondary" fontSize="small" />
                  <Typography variant="body1" ml={1} fontWeight="bold" color="#d32f2f">
                    Available Seats: {train.availableSeats}
                  </Typography>
                </Box>
              </Box>

              {/* Book Ticket Button */}
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: "8px", textTransform: "none", fontWeight: "bold" }}
                  onClick={() => onBookTicket(train)}
                >
                  Book Ticket
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card elevation={6} sx={{ padding: 3, borderRadius: "16px", textAlign: "center", background: "#fff3f3", maxWidth: "600px", margin: "auto" }}>
          <Typography variant="h6" color="error">
            No trains available for the selected route.
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default SearchResults;
