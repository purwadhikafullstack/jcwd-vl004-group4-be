// it is for adding dummy data in products generated by sequalize-cli

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          name: "acamprosate",
          stock: 100,
          unit: "mg",
          volume: 333,
          bottle_capacity: 500,
          buy_price: 300000,
          sell_price: 350000,
          description:
            "Acamprosate is thought to stabilize chemical signaling in the brain that would otherwise be disrupted by alcohol withdrawal.",
          image: "public\\productImages\\acamprosate.jpg",
          createdAt: "2022-04-06 22:24:32",
          updatedAt: "2022-04-06 22:24:32",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 2,
          name: "abemaciclib",
          stock: 95,
          unit: "mg",
          volume: 150,
          bottle_capacity: 450,
          buy_price: 200000,
          sell_price: 500000,
          description:
            "Abemaciclib is a drug for the treatment of advanced or metastatic breast cancers.",
          image: "public\\productImages\\abemaciclib.png",
          createdAt: "2022-04-17 21:06:23",
          updatedAt: "2022-04-17 21:06:23",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 3,
          name: "acarbose",
          stock: 120,
          unit: "mg",
          volume: 50,
          bottle_capacity: 500,
          buy_price: 350000,
          sell_price: 500000,
          description:
            "Acarbose slows the digestion of carbohydrates in the body, which helps control blood sugar levels.",
          image: "public\\productImages\\acarbose.jpg",
          createdAt: "2022-04-13 23:20:53",
          updatedAt: "2022-04-13 23:20:53",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 4,
          name: "acemetacin",
          stock: 130,
          unit: "mg",
          volume: 60,
          bottle_capacity: 300,
          buy_price: 200000,
          sell_price: 250000,
          description:
            "Acemetacin is a non-steroidal anti-inflammatory drug used for the treatment of osteoarthritis, rheumatoid arthritis, lower back pain, and relieving post-operative pain.",
          image: "public\\productImages\\acemetacin.jpg",
          createdAt: "2022-04-13 23:22:25",
          updatedAt: "2022-04-13 23:22:25",
          deletedAt: null,
          categoryId: 2,
        },
        {
          id: 5,
          name: "acenocoumarol",
          stock: 140,
          unit: "mg",
          volume: 1,
          bottle_capacity: 400,
          buy_price: 400000,
          sell_price: 430000,
          description:
            "Acenocoumarol is an anticoagulant that functions as a vitamin K antagonist.",
          image: "public\\productImages\\acenocoumarol.jpg",
          createdAt: "2022-04-13 23:24:13",
          updatedAt: "2022-04-13 23:24:13",
          deletedAt: null,
          categoryId: 2,
        },
        {
          id: 6,
          name: "acetazolamide",
          stock: 100,
          unit: "mg",
          volume: 250,
          bottle_capacity: 1000,
          buy_price: 350000,
          sell_price: 400000,
          description:
            "Acetazolamide is used in people with certain types of glaucoma to reduce the amount of fluid in the eye, which decreases pressure inside the eye.",
          image: "public\\productImages\\acetazolamide.jpg",
          createdAt: "2022-04-13 23:25:52",
          updatedAt: "2022-04-13 23:25:52",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 7,
          name: "acetylcysteine",
          stock: 111,
          unit: "mg",
          volume: 200,
          bottle_capacity: 500,
          buy_price: 400000,
          sell_price: 500000,
          description:
            "Acetylcysteine is used for certain lung conditions when increased amounts of mucus make breathing difficult",
          image: "public\\productImages\\acetylcysteine.webp",
          createdAt: "2022-04-13 23:25:52",
          updatedAt: "2022-04-13 23:25:52",
          deletedAt: null,
          categoryId: 2,
        },
        {
          id: 8,
          name: "aciclovir",
          stock: 120,
          unit: "mg",
          volume: 800,
          bottle_capacity: 300,
          buy_price: 200000,
          sell_price: 300000,
          description:
            "Aciclovir, also known as acyclovir, is an antiviral medication. It is primarily used for the treatment of herpes simplex virus infections, chickenpox, and shingles.",
          image: "public\\productImages\\aciclovir.jpg",
          createdAt: "2022-04-13 23:25:52",
          updatedAt: "2022-04-13 23:25:52",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 9,
          name: "acitretin",
          stock: 100,
          unit: "mg",
          volume: 25,
          bottle_capacity: 500,
          buy_price: 200000,
          sell_price: 350000,
          description:
            "Acitretin is an oral retinoid used in the treatment of severe resistant psoriasis.",
          image: "public\\productImages\\acitretin.jpg",
          createdAt: "2022-04-17 21:01:51",
          updatedAt: "2022-04-17 21:01:51",
          deletedAt: null,
          categoryId: 2,
        },
        {
          id: 10,
          name: "adalimumab",
          stock: 100,
          unit: "ml",
          volume: 0.8,
          bottle_capacity: 1000,
          buy_price: 200000,
          sell_price: 450000,
          description:
            "Adalimumab is a fully human, high-affinity, recombinant anti-tumor necrosis factor (TNF) alpha monoclonal antibody used to treat rheumatoid arthritis, ankylosing spondylitis, psoriasis, psoriatic arthritis, Crohn disease, ulcerative colitis, etc.",
          image: "public\\productImages\\adalimumab.jpg",
          createdAt: "2022-04-17 21:03:39",
          updatedAt: "2022-04-17 21:03:39",
          deletedAt: null,
          categoryId: 3,
        },
        {
          id: 11,
          name: "alfacalcidol",
          stock: 110,
          unit: "mg",
          volume: 50,
          bottle_capacity: 300,
          buy_price: 230000,
          sell_price: 550000,
          description:
            "Alfacalcidol is an analogue of vitamin D used for supplementation in humans and as a poultry feed additive.",
          image: "public\\productImages\\alfacalcidol.jpg",
          createdAt: "2022-04-17 21:04:44",
          updatedAt: "2022-04-17 21:04:44",
          deletedAt: null,
          categoryId: 1,
        },
        {
          id: 12,
          name: "allopurinol",
          stock: 100,
          unit: "mg",
          volume: 300,
          bottle_capacity: 500,
          buy_price: 400000,
          sell_price: 500000,
          description:
            "Allopurinol is a medication used to decrease high blood uric acid levels.",
          image: "public\\productImages\\allopurinol.jpg",
          createdAt: "2022-04-17 21:06:23",
          updatedAt: "2022-04-17 21:06:23",
          deletedAt: null,
          categoryId: 1,
        },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
