const models = require('../models');

const createPesticideAvailability = async (req, res) => {
    try {
        const { seller_id, pesticide_id } = req.body;

        // Kiểm tra xem seller_id và pesticide_id không được null
        if (!seller_id || !pesticide_id) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng cung cấp đủ thông tin cho mối liên kết'
            });
        }

        // Kiểm tra xem seller_id có tồn tại trong bảng Seller không
        const seller = await models.Pesticide_seller.findByPk(seller_id);
        if (!seller) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy người bán thuốc trừ sâu có ID được cung cấp'
            });
        }

        // Kiểm tra xem pesticide_id có tồn tại trong bảng Pesticide không
        const pesticide = await models.Pesticide.findByPk(pesticide_id);
        if (!pesticide) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy thuốc trừ sâu có ID được cung cấp'
            });
        }

        const pesticideAvailability = await models.pesticide_availability.create({
            seller_id,
            pesticide_id
        });
        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được tạo thành công',
            pesticideAvailability
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo mối liên kết',
            error
        });
    }
};


const updatePesticideAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { seller_id, pesticide_id } = req.body;
        
        // Kiểm tra xem mối liên kết tồn tại
        const pesticideAvailability = await models.pesticide_availability.findByPk(id);
        if (!pesticideAvailability) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy mối liên kết'
            });
        }

        // Kiểm tra xem seller_id và pesticide_id không được null
        if (!seller_id || !pesticide_id) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng cung cấp đủ thông tin cho mối liên kết'
            });
        }

        // Kiểm tra xem seller_id có tồn tại trong bảng Seller không
        const seller = await models.Pesticide_seller.findByPk(seller_id);
        if (!seller) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy người bán thuốc trừ sâu có ID được cung cấp'
            });
        }

        // Kiểm tra xem pesticide_id có tồn tại trong bảng Pesticide không
        const pesticide = await models.Pesticide.findByPk(pesticide_id);
        if (!pesticide) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy thuốc trừ sâu có ID được cung cấp'
            });
        }

        // Cập nhật mối liên kết
        pesticideAvailability.seller_id = seller_id;
        pesticideAvailability.pesticide_id = pesticide_id;
        await pesticideAvailability.save();

        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được cập nhật thành công',
            pesticideAvailability
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật mối liên kết',
            error
        });
    }
};

const deletePesticideAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm mối liên kết để xóa
        const pesticideAvailability = await models.pesticide_availability.findByPk(id);
        if (!pesticideAvailability) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy mối liên kết'
            });
        }

        // Xóa mối liên kết
        await pesticideAvailability.destroy();

        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được xóa thành công',
            pesticideAvailability
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa mối liên kết',
            error
        });
    }
};

module.exports = {
    createPesticideAvailability,
    updatePesticideAvailability,
    deletePesticideAvailability
};
