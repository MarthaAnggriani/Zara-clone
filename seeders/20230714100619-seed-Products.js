'use strict';
const fs = require("fs");
let productsData = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
productsData.map(e => {
  e.createdAt = new Date()
  e.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', productsData, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
  }
};