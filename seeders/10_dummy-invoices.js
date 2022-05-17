"use strict";

let faker = require("@faker-js/faker").faker;

module.exports = {
  async up(queryInterface, Sequelize) {
    let headers = [];
    let details = [];
    let confirmations = [];

    // generate invoice header rows
    for (let i = 0; i < 2000; i++) {
      let date = faker.date.between("2022-01-01", faker.date.recent(1)); // random invoice date
      let headerId = i + 1;
      let nOfDetails = faker.datatype.number({ min: 1, max: 5 }); // random amount of product name in order
      let totalPrice = 0;

      // add random number of details for each header
      for (let j = 0; j < nOfDetails; j++) {
        let price = faker.datatype.number({
          min: 250000,
          max: 1000000,
          precision: 1000, // if precision is 1000 then last 3 digits of the random price will be zero
        });

        details.push({
          qty: faker.datatype.number({ min: 1, max: 10 }), // qty of order
          price: price,
          createdAt: date,
          productId: faker.datatype.number({ min: 1, max: 50 }), // productId
          updatedAt: date,
          invoiceHeaderId: headerId,
        });

        totalPrice = totalPrice + price;
      }

      let is_confirmed = faker.datatype.boolean();
      let adminId = faker.datatype.number({ min: 1, max: 4 });

      confirmations.push({
        id: headerId,
        image: `public/invoices/invoice${faker.datatype.number({
          min: 1,
          max: 10,
        })}.jpg`,
        invoiceHeaderId: headerId,
        createdAt: date,
        updatedAt: date,
        is_confirmed: is_confirmed, // randomly set is_confirmed true or false
        adminId: is_confirmed ? adminId : null, // if confirmed then set adminId randomly 1 to 4
      });

      headers.push({
        id: headerId,
        invoice_code: "100" + (i + 1), // starting invoice code from 1000 then go in sequence
        shipping_price: faker.datatype.number({ min: 10000, max: 20000 }),
        total_price: totalPrice,
        createdAt: date,
        updatedAt: date,
        userId: faker.datatype.number({ min: 1, max: 20 }),
        adminId: is_confirmed ? adminId : null,
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
