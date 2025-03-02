import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputAdornment,
  Badge,
  Button,
  IconButton,
  TextField,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginSignup from "./LoginSignup";
import Cart from "./Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store, useStore } from "../store";

const Header = ({
  setIsLoginOpen,
  isLoginOpen,
  setSearchQuery,
  api,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const snap = useStore();
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle search input change and redirect to Menu page with search query and category
  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setSearchQuery(newSearchQuery);

      const params = new URLSearchParams();
      params.append('search', newSearchQuery);

      navigate(`/Menu?${params.toString()}`, { replace: true });
      
    }, 750);
    setSearchTimeout(timeout);
  };

  React.useEffect(() => {
    console.log("snap cart", snap.cart);
  }, [snap.cart]);

  const CartComponent = React.useMemo(() => {
    return (
      <Cart onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
    );
  }, [snap.cart]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#008000", padding: "8px 20px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo and Search Bar */}
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => navigate("/")}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ fontSize: 30, color: "black" }} />
            </IconButton>
            <img
              src="/ninja.png"
              alt="Restaurant Logo"
              style={{ height: "50px", width: "auto", borderRadius: "5px" }}
            />
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic",
              }}
            >
              FFNinja
            </Typography>
          </Box>

          {/* Search Box */}
          <TextField
            variant="outlined"
            placeholder="Search for your McDonald's favorites"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "30px",
              marginLeft: "200px",
              width: "400px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "#FF9900" },
                "&.Mui-focused fieldset": { borderColor: "#FF9900" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchChange} // Update search query and redirect to Menu page with category
          />

          {/* Navigation Links & Cart */}
          <Box
            sx={{ display: "flex", alignItems: "left", marginLeft: "350px" }}
          >
            <Button
              sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
              component={Link}
              to="/menu"
            >
              Menu
            </Button>
            <Button
              sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
              component={Link}
              to="/profile"
            >
              Profile
            </Button>
            <Button
              sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
              onClick={() => {
                if (api.user && api.user !== null) {
                  navigate("/account");
                } else {
                  setIsLoginOpen(true);
                }
              }}
            >
              My Account
            </Button>
          </Box>

          {/* Shopping Cart */}
          <IconButton sx={{ color: "black", ml: 2 }} onClick={handleCartToggle}>
            <Badge
              badgeContent={
                store.cart
                  ? store.cart.cartItems.reduce(
                      (item, val) => item + val.quantity,
                      0
                    )
                  : 0
              }
              color="error"
            >
              <ShoppingCartIcon sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={isCartOpen} onClose={handleCartToggle}>
        {CartComponent}
      </Drawer>

      {/* Login/Signup Popup */}
      {isLoginOpen && (
        <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      )}
    </Box>
  );
};

export default Header;
