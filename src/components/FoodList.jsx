import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const FoodList = ({ addToCart }) => {
  const foodItems = [

  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', marginTop: 3 }}>
      {foodItems.map((item) => (
        <Card key={item.id} sx={{ width: 250, boxShadow: 3, borderRadius: 2 }}>
          <CardMedia component="img" height="140" image={item.image} alt={item.name} />
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>₱ {item.price}</Typography>
            <Button
              fullWidth
              sx={{ marginTop: 1, backgroundColor: '#FFC300', color: 'black' }}
              onClick={() => addToCart(item)}
            >
              Order
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FoodList;