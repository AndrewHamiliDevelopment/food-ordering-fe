import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginSignup from "./LoginSignup";

const Header = ({ setIsLoginOpen, isLoginOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#EAEAEA", padding: "8px 20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo and Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon sx={{ fontSize: 30, color: "black" }} />
            </IconButton>
            <img src="/ninja.png" alt="Restaurant Logo" style={{ height: "50px", width: "auto", borderRadius: "5px" }} />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold", color: "black", fontStyle: "italic"}}>
              ADMIN PORTAL
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "left", marginRight: "40px" , gap: 2}}>
            <Button sx={{ color: "black", textTransform: "none", fontWeight: "bold" }} component={Link} to="/menu">
              ViewProduct
            </Button>
            <Button sx={{ color: "black", textTransform: "none", fontWeight: "bold" }} component={Link} to="/profile">
              AdminProfile
            </Button>
            <Button sx={{ color: "black", textTransform: "none", fontWeight: "bold" }} onClick={() => setIsLoginOpen(true)}>
              MyAccount
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login/Signup Popup */}
      {isLoginOpen && <LoginSignup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />}
    </Box>
  );
};

export default Header;
