// import { useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    let { cartItems } = cartDetails;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const goToCheckout = () => {
        if (!cartItems.length) {
            alert('Your cart is empty. Add items before checking out.');
            return;
        }
        navigate('/checkout');
    }


    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        <div>

                        {   cartItems.map((item, index) => (
                                <CartItem key={index} item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                        </div>
                    <BottomWrapper>
                        <StyledButton onClick={goToCheckout} variant="contained">Checkout</StyledButton>
                    </BottomWrapper> 
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;