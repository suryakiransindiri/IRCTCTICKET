import React, { useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResult";

const Search = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrains = async (source, destination, date) => {
    if (!source || !destination || !date) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9090/api/search?source=${source}&destination=${destination}&date=${date}`
      );
      const data = await response.json();

      setTrains(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching train data:", error);
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Search Bar */}
      <Paper elevation={5} sx={{ maxWidth: 900, mx: "auto", my: 4, p: 2 }}>
        <SearchBar onSearch={fetchTrains} />
      </Paper>

      {/* Search Results */}
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 2 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="30vh"
          >
            <CircularProgress size={60} thickness={5} color="primary" />
          </Box>
        ) : (
          <SearchResults trains={trains} />
        )}
      </Box>
    </Box>
  );
};

export default Search;
