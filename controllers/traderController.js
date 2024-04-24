const models = require('../models');

const createTrader = async (req, res) => {
    try {
        const { trader_name, location, trader_concact } = req.body;
        if (!trader_name || !location || !trader_concact) {
            return res.status(400).send({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin của Trader'
            });
        }
        const trader = await models.Traders.create({
            trader_name,
            location,
            trader_concact
        });
        res.status(200).send({
            success: true,
            message: 'Trader đã được tạo thành công',
            trader
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo Trader',
            error
        });
    }
};

const updateTrader = async (req, res) => {
    try {
        const { id } = req.params;
        const { trader_name, location, trader_concact } = req.body;
        const trader = await models.Traders.findByPk(id);
        if (!trader) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy Trader'
            });
        }
        if (trader_name) trader.trader_name = trader_name;
        if (location) trader.location = location;
        if (trader_concact) trader.trader_concact = trader_concact;
        await trader.save();
        res.status(200).send({
            success: true,
            message: 'Trader đã được cập nhật thành công',
            trader
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật Trader',
            error
        });
    }
};

const deleteTrader = async (req, res) => {
    try {
        const { id } = req.params;
        const trader = await models.Traders.findByPk(id);
        if (!trader) {
            return res.status(404).send({
                success: false,
                message: 'Không tìm thấy Trader'
            });
        }
        await trader.destroy();
        res.status(200).send({
            success: true,
            message: 'Trader đã được xóa thành công',
            trader
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa Trader',
            error
        });
    }
};

module.exports = {
    createTrader,
    updateTrader,
    deleteTrader
};
