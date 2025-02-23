import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate is the correct hook for navigation
import {store} from '../store';
import { formatNumberCurrency } from "../shared";


const Menu = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(''); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  // Parse the search query and category from the URL (from query string)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    const searchFromURL = queryParams.get("search");
    const categoryIndex = store.categories.findIndex((i) => i.name === categoryFromURL);

    if (categoryFromURL &&  categoryIndex > -1) {
      setSelectedCategory(categoryFromURL);
      setSelectedTab(categoryIndex);
    } else {
      setSelectedCategory(store.categories[0].name); // Default to the first category
      setSelectedTab(0);
    }

    if (searchFromURL) {
      setSearchQuery(searchFromURL); // Set search query from URL
    }
  }, [location.search]);

  // Filter food items based on selected category and search query
  const filteredItems = store.products.filter((item) => {
    const matchesCategory = item.category.name === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const category = store.categories[newValue].name;
    setSelectedCategory(category);
    setSearchQuery("");  // Clear search when changing category

    // Update the URL when category changes
    const params = new URLSearchParams(location.search);
    params.set("category", category);
    params.delete("search"); // Remove the search query from URL
    navigate({ search: params.toString() }); // Update the URL without reloading
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
    const params = new URLSearchParams(location.search);
    params.set("search", e.target.value); // Update the search query in the URL
    navigate.push({ search: params.toString() }); // Update the URL without reloading
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Food Categories Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root": { fontWeight: "bold", textTransform: "none", color: "black", fontSize: "14px", mx: 3.4 },
          "& .Mui-selected": { color: "#FF5733" },
          "& .MuiTabs-indicator": { backgroundColor: "#FF5733" },
        }}
      >
        {store.categories.map((category, index) => (
          <Tab key={index} label={category.name} />
        ))}
      </Tabs>

      {/* Search Box */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {selectedCategory}
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for your favorites"
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "20px",
            border: "1px solid #ccc",
            fontSize: "16px",
            display: "none",
          }}
        />
      </Box>

      {/* Food Items Display */}
      <Grid container spacing={2} alignItems="stretch">
        {filteredItems.length === 0 ? (
          <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
            No items found for your search.
          </Typography>
        ) : (
          filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card sx={{ boxShadow: 3, borderRadius: "10px", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia component="img" height="140" image={item.thumbnail.urls.file} alt={item.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{formatNumberCurrency(Number(item.price))}</Typography>
                </CardContent>
                <Box sx={{ padding: "10px" }}>
                  <Button
                    fullWidth
                    sx={{ backgroundColor: "#32CD32", color: "black", fontWeight: "bold" }}
                    onClick={() => {
                      if (typeof addToCart === "function") {
                        addToCart({productId: item.id});
                      } else {
                        console.error("addToCart is not a function!");
                      }
                    }}
                  >
                    Order
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Menu;
