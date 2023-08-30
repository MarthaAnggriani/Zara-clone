'use strict';
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
const { log } = require("console");
const customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf-8"));
customers.forEach(e => {
  e.createdAt = e.updatedAt = new Date();
  e.password = hashPassword(e.password);
});


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers', customers, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
