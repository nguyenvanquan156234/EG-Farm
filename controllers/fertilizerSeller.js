const models = require('../models');

const createFertilizerSeller = async (req, res) => {
    try {
        const { name, location } = req.body;
        if (!name || !location) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin cho người bán phân bón'
            });
        }
        const fertilizerSeller = await models.Fertilizer_seller.create({
            name,
            location
        });
        res.status(200).send({
            success: true,
            message: 'Người bán phân bón đã được tạo thành công',
            fertilizerSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo người bán phân bón',
            error
        });
    }
};

const updateFertilizerSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const fertilizerSeller = await models.Fertilizer_seller.findByPk(id);
        if (!fertilizerSeller) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người bán phân bón'
            });
        }
        if (name) fertilizerSeller.name = name;
        if (location) fertilizerSeller.location = location;
        await fertilizerSeller.save();
        res.status(200).send({
            success: true,
            message: 'Người bán phân bón đã được cập nhật thành công',
            fertilizerSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật người bán phân bón',
            error
        });
    }
};

const deleteFertilizerSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const fertilizerSeller = await models.Fertilizer_seller.findByPk(id);
        if (!fertilizerSeller) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người bán phân bón'
            });
        }
        await fertilizerSeller.destroy();
        res.status(200).send({
            success: true,
            message: 'Người bán phân bón đã được xóa thành công',
            fertilizerSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa người bán phân bón',
            error
        });
    }
};

module.exports = {
    createFertilizerSeller,
    updateFertilizerSeller,
    deleteFertilizerSeller
};
