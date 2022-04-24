// it is for adding dummy data in admin generated by sequalize-cli

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "admins",
      [
        {
          id: 1,
          username: "nurulmay",
          email: "nurulmayapriyani@gmail.com",
          password: "60ddda3ce8073466cf536d772011ed7d4896f27b",
          createdAt: "2022-04-12 15:19:44",
          updatedAt: "2022-04-12 15:19:44",
        },
        {
          id: 2,
          username: "daffamrizqy",
          email: "daffamrizqy@gmail.com",
          password: "9d57a433b256e4d56e50c8bb36f8b685f37fa13a",
          createdAt: "2022-04-12 15:20:36",
          updatedAt: "2022-04-12 15:20:36",
        },
        {
          id: 3,
          username: "andrewmarco",
          email: "andrewmarco97@gmail.com",
          password: "65d0321638ab005aed256a83faa075d9613c296e",
          createdAt: "2022-04-12 15:21:15",
          updatedAt: "2022-04-12 15:21:15",
        },
        {
          id: 4,
          username: "jeykurniawan",
          email: "jeykurniawan@gmail.com",
          password: "30d2ad252fcc49b0b9d560563498395b03adfdf1",
          createdAt: "2022-04-12 16:30:06",
          updatedAt: "2022-04-12 16:31:10",
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("admins", null, {});
  },
};
