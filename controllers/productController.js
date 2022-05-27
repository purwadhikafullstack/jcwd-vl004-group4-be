const db = require("../models");
const multer = require("multer");
const { Op } = require("sequelize");
// path : access and intereact with the file system
const path = require("path");

// create main Model
const Product = db.products;
const Category = db.categories;

// main works
// 1. create product
const addProduct = async (req, res) => {
  // receiving data from client that will be inserted into products table
  let info = {
    name: req.body.name,
    stock: req.body.stock,
    unit: req.body.unit,
    volume: req.body.volume,
    buy_price: req.body.buy_price,
    sell_price: req.body.sell_price,
    description: req.body.description,
    image: req.file.path,
    bottle_capacity: req.body.bottle_capacity,
    categoryId: req.body.categoryId,
  };

  // Model.create() : insert queries

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// 2. get all products
const getAllProducts = async (req, res) => {
  try {
    let filters = {};

    if (req.query.bottle_capacity) {
      let arrayOfBottleCap = req.query.bottle_capacity.split(",");
      console.log(arrayOfBottleCap);
      // Op.in means "WHERE IN" in sql. It will match if the bottle_capacity matches any value in the array.
      filters.bottle_capacity = { [Op.in]: arrayOfBottleCap };
      console.log(filters);
    }
    if (req.query.category) {
      let arrayOfCategory = req.query.category.split(",");
      filters["$Category.name$"] = {
        [Op.in]: arrayOfCategory,
      };
    }

    if (req.query.search)
      filters.name = {
        [Op.substring]: req.query.search,
      };

    // by default it will sort by name and asc
    let sort = ["name", "ASC"];
    if (req.query.sortField && req.query.sortDirection)
      sort = [req.query.sortField, req.query.sortDirection];

    // by default limit is 15
    let limit = 8;
    if (req.query.limit) limit = +req.query.limit;

    // by default offset is 0
    let offset = 0;
    if (req.query.offset) offset = +req.query.offset;

    const rowCount = await Product.count({ where: filters, include: Category });

    // Model.findAll() : read the whole products table
    let allProducts = await Product.findAll({
      include: Category,
      where: filters,
      order: [sort],
      limit: limit,
      offset: offset,
    });

    res.status(200).send({
      pageCount: Math.ceil(rowCount / limit),
      rowCount,
      allProducts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

// const getBestSeller = async (req, res) => {
//   const bestSeller = await sequelize.query(
//     `
//     SELECT productId, SUM(qty) AS totalQty
//     FROM invoice_details
//     GROUP BY productId
//     ORDER BY SUM(qty) DESC
//     LIMIT 8;`,
//     { type: QueryTypes.SELECT }
//   );
//   res.status(200).send(bestSeller);
// };

// 3. get single product
const getProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Product.findOne({ where: { id: id }, include: Category });
  res.status(200).send(product);
};

// 4. update product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  let product = await Product.update(req.body, { where: { id: id } });
  let updatedProduct = await Product.findOne({ where: { id: id } });
  res.status(200).send(updatedProduct);
};

// 5. delete product
const deleteProduct = async (req, res) => {
  const id = req.params.id;

  await Product.destroy({ where: { id: id } });
  const product = await Product.findAll({});
  res.status(200).send({
    message: `product with id: ${id} has been deleted`,
    data: product,
  });
};

// restore soft deleted product
const restoreProduct = async (req, res) => {
  const id = +req.params.id;
  await Product.restore({ where: { id: id } });
  const data = await Product.findAll({ where: { id: id } });
  res.status(200).send(data);
};

// 7. upload product image controller
const storage = multer.diskStorage({
  // folder to which the file has been saved
  destination: (req, file, cb) => {
    cb(null, "public/productImages");
  },
  // name of the file within destination
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Please Give a proper file format to upload!");
  },
}).single("image");

const DFAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.findAll({ include: Category });
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(400).send(`error: ${error}`);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  upload,
  // getBestSeller,
  DFAllProducts,
};
