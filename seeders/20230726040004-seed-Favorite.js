'use strict';
const fs = require("fs");

const favorites = JSON.parse(fs.readFileSync("./data/favorites.json", "utf-8"));
favorites.forEach(e => {
  e.createdAt = e.updatedAt = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Favorites', favorites, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
