import  express from 'express';
import { getProducts, getProductById, getProductByTag } from '../controller/product-controller.js';
import { userSignup, userLogin } from '../controller/user-controller.js';
import { addPaymentGateway, paymentResponse, getOrder } from '../controller/payment-controller.js';
import { createOrder, getOrders, getOrderById } from '../controller/order-controller.js';
const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

router.get('/products/',getProducts);
router.get('/product/:id', getProductById);
router.get('/items/:tag', getProductByTag);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);
router.get('/order/:orderId', getOrder);

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrderById);

export default router;
