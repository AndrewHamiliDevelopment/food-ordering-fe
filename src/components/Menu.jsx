import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  CardContent,
  Button,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate is the correct hook for navigation
import { store } from "../store";
import { formatNumberCurrency } from "../shared";
import InfiniteScroll from "react-infinite-scroll-component";
import { filter } from "lodash";
import { Card, Col, Container, Dropdown, Row } from "react-bootstrap";

const Menu = ({ addToCart, api }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default category
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);

  // Parse the search query and category from the URL (from query string)
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const categoryFromURL = queryParams.get("category");
  //   const searchFromURL = queryParams.get("search");
  //   const categoryIndex = store.categories.findIndex((i) => i.name === categoryFromURL);

  //   if (categoryFromURL &&  categoryIndex > -1) {
  //     setSelectedCategory(categoryFromURL);
  //     setSelectedTab(categoryIndex);
  //   } else {
  //     setSelectedCategory(store.categories.length > 0 ? store.categories[0].name: ''); // Default to the first category
  //     setSelectedTab(0);
  //   }

  //   if (searchFromURL) {
  //     setSearchQuery(searchFromURL); // Set search query from URL
  //   }
  // }, [location.search]);

  // Filter food items based on selected category and search query
  // const filteredItems = store.products.filter((item) => {
  //   const matchesCategory = item.category.name === selectedCategory;
  //   const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  // const handleTabChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  //   const category = store.categories[newValue].name;
  //   setSelectedCategory(category);
  //   setSearchQuery("");  // Clear search when changing category

  //   // Update the URL when category changes
  //   const params = new URLSearchParams(location.search);
  //   params.set("category", category);
  //   params.delete("search"); // Remove the search query from URL
  //   navigate({ search: params.toString() }); // Update the URL without reloading
  // };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value); // Update search query state
  //   const params = new URLSearchParams(location.search);
  //   params.set("search", e.target.value); // Update the search query in the URL
  //   navigate.push({ search: params.toString() }); // Update the URL without reloading
  // };

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    setIsLoading(true);
    setSearchQuery(params.get("search"));
    api
      .getProducts({ search })
      .then((res) => {
        store.products = res.data.data;
        store.paginatedProducts = res.data;
      })
      .catch((error) => console.error("error", error))
      .finally(() => setIsLoading(false));
  }, [location.search]);

  React.useEffect(() => {
    //filter product based on selected tab
    setFilteredProducts(
      store.paginatedProducts.data.filter(
        (product) => product.category.id === store.categories[selectedTab].id
      )
    );
  }, [store.paginatedProducts, selectedTab]);

  const handleTabChange = (e, value) => {
    setSelectedTab(value);
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
          "& .MuiTab-root": {
            fontWeight: "bold",
            textTransform: "none",
            color: "black",
            fontSize: "14px",
            mx: 3.4,
          },
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
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
            {`No "${searchQuery}" products matched in this category`}
          </Typography>
        ) : (
          <Container fluid>
            <Row>
              <InfiniteScroll dataLength={filteredProducts.length}>
                {filteredProducts.map((item, index) => (
                  <Col>
                  <Card onClick={() => {
                    const products = [];
                    for(let i = 0; i < 20; i++) {
                    products.push(item);
                    setFilteredProducts(products);
                    }
                  }}>
                    <Card.Img variant="top" src={item.thumbnail.urls.file}></Card.Img>
                  </Card>
                  </Col>
                ))}
              </InfiniteScroll>
            </Row>
          </Container>
        )}
      </Grid>
    </Box>
  );
};

export default Menu;
