'use strict';
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
users.forEach(e => {
  e.createdAt = e.updatedAt = new Date();
  e.password = hashPassword(e.password);
});


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
