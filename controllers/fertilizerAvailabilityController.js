const models = require('../models');

const createFertilizerAvailability = async (req, res) => {
    try {
        const { fertilizer_id, seller_id } = req.body;

        // Kiểm tra xem fertilizer_id có tồn tại trong bảng Fertilizer không
        const fertilizer = await models.Fertilizer.findByPk(fertilizer_id);
        if (!fertilizer) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy phân bón có ID được cung cấp'
            });
        }

        // Kiểm tra xem seller_id có tồn tại trong bảng Seller không
        const seller = await models.Fertilizer_seller.findByPk(seller_id);
        if (!seller) {
            return res.status(400).send({
                success: false,
                message: 'Không tìm thấy người bán có ID được cung cấp'
            });
        }

        const fertilizerAvailability = await models.Fertilizer_availability.create({
            fertilizer_id,
            seller_id
        });
        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được tạo thành công',
            fertilizerAvailability
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

const updateFertilizerAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { fertilizer_id, seller_id } = req.body;
        const fertilizerAvailability = await models.Fertilizer_availability.findByPk(id);
        if (!fertilizerAvailability) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy mối liên kết nào'
            });
        }

        // Kiểm tra xem fertilizer_id có tồn tại trong bảng Fertilizer không
        if (fertilizer_id) {
            const fertilizer = await models.Fertilizer.findByPk(fertilizer_id);
            if (!fertilizer) {
                return res.status(400).send({
                    success: false,
                    message: 'Không tìm thấy phân bón có ID được cung cấp'
                });
            }
        }

        // Kiểm tra xem seller_id có tồn tại trong bảng Seller không
        if (seller_id) {
            const seller = await models.Fertilizer_seller.findByPk(seller_id);
            if (!seller) {
                return res.status(400).send({
                    success: false,
                    message: 'Không tìm thấy người bán có ID được cung cấp'
                });
            }
        }

        if (fertilizer_id) fertilizerAvailability.fertilizer_id = fertilizer_id;
        if (seller_id) fertilizerAvailability.seller_id = seller_id;
        await fertilizerAvailability.save();
        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được cập nhật thành công',
            fertilizerAvailability
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

const deleteFertilizerAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const fertilizerAvailability = await models.Fertilizer_availability.findByPk(id);
        if (!fertilizerAvailability) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy mối liên kết'
            });
        }
        await fertilizerAvailability.destroy();
        res.status(200).send({
            success: true,
            message: 'Mối liên kết đã được xóa thành công',
            fertilizerAvailability
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
    createFertilizerAvailability,
    updateFertilizerAvailability,
    deleteFertilizerAvailability
};
