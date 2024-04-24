const cloudinary = require('cloudinary');
const models = require('../models');
const getDataUri = require('../helpers/image');

const createNewProduct = async (req, res) => {
    try {
        const { name, price, description, farm_id, process_id, trader_id, processing_method } = req.body;
        
        // Validate input data
        if (!name || !price || !description || !farm_id || !process_id || !trader_id || !processing_method) {
            return res.status(400).send({
                success: false,
                message: 'Missing required fields in request body'
            });
        }

        // Check if required resources exist in the database
        const [farmExists, processExists, traderExists] = await Promise.all([
            models.Farm.findByPk(farm_id),
            models.Care_process.findByPk(process_id),
            models.Traders.findByPk(trader_id)
        ]);
        if (!farmExists || !processExists || !traderExists) {
            return res.status(404).send({
                success: false,
                message: 'Farm_id, process_id, or trader_id does not exist in the database'
            });
        }

        // Check if image file exists
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'No image file uploaded'
            });
        }

        // Get image data URI
        const file = getDataUri.getDataUri(req.file);
        const imageData = {
            name: req.file.originalname, // Get the original filename
            path: file.content // Get the data URI content
        };

        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(imageData.path);
        const imageUrl = {
            id: result.public_id,
            url: result.secure_url
        }; // Get the secure URL of the uploaded image

        // Create new product in the database
        const product = await models.Product.create({
            name,
            price,
            description,
            farm_id,
            process_id,
            trader_id,
            processing_method,
            images: [imageUrl] // Use the secure URL of the uploaded image
        });

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Product created successfully',
            product,
            imageUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while creating the product',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        
        console.log(req.params);
       const {id} = req.params
        
        const { name, price, description, farm_id, process_id, trader_id, processing_method } = req.body;
        
        // Find the product by ID
        const product = await models.Product.findByPk(id)
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }
        const [farmExists, processExists, traderExists] = await Promise.all([
            models.Farm.findByPk(farm_id),
            models.Care_process.findByPk(process_id),
            models.Traders.findByPk(trader_id)
        ]);
        if (!farmExists || !processExists || !traderExists) {
            return res.status(404).send({
                success: false,
                message: 'Farm_id, process_id, or trader_id does not exist in the database'
            });
        }
        // Check if image file exists
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'No image file uploaded'
            });
        }
        const file = getDataUri.getDataUri(req.file);
        const imageData = {
            name: req.file.originalname, // Get the original filename
            path: file.content // Get the data URI content
        };

        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(imageData.path);
        const imageUrl = {
            id: result.public_id,
            url: result.secure_url
        };
        if(name)  product.name = name;
        if(price)  product.price = price;
        if(description)  product.description = description;
        if(farm_id)    product.farm_id = farm_id;
        if(process_id)     product.process_id = process_id
        if(trader_id)    product.trader_id = trader_id;
        if(processing_method)   product.processing_method = processing_method;
        product.images = imageUrl;
        await product.save();
        // Get image data URI
        // Get the secure URL of the uploaded image

        // Update product information
        

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            product,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while updating the product',
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product by ID
        const product = await models.Product.findByPk(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete the product
        await product.destroy();

        // Send success response
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while deleting the product',
            error: error.message
        });
    }
};

module.exports = { createNewProduct, updateProduct, deleteProduct };
