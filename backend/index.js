const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
const routes = require("./routes");
const { responseMessage } = require("./utils/responses");

app.use(cors());
app.use("/", routes);

mongoose
  .connect(process.env.mongodb, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => {
    return app.use((request, response) =>
    responseMessage(
        response,
        500,
        `Something went wrong! Please try again... ${err}`
      )
    );
  });

httpServer.listen(process.env.PORT, () =>
  console.log(`App is running at http://localhost:${process.env.PORT}\n`)
);
