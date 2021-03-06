// it is for adding dummy data in category generated by sequalize-cli

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: 1,
          name: "tablet",
          createdAt: "2022-04-06 22:24:32",
          updatedAt: "2022-04-06 22:24:32",
        },
        {
          id: 2,
          name: "capsule",
          createdAt: "2022-04-06 22:24:32",
          updatedAt: "2022-04-06 22:24:32",
        },
        {
          id: 3,
          name: "liquid",
          createdAt: "2022-04-06 22:24:32",
          updatedAt: "2022-04-06 22:24:32",
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
