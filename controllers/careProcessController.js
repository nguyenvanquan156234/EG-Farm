const models = require('../models');

const createCareProcess = async (req, res) => {
    try {
        const { farm_id, start_date, end_date, notes } = req.body;
        if (!farm_id || !start_date || !end_date) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng nhập đủ thông tin cho quá trình chăm sóc'
            });
        }

        // Kiểm tra farm_id tồn tại trong bảng farm
        const farmExists = await models.Farm.findByPk(farm_id);
        if (!farmExists) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy trang trại có farm_id đã cung cấp'
            });
        }

        const careProcess = await models.Care_process.create({
            farm_id,
            start_date,
            end_date,
            notes
        });
        res.status(200).send({
            success: true,
            message: 'Quá trình chăm sóc đã được tạo thành công',
            careProcess
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo quá trình chăm sóc',
            error
        });
    }
};

const updateCareProcess = async (req, res) => {
    try {
        const { id } = req.params;
        const { farm_id, start_date, end_date, notes } = req.body;
        const careProcess = await models.Care_process.findByPk(id);
        if (!careProcess) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy quá trình chăm sóc'
            });
        }

        // Kiểm tra farm_id tồn tại trong bảng farm nếu được cung cấp
        if (farm_id) {
            const farmExists = await models.Farm.findByPk(farm_id);
            if (!farmExists) {
                return res.status(404).send({
                    success: false,
                    message: 'Không tìm thấy trang trại có farm_id đã cung cấp'
                });
            }
            careProcess.farm_id = farm_id;
        }
        
        if (start_date) careProcess.start_date = start_date;
        if (end_date) careProcess.end_date = end_date;
        if (notes) careProcess.notes = notes;
        await careProcess.save();
        res.status(200).send({
            success: true,
            message: 'Quá trình chăm sóc đã được cập nhật thành công',
            careProcess
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật quá trình chăm sóc',
            error
        });
    }
};
const deleteCareProcess = async (req, res) => {
    try {
        const { id } = req.params;
        const careProcess = await models.Care_process.findByPk(id);
        if (!careProcess) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy quá trình chăm sóc'
            });
        }

        // Kiểm tra farm_id tồn tại trong bảng farm
        const farmExists = await models.Farm.findByPk(careProcess.farm_id);
        if (!farmExists) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy trang trại liên kết với quá trình chăm sóc này'
            });
        }

        await careProcess.destroy();
        res.status(200).send({
            success: true,
            message: 'Quá trình chăm sóc đã được xóa thành công',
            careProcess
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa quá trình chăm sóc',
            error
        });
    }
};

module.exports = {
    createCareProcess,
    updateCareProcess,
    deleteCareProcess
};
