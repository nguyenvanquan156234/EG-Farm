const models = require('../models');

const createTransporter = async (req, res) => {
    try {
        const { name, contact } = req.body;
        if (!name || !contact) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin tên và liên hệ của người vận chuyển'
            });
        }
        const transporter = await models.Transporters.create({
            name,
            contact
        });
        res.status(200).send({
            success: true,
            message: 'Người vận chuyển đã được tạo thành công',
            transporter
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo người vận chuyển',
            error
        });
    }
};

const updateTransporter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact } = req.body;
        const transporter = await models.Transporters.findByPk(id);
        if (!transporter) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người vận chuyển'
            });
        }
        if (name) transporter.name = name;
        if (contact) transporter.contact = contact;
        await transporter.save();
        res.status(200).send({
            success: true,
            message: 'Người vận chuyển đã được cập nhật thành công',
            transporter
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật người vận chuyển',
            error
        });
    }
};

const deleteTransporter = async (req, res) => {
    try {
        const { id } = req.params;
        const transporter = await models.Transporters.findByPk(id);
        if (!transporter) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy người vận chuyển'
            });
        }
        await transporter.destroy();
        res.status(200).send({
            success: true,
            message: 'Người vận chuyển đã được xóa thành công',
            transporter
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa người vận chuyển',
            error
        });
    }
};

module.exports = {
    createTransporter,
    updateTransporter,
    deleteTransporter
};
