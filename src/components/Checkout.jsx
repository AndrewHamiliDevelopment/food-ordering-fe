import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [position, setPosition] = useState([14.676, 121.043]); // Default to Manila
  
  const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });
  
  function LocationMarker() {
    useMapEvents({
      dragend: (event) => {
        const { lat, lng } = event.target.getLatLng();
        setPosition([lat, lng]);
        setAddress(`Lat: ${lat}, Lng: ${lng}`); // Simulated address update
      }
    });
    return <Marker position={position} draggable icon={markerIcon} />;
  }
  
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {/* Back Button */}
      <IconButton onClick={() => navigate('/menu')} sx={{ mb: 2 }}>
        <ArrowBackIcon /> Back
      </IconButton>
      
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Details</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Box>
      <TextField fullWidth label="Mobile Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} sx={{ mt: 2 }} />
      
      {/* Map Selection */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Select Delivery Location</Typography>
      <MapContainer center={position} zoom={13} style={{ height: 300, marginTop: 10 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      <TextField fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mt: 2 }} />
      
      {/* Payment Method */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Payment Method</Typography>
      <Select fullWidth value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ mt: 1 }}>
        <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
        <MenuItem value="Credit Card">Credit Card</MenuItem>
        <MenuItem value="Gcash">Gcash</MenuItem>
      </Select>
      
      {/* Order Summary */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>Order Summary</Typography>
      {cart.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography>{item.quantity}x {item.name}</Typography>
          <Typography>₱ {item.price * item.quantity}</Typography>
        </Box>
      ))}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Total: ₱ {total}</Typography>
      
      {/* Confirm Order */}
      <Button variant="contained" fullWidth sx={{ backgroundColor: '#FFC300', color: 'black', mt: 3 }}>Place Order</Button>
    </Box>
  );
};

export default Checkout;
