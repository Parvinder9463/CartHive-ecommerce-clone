import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByTag } from '../../redux/actions/productAction';

const ItemList = () => {
  const { tag } = useParams();
  const { products, loading, error } = useSelector(
    (state) => state.getProductByTag
  );
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProductByTag(tag));
  }, [dispatch, tag]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      let filtered = products;

      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (product) =>
            product.title?.shortTitle
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.title?.longTitle
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', borderRadius: '4px' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Filter Section */}
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          placeholder="Search products in this category..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: { xs: '100%', sm: '250px' } }}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: '8px' }} />,
          }}
        />

        <Button
          variant="outlined"
          onClick={() => setSearchQuery('')}
          disabled={!searchQuery}
        >
          Clear Search
        </Button>
      </Box>

      {/* Results Info */}
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="body2" color="textSecondary">
          Category: <strong>{tag || 'All'}</strong> | Showing {filteredProducts.length} products
        </Typography>
      </Box>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={2}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', borderRadius: '4px' }}>
          <Typography variant="h6">No products found</Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ItemList;