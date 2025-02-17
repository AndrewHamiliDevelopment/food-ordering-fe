import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar, Typography, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFC300', padding: '5px 20px' }}> 
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Section: Logo and Menu Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <img 
              src="/mcdo.png"  
              alt="Restaurant Logo" 
              style={{ height: '50px', width: 'auto' }} 
            />
            <Typography variant="h6" component="div" sx={{ ml: 1, fontWeight: 'bold', color: 'black' }}>
              McDelivery
            </Typography>
          </Box>

          {/* Center: Search Box */}
          <TextField
            variant="outlined"
            placeholder="Search for your McDonald's favorites"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: '30px',
              width: '400px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: '#FF9900' },
                '&.Mui-focused fieldset': { borderColor: '#FF9900' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Right Section: Navigation Links & Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {['Home', 'Menu', 'Send to Many', 'Orders', 'My Account'].map((text) => (
              <Button 
                key={text} 
                sx={{ 
                  color: 'black', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  mx: 1, 
                  fontFamily: 'Roboto, sans-serif'
                }}
              >
                {text}
              </Button>
            ))}

            <IconButton sx={{ color: 'black', ml: 2 }}>
              <img
                src="/basket.png"  
                alt="Cart"
                style={{ height: '30px', width: 'auto' }}  
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
