import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmMerchantKey } from '../server.js';
import formidable from 'formidable';
import https from 'https';
import Order from '../model/order-schema.js';

export const addPaymentGateway = async (request, response) => {
    try {
        const { amount, email, items } = request.body;
        if (!amount || !email || !items) {
            return response.status(400).json({ error: 'Missing required fields: amount, email, items' });
        }

        const orderId = 'ORD_' + Date.now();

        const newOrder = new Order({
            orderId,
            userEmail: email,
            items: items.map(i => ({
                productId: i._id || i.id || null,
                name: i.title || i.name || i.productName || '',
                price: i.price || 0,
                quantity: i.quantity || 1,
            })),
            amount,
            status: 'PENDING',
            paytmResponse: {},
        });

        await newOrder.save();

        const paytmParams = {};
        paytmParams['MID'] = process.env.PAYTM_MID;
        paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
        paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID || 'Retail';
        paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID || 'WEB';
        paytmParams['ORDER_ID'] = orderId;
        paytmParams['CUST_ID'] = email;
        paytmParams['TXN_AMOUNT'] = amount.toString();
        paytmParams['CALLBACK_URL'] = `${process.env.SERVER_BASE_URL || 'http://localhost:8080'}/callback`;
        paytmParams['EMAIL'] = email;
        paytmParams['MOBILE_NO'] = request.body.mobile || '9999999999';

        const checksum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);
        paytmParams['CHECKSUMHASH'] = checksum;

        response.status(200).json({ paymentData: paytmParams, orderId });
    } catch (error) {
        console.error('addPaymentGateway error', error);
        response.status(500).json({ error: error.message });
    }
};

export const paymentResponse = async (request, response) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(request, async (err, fields) => {
            if (err) {
                console.error('Form parse error', err);
                return response.status(500).send('Unable to process payment callback');
            }

            const paytmCheckSum = fields.CHECKSUMHASH;
            delete fields.CHECKSUMHASH;

            const isVerifySignature = paytmchecksum.verifySignature(fields, paytmMerchantKey, paytmCheckSum);

            if (!isVerifySignature) {
                console.error('Checksum Mismatched');
                return response.status(400).send('Checksum mismatched');
            }

            const orderId = fields.ORDERID;
            const order = await Order.findOne({ orderId });
            if (!order) {
                console.error('Order not found', orderId);
                return response.status(404).send('Order not found');
            }

            const bankParams = {
                MID: process.env.PAYTM_MID,
                ORDERID: orderId,
            };

            const bankChecksum = await paytmchecksum.generateSignature(bankParams, paytmMerchantKey);
            bankParams.CHECKSUMHASH = bankChecksum;

            const post_data = JSON.stringify(bankParams);
            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length,
                },
            };

            let resultData = '';

            const post_req = https.request(options, (post_res) => {
                post_res.on('data', (chunk) => {
                    resultData += chunk;
                });

                post_res.on('end', async () => {
                    let result;
                    try {
                        result = JSON.parse(resultData);
                    } catch (parseError) {
                        console.error('Failed to parse paytm status response', parseError, resultData);
                        return response.status(500).send('Failed to parse Paytm response');
                    }

                    const status = result.STATUS === 'TXN_SUCCESS' ? 'SUCCESS' : 'FAILED';
                    order.status = status;
                    order.paytmResponse = result;
                    await order.save();

                    const frontendRedirect = `${process.env.CLIENT_BASE_URL || 'http://localhost:3000'}/order-status?orderId=${encodeURIComponent(
                        orderId,
                    )}&status=${status}`;

                    return response.redirect(frontendRedirect);
                });
            });

            post_req.write(post_data);
            post_req.end();
        });
    } catch (error) {
        console.error('paymentResponse error', error);
        return response.status(500).send('Payment response handling failed');
    }
};

export const getOrder = async (request, response) => {
    try {
        const { orderId } = request.params;
        if (!orderId) {
            return response.status(400).json({ error: 'Order ID required' });
        }
        const order = await Order.findOne({ orderId });
        if (!order) {
            return response.status(404).json({ error: 'Order not found' });
        }
        return response.status(200).json(order);
    } catch (error) {
        console.error('getOrder error', error);
        return response.status(500).json({ error: error.message });
    }
};
