const models = require('../models');

const createProductRetailers = async (req, res) => {
    try {
        const { retailer_id, product_id } = req.body;

        // Kiểm tra xem retailer_id và product_id có tồn tại trong bảng Retailers và Products không
        const [retailerExists, productExists] = await Promise.all([
            models.Retailers.findByPk(retailer_id),
            models.Product.findByPk(product_id)
        ]);

        // Nếu retailer_id hoặc product_id không tồn tại, trả về thông báo lỗi
        if (!retailerExists || !productExists) {
            return res.status(404).send({
                success: false,
                message: 'Retailer ID or Product ID does not exist'
            });
        }

        // Thêm logic tạo ProductRetailers ở đây
        const product = await models.Product_retailer.create({
            product_id, retailer_id,
        })
        res.status(200).send({
            success: true,
            message: 'ProductRetailers created successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while creating ProductRetailers',
            error: error.message
        });
    }
};

const updateProductRetailers = async (req, res) => {
    try {
        const { id } = req.params;
        const { retailer_id, product_id } = req.body;

        const product = await models.Product_retailer.findByPk(id)
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'ProductRetailers ID does not exist'
            });
        }
        // Kiểm tra xem retailer_id và product_id có tồn tại trong bảng Retailers và Products không
        const [retailerExists, productExists] = await Promise.all([
            models.Retailers.findByPk(retailer_id),
            models.Product.findByPk(product_id)
        ]);

        // Nếu retailer_id hoặc product_id không tồn tại, trả về thông báo lỗi
        if (!retailerExists || !productExists) {
            return res.status(404).send({
                success: false,
                message: 'Retailer ID or Product ID does not exist'
            });
        }

        // Thêm logic cập nhật ProductRetailers ở đây
        if(product_id) product.product_id=product_id
        if(retailer_id)  product.retailer_id=retailer_id
        await product.save();
        res.status(200).send({
            success: true,
            message: 'ProductRetailers updated successfully',
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while updating ProductRetailers',
            error: error.message
        });
    }
};

const deleteProductRetailers = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có tồn tại trong bảng ProductRetailers không
        const productRetailer = await models.Product_retailer.findByPk(id);

        // Nếu ID không tồn tại, trả về thông báo lỗi
        if (!productRetailer) {
            return res.status(404).send({
                success: false,
                message: 'ProductRetailers ID does not exist'
            });
        }

        // Thêm logic xóa ProductRetailers ở đây

        res.status(200).send({
            success: true,
            message: 'ProductRetailers deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'An error occurred while deleting ProductRetailers',
            error: error.message
        });
    }
};

module.exports = {
    createProductRetailers,
    updateProductRetailers,
    deleteProductRetailers
};
