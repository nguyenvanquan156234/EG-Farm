const models = require('../models');

const createFarm = async (req, res) => {
    try {
        const { name, address, city, country } = req.body;
        console.log(req.body);
        if (!name || !address || !city || !country) {
            return res.status(400).send({
                success: false,
                message: 'Làm ơn nhập đủ các trường dữ liệu'
            });
        }
        const farm = await models.Farm.create({
            name, address, city, country
        });
        res.status(200).send({
            success: true,
            message: 'Tạo trang trại thành công',
            farm
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi',
            error
        });
    }
};

const updateFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, city, country } = req.body;
        if (!name && !address && !city && !country) {
            return res.status(400).send({
                success: false,
                message: 'Không có dữ liệu cập nhật'
            });
        }
        const farm = await models.Farm.findByPk(id);
        if (!farm) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy trang trại'
            });
        }
        if (name) farm.name = name;
        if (address) farm.address = address;
        if (city) farm.city = city;
        if (country) farm.country = country;
        await farm.save();
        res.status(200).send({
            success: true,
            message: 'Cập nhật trang trại thành công',
            farm
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi',
            error
        });
    }
};

const deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const farm = await models.Farm.findByPk(id);
        if (!farm) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy trang trại'
            });
        }
        await farm.destroy();
        res.status(200).send({
            success: true,
            message: 'Xóa trang trại thành công',
            farm
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi',
            error
        });
    }
};

module.exports = {
    createFarm,
    updateFarm,
    deleteFarm
};
