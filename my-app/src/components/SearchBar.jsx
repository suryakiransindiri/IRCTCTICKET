import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

const locations = [
  "New Delhi",
  "Mumbai",
  "Kolkata",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
];

const SearchBar = ({ onSearch }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!source || !destination || !date) {
      alert("Please fill all fields!");
      return;
    }
    onSearch(source, destination, date);
  };

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <Box display="flex" justifyContent="center" p={2}>
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px",
          width: "100%",
          maxWidth: "800px",
          gap: "12px",
          borderRadius: "12px",
        }}
      >
        {/* Source Field (Dropdown with placeholder) */}
        <TextField
          select
          label="From"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          sx={{ flex: 1 }}
          helperText={!source ? "Select Source Station" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="primary" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="" disabled>
            Select Source Station
          </MenuItem>
          {locations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>

        {/* Swap Button */}
        <IconButton onClick={swapLocations} color="primary" sx={{ mx: 1 }}>
          <SwapHorizIcon fontSize="medium" />
        </IconButton>

        {/* Destination Field (Dropdown with placeholder) */}
        <TextField
          select
          label="To"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ flex: 1 }}
          helperText={!destination ? "Select Destination Station" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="secondary" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="" disabled>
            Select Destination Station
          </MenuItem>
          {locations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>

        {/* Date Field (Proper placeholder) */}
        <TextField
          type="date"
          label="Journey Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ flex: 1 }}
          helperText={!date ? "Select Journey Date" : ""}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon color="action" />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            borderRadius: "30px",
            padding: "12px 20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          <SearchIcon />
          &nbsp; Search
        </Button>
      </Paper>
    </Box>
  );
};

export default SearchBar;
