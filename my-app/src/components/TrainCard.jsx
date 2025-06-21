import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "react-router-dom";

const getSeatColor = (seats) => {
  if (seats > 50) return "success"; // Green (High availability)
  if (seats > 20) return "warning"; // Orange (Medium availability)
  return "error"; // Red (Low availability)
};

const calculateDuration = (departure, arrival) => {
  const depTime = new Date(`1970-01-01T${departure}`);
  const arrTime = new Date(`1970-01-01T${arrival}`);
  const duration = (arrTime - depTime) / (1000 * 60); // Convert milliseconds to minutes

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

const TrainCard = ({ train }) => {
  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: "16px",
        p: 2,
        background: "linear-gradient(135deg, #f3f4f6, #e3eaf2)",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent>
        {/* Train Name & Type */}
        <Box display="flex" alignItems="center" mb={1}>
          <TrainIcon fontSize="large" color="primary" />
          <Typography variant="h6" fontWeight="bold" ml={1}>
            {train.name} ({train.trainType})
          </Typography>
        </Box>

        {/* Train Number */}
        <Typography variant="body1">
          Train Number: <b>{train.trainNumber}</b>
        </Typography>

        {/* Route Information */}
        <Box display="flex" alignItems="center" mt={1}>
          <PlaceIcon color="info" />
          <Typography variant="body1" ml={1}>
            {train.sourceStation} ➝ {train.destinationStation}
          </Typography>
        </Box>

        {/* Departure, Arrival & Duration */}
        <Typography variant="body1">
          Departure: <b>{train.departureTime}</b> - Arrival:{" "}
          <b>{train.arrivalTime}</b>
        </Typography>
        <Box display="flex" alignItems="center">
          <AccessTimeIcon color="secondary" />
          <Typography variant="body1" ml={1} fontWeight="bold">
            Duration:{" "}
            {calculateDuration(train.departureTime, train.arrivalTime)}
          </Typography>
        </Box>

        {/* Fare & Seat Availability */}
        <Box mt={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <MonetizationOnIcon color="success" />
            <Typography variant="body1" ml={1} fontWeight="bold">
              Fare: ₹{train.fare}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EventSeatIcon color={getSeatColor(train.availableSeats)} />
            <Typography variant="body1" ml={1} fontWeight="bold">
              Available Seats: {train.availableSeats}
            </Typography>
          </Box>
        </Box>

        {/* Class Types (Dynamic Chip Display) */}
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">
            Available Classes:
          </Typography>
          <Box mt={1} display="flex" flexWrap="wrap">
            {train.classes.map((cls, index) => (
              <Tooltip key={index} title={`Class: ${cls}`}>
                <Chip
                  label={cls}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            component={Link}
            to={`/train-details/${train.trainNumber}`}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/booking/${train.trainNumber}`}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
