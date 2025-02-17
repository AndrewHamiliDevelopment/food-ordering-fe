import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Your cart is empty.</Typography>
      ) : (
        cartItems.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1 }}>
            <Box>
              <Typography>{item.name}</Typography>
              <Typography variant="body2">₱ {item.price * item.quantity}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={() => onUpdateQuantity(item.id, -1)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => onUpdateQuantity(item.id, 1)}>
                <AddIcon />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => onRemoveItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Total: ₱ {totalPrice}</Typography>
          <Button fullWidth sx={{ backgroundColor: '#FFC300', color: 'black', fontWeight: 'bold', mt: 2 }}>
            CHECKOUT
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;