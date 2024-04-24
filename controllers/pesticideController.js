const models = require('../models');

const createPesticide = async (req, res) => {
    try {
        const { pesticide_name, description } = req.body;
        if (!pesticide_name || !description) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin cho thuốc trừ sâu'
            });
        }
        const pesticide = await models.Pesticide.create({
            pesticide_name,
            description
        });
        res.status(200).send({
            success: true,
            message: 'Thuốc trừ sâu đã được tạo thành công',
            pesticide
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo thuốc trừ sâu',
            error
        });
    }
};

const updatePesticide = async (req, res) => {
    try {
        const { id } = req.params;
        const { pesticide_name, description } = req.body;
        const pesticide = await models.Pesticide.findByPk(id);
        if (!pesticide) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy thuốc trừ sâu'
            });
        }
        if (pesticide_name) pesticide.pesticide_name = pesticide_name;
        if (description) pesticide.description = description;
        await pesticide.save();
        res.status(200).send({
            success: true,
            message: 'Thông tin thuốc trừ sâu đã được cập nhật thành công',
            pesticide
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin thuốc trừ sâu',
            error
        });
    }
};

const deletePesticide = async (req, res) => {
    try {
        const { id } = req.params;
        const pesticide = await models.Pesticide.findByPk(id);
        if (!pesticide) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy thuốc trừ sâu'
            });
        }
        await pesticide.destroy();
        res.status(200).send({
            success: true,
            message: 'Thuốc trừ sâu đã được xóa thành công',
            pesticide
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa thuốc trừ sâu',
            error
        });
    }
};

module.exports = {
    createPesticide,
    updatePesticide,
    deletePesticide
};
