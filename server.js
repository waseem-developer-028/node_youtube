require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const routes = require("./routes/index");

app.use(express.json());
connectDB();

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
