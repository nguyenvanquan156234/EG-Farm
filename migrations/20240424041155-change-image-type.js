'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING), // Định nghĩa kiểu dữ liệu là một mảng các chuỗi (URL của hình ảnh)
      allowNull: true, // Cho phép giá trị của trường images có thể là null
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'images');
  }
};
