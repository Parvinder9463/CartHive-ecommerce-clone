import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ margin: 10 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.url}
        alt={product.title?.shortTitle}
      />
      <CardContent>
        <Typography variant="body1">
          {product.title?.shortTitle}
        </Typography>
        <Typography variant="h6">
          ₹{product.price?.cost}
        </Typography>
        <Typography variant="body2" color="green">
          {product.price?.discount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;