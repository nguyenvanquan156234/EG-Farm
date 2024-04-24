const models = require('../models');

const createFertilizer = async (req, res) => {
    try {
        const { fertilizer_name, description } = req.body;
        if (!fertilizer_name || !description) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin cho phân bón'
            });
        }
        const fertilizer = await models.Fertilizer.create({
            fertilizer_name,
            description
        });
        res.status(200).send({
            success: true,
            message: 'Phân bón đã được tạo thành công',
            fertilizer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo phân bón',
            error
        });
    }
};

const updateFertilizer = async (req, res) => {
    try {
        const { id } = req.params;
        const { fertilizer_name, description } = req.body;
        const fertilizer = await models.Fertilizer.findByPk(id);
        if (!fertilizer) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy phân bón'
            });
        }
        if (fertilizer_name) fertilizer.fertilizer_name = fertilizer_name;
        if (description) fertilizer.description = description;
        await fertilizer.save();
        res.status(200).send({
            success: true,
            message: 'Phân bón đã được cập nhật thành công',
            fertilizer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật phân bón',
            error
        });
    }
};

const deleteFertilizer = async (req, res) => {
    try {
        const { id } = req.params;
        const fertilizer = await models.Fertilizer.findByPk(id);
        if (!fertilizer) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy phân bón'
            });
        }
        await fertilizer.destroy();
        res.status(200).send({
            success: true,
            message: 'Phân bón đã được xóa thành công',
            fertilizer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa phân bón',
            error
        });
    }
};

module.exports = {
    createFertilizer,
    updateFertilizer,
    deleteFertilizer
};
