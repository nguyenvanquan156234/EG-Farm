const models = require('../models');

const createProduct = async (req, res) => {
    try {
        const { product_id, transporter_id } = req.body;

        // Kiểm tra xem product_id và transporter_id có tồn tại trong các bảng khác không
        const [productExists, transporterExists] = await Promise.all([
            models.Product.findByPk(product_id),
            models.Transporters.findByPk(transporter_id)
        ]);

        // Nếu product_id hoặc transporter_id không tồn tại, trả về thông báo lỗi
        if (!productExists || !transporterExists) {
            return res.status(404).send({
                success: false,
                message: 'Product ID or Transporter ID does not exist'
            });
        }

        // Thêm logic tạo sản phẩm ở đây
        const product = await models.Product_transporter.create({
            product_id,transporter_id
        })
        res.status(200).send({
            success: true,
            message: 'Product created successfully',
            product
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
        const { id } = req.params;
        const { transporter_id, product_id} = req.body;
        const product = await models.Product_transporter.findByPk(id);
        if(!product){
            return res.status(404).send({
                success: false,
                message: 'Product ID does not exist'
            });
        }

        // Kiểm tra xem product_id tồn tại trong bảng Product và transporter_id tồn tại trong bảng Transporter
        const [productExists, transporterExists] = await Promise.all([
            models.Product.findByPk(product_id),
            models.Transporters.findByPk(transporter_id)
        ]);

        // Nếu product_id hoặc transporter_id không tồn tại, trả về thông báo lỗi
        if (!productExists || !transporterExists) {
            return res.status(404).send({
                success: false,
                message: 'Product ID or Transporter ID does not exist'
            });
        }

        // Thêm logic cập nhật sản phẩm ở đây
        if(product_id) product.product_id = product_id;
        if(transporter_id) product.transporter_id = transporter_id;
        
        await product.save();
        res.status(200).send({ 
            success: true,
            message: 'Product updated successfully',
            product
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

        // Kiểm tra xem product_id tồn tại trong bảng Product
        const productExists = await models.Product_transporter.findByPk(id);

        // Nếu product_id không tồn tại, trả về thông báo lỗi
        if (!productExists) {
            return res.status(404).send({
                success: false,
                message: 'Product ID does not exist'
            });
        }

        
        // Thêm logic xóa sản phẩm ở đây
        await productExists.destroy();
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
            productExists
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

module.exports = { createProduct, updateProduct, deleteProduct };
