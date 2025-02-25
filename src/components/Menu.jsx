import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Tabs, Tab } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = ({ foodItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract categories and include "All" as a default category
  const categories = ["All", ...new Set(foodItems.map(item => item.category))];

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categories.length === 0) return;
    
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category");
    const searchFromURL = queryParams.get("search");

    if (categoryFromURL && categories.includes(categoryFromURL)) {
      setSelectedCategory(categoryFromURL);
      setSelectedTab(categories.indexOf(categoryFromURL));
    } else {
      setSelectedCategory(categories[0]);
      setSelectedTab(0);
    }

    if (searchFromURL) {
      setSearchQuery(searchFromURL);
    }
  }, [location.search, foodItems]); // Re-run effect when foodItems change

  const filteredItems = foodItems.filter((item) => {
    return (selectedCategory === "All" || item.category === selectedCategory) &&
           item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const category = categories[newValue];
    setSelectedCategory(category);
    setSearchQuery("");
    const params = new URLSearchParams(location.search);
    params.set("category", category);
    params.delete("search");
    navigate({ search: params.toString() });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Tabs for category selection */}
      {categories.length > 0 && (
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": { fontWeight: "bold", textTransform: "none", color: "white", fontSize: "14px", mx: 1,  },
            "& .Mui-selected": { color: "lightgreen" },
            "& .MuiTabs-indicator": { backgroundColor: "green" },
          }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      )}

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "white", }}>
        {selectedCategory}
      </Typography>

      {/* Food items grid */}
      <Grid container spacing={2} alignItems="stretch">
        {filteredItems.length === 0 ? (
          <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
            No items found for your search.
          </Typography>
        ) : (
          filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card sx={{ boxShadow: 3, borderRadius: "10px", display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia component="img" image={item.image} alt={item.name} sx={{ objectFit: "cover", aspectRatio: "16/9" }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">₱ {item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
    
  );
};

export default Menu;
