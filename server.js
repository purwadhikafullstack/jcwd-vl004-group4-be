const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// create instance
const app = express();

app.use(express.json());
app.use(cors());

app.use('/public', express.static('public'))

// routers
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const userRouter = require("./routers/userRouter");

// main routes
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to my api" });
});

app.listen(PORT, () => console.log(`server running: ${PORT}`));
