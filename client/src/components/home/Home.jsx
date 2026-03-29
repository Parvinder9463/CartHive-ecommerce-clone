import React, { useEffect } from 'react';
import { Grid, Box, Typography, styled } from '@mui/material';
import NavBar from './Navbar';
import Banner from './Banner';
import Slide from './Slide';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
import ProductCard from '../Items/ProductCard';
import MidSlide from "./MidSlide";
import MidSection from './MidSection';

const Component = styled(Box)`
  padding: 10px;
  background: #f2f2f2;
`;

const ProductsSection = styled(Box)`
  margin-top: 30px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 4px;
`;

const SectionHeader = styled(Box)`
  margin-bottom: 24px;
`;

const Home = () => {
  const { products, loading } = useSelector(state => state.getProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Component>
        <Banner />

        <MidSlide
  products={products.slice(0, 5)}
  title='Discounts for You'
  timer={false}
  multi={true}
/>

        <MidSection />

        <Slide
  products={products.slice(0, 5)}
  title='Suggested Items'
  timer={false}
  multi={false}
/>

<Slide
  products={products.slice(5, 10)}
  title='Top Selection'
  timer={false}
  multi={true}
/>

<Slide
  products={products.slice(10, 15)}
  title='Recommended Items'
  timer={false}
  multi={true}
/>

        {/* All Products Grid */}
        <ProductsSection>
          <SectionHeader>
            <Typography variant="h5" fontWeight={600} color="#212121" mb={1}>
              All Products
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Latest arrivals and trending products
            </Typography>
          </SectionHeader>
          
          {loading ? (
            <Box textAlign="center" py={8}>
              <Typography>Loading products...</Typography>
            </Box>
          ) : products && products.length > 0 ? (
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={product._id || index}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={8}>
              <Typography variant="h6" color="textSecondary">
                No products available
              </Typography>
            </Box>
          )}
        </ProductsSection>

      </Component>
    </>
  );
};

export default Home;