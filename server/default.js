import { products } from './constants/data.js';
import Product from './model/product-schema.js';

const DefaultData = async () => {
    try {
        // Clear existing data (for fresh categorized data)
        await Product.deleteMany({});
        
        // Insert new categorized products
        await Product.insertMany(products);
        console.log('Data imported successfully with categories');
    } catch (error) {
        console.log('Error while inserting data:', error.message);
    }
}

export default DefaultData;