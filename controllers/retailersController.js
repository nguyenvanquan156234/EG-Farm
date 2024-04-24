const models = require('../models');

const createRetailer = async (req, res) => {
    try {
        const { name, contact } = req.body;
        if (!name || !contact) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin tên và liên hệ của nhà bán lẻ'
            });
        }
        const retailer = await models.Retailers.create({
            name,
            contact
        });
        res.status(200).send({
            success: true,
            message: 'Nhà bán lẻ đã được tạo thành công',
            retailer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo nhà bán lẻ',
            error
        });
    }
};

const updateRetailer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact } = req.body;
        const retailer = await models.Retailers.findByPk(id);
        if (!retailer) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy nhà bán lẻ'
            });
        }
        if (name) retailer.name = name;
        if (contact) retailer.contact = contact;
        await retailer.save();
        res.status(200).send({
            success: true,
            message: 'Nhà bán lẻ đã được cập nhật thành công',
            retailer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật nhà bán lẻ',
            error
        });
    }
};

const deleteRetailer = async (req, res) => {
    try {
        const { id } = req.params;
        const retailer = await models.Retailers.findByPk(id);
        if (!retailer) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy nhà bán lẻ'
            });
        }
        await retailer.destroy();
        res.status(200).send({
            success: true,
            message: 'Nhà bán lẻ đã được xóa thành công',
            retailer
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa nhà bán lẻ',
            error
        });
    }
};

module.exports = {
    createRetailer,
    updateRetailer,
    deleteRetailer
};
