import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const authenticateSignup = async(data)=>{
     try {
        return await axios.post(`${URL}/signup`, data)
     } catch (error) {
        console.log('Error while calling api', error);
     }
}

export const authenticateLogin = async(data)=>{
     try {
        return await axios.post(`${URL}/login`, data)
     } catch (error) {
        console.log('Error while calling login api', error);
        return error.response;
     }
}
export const getProductById = async (id) => {
   try {
       return await axios.get(`${URL}/product/${id}`);
   } catch (error) {
       console.log('Error while getting product by id response', error);
   }
}
export const payUsingPaytm = async (data) => {
   try {
      let response = await axios.post(`${URL}/payment`, data);
      return response.data;
   } catch (error) {
      console.log("error in paytm api", error);
      throw error;
   }
}

export const getOrder = async (orderId) => {
   try {
      let response = await axios.get(`${URL}/order/${orderId}`);
      return response.data;
   } catch (error) {
      console.log("error getting order", error);
      throw error;
   }
};

export const createOrder = async (orderData) => {
   try {
      let response = await axios.post(`${URL}/orders`, orderData);
      return response.data;
   } catch (error) {
      console.log("error creating order", error);
      throw error;
   }
};

export const getOrders = async () => {
   try {
      let response = await axios.get(`${URL}/orders`);
      return response.data;
   } catch (error) {
      console.log("error getting orders", error);
      throw error;
   }
};
