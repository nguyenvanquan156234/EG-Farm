'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa trường mong muốn từ bảng care_process
    await queryInterface.removeColumn('care_processes', 'product_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Nếu cần, bạn có thể thêm lại trường sau khi xóa (hoặc tạo một migration riêng để thêm trường)
  }
};
