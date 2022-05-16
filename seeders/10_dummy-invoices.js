"use strict";

let faker = require("@faker-js/faker").faker;

module.exports = {
  async up(queryInterface, Sequelize) {
    let headers = [];
    let details = [];
    let confirmations = [];

    // generate invoice header rows
    for (let i = 0; i < 2000; i++) {
      let date = faker.date.between("2022-01-01", "2022-05-24"); // random invoice date
      let headerId = i + 1;
      let nOfDetails = faker.datatype.number({ min: 1, max: 5 });
      let totalPrice = 0;

      // add random number of details for each header
      for (let j = 0; j < nOfDetails; j++) {
        let price = faker.datatype.number({
          min: 10000,
          max: 100000,
          precision: 1000,
        });

        details.push({
          qty: faker.datatype.number({ min: 1, max: 10 }),
          price: price,
          createdAt: date,
          productId: faker.datatype.number({ min: 1, max: 12 }),
          updatedAt: date,
          invoiceHeaderId: headerId,
        });

        totalPrice = totalPrice + price;
      }

      confirmations.push({
        id: headerId,
        image: `public/invoices/invoice${faker.datatype.number({
          min: 1,
          max: 10,
        })}.jpg`,
        invoiceHeaderId: headerId,
        createdAt: date,
        updatedAt: date,
        is_confirmed: faker.datatype.boolean(), // randomly set is_confirmed true or false
      });

      headers.push({
        id: headerId,
        invoice_code: "100" + (i + 1),
        shipping_price: faker.datatype.number({ min: 10000, max: 20000 }),
        total_price: totalPrice,
        createdAt: date,
        updatedAt: date,
        userId: faker.datatype.number({ min: 1, max: 20 }),
        adminId: faker.datatype.number({ min: 1, max: 4 }),
      });
    }

    await queryInterface.bulkInsert("invoice_headers", headers);
    await queryInterface.bulkInsert("invoice_details", details);
    await queryInterface.bulkInsert("payment_confirmations", confirmations);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("payment_confirmations", null, {});
    await queryInterface.bulkDelete("invoice_details", null, {});
    await queryInterface.bulkDelete("invoice_headers", null, {});
  },
};
