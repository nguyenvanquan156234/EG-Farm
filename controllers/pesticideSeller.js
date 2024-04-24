const models = require('../models');

const createPesticideSeller = async (req, res) => {
    try {
        const { name, location } = req.body;
        if (!name || !location) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin cho người bán thuốc trừ sâu'
            });
        }
        const pesticideSeller = await models.Pesticide_seller.create({
            name,
            location
        });
        res.status(200).send({
            success: true,
            message: 'Người bán thuốc trừ sâu đã được tạo thành công',
            pesticideSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo người bán thuốc trừ sâu',
            error
        });
    }
};

const updatePesticideSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const pesticideSeller = await models.Pesticide_seller.findByPk(id);
        if (!pesticideSeller) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người bán thuốc trừ sâu'
            });
        }
        if (name) pesticideSeller.name = name;
        if (location) pesticideSeller.location = location;
        await pesticideSeller.save();
        res.status(200).send({
            success: true,
            message: 'Thông tin người bán thuốc trừ sâu đã được cập nhật thành công',
            pesticideSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin người bán thuốc trừ sâu',
            error
        });
    }
};

const deletePesticideSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const pesticideSeller = await models.Pesticide_seller.findByPk(id);
        if (!pesticideSeller) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người bán thuốc trừ sâu'
            });
        }
        await pesticideSeller.destroy();
        res.status(200).send({
            success: true,
            message: 'Người bán thuốc trừ sâu đã được xóa thành công',
            pesticideSeller
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa người bán thuốc trừ sâu',
            error
        });
    }
};

module.exports = {
    createPesticideSeller,
    updatePesticideSeller,
    deletePesticideSeller
};
