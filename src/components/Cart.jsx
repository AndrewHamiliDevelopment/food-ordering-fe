import React from 'react';
import { Box, Typography, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import {store} from '../store';
import { each } from 'lodash';
import { formatNumberCurrency } from '../shared';
 
const Cart = ({ onRemoveItem, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const deliveryFee = 49.0;
  const subtotal = store.cart.cartItems.reduce((acc, item) => acc + Number(item.product.price), 0);
  const total = subtotal + deliveryFee;

  console.log('subtotal', subtotal);

  return (
    <Box sx={{ width: 360, padding: 2, backgroundColor: '#fff', borderRadius: 3, boxShadow: 3 }}> 
      <Typography variant="h6" sx={{ fontStyle: 'italic',fontWeight: 'bold', color: '#000', mb: 4, textAlign: 'center', fontSize: '20px' }}>My Bag</Typography>
      {store.cart.cartItems.length === 0 ? (
        <Typography sx={{ mt: 2, color: '#777', textAlign: 'center', fontSize: '14px' }}>Your cart is empty...</Typography>
      ) : (
        <>
          {store.cart.cartItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1, padding: 1, borderRadius: 2 }}> 
              <Box sx={{ display: 'flex', alignItems: 'center', gap: -4 }}>
                <IconButton size="small" color="error" onClick={() => onRemoveItem(item.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onUpdateQuantity?.(item.id, -1)} disabled={item.quantity <= 1}>
                  <RemoveIcon fontSize="small" sx={{ color: '#000' }} />
                </IconButton>
                <Typography sx={{ mx: 1, fontWeight: 'bold', color: '#000', fontSize: '14px' }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => onUpdateQuantity?.(item.id, 1)}>
                  <AddIcon fontSize="small" sx={{ color: '#000' }} />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ color: '#F5A623', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Edit</Typography>
              </Box>
              <Typography sx={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>{formatNumberCurrency(Number(item.product.price))}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#000', fontSize: '17px' }}>Subtotal</Typography>
              <Typography variant="body2" sx={{ color: '#000', fontSize: '17px' }}>{formatNumberCurrency(subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" sx={{ color: '#000', fontSize: '17px' }}>Delivery fee</Typography>
              <Typography variant="body2" sx={{ color: '#000', fontSize: '17px' }}>₱ {deliveryFee.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', fontSize: '18px' }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', fontSize: '18px' }}>{formatNumberCurrency(total)}</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#32CD32",
              color: "#000",
              marginTop: 3,
              '&:hover': { backgroundColor: '#3CB371' },
              borderRadius: 10,
              fontWeight: 'bold',
              padding: '12px 20px',
              width: '100%',
              textTransform: 'none',
              fontSize: '17px',
              boxShadow: 1
            }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;