const fs = require("fs");
const express = require("express");
const fileUpload = require('express-fileupload')
const app = express();
const cors = require("cors");
app.use(cors());

const { Sequelize } = require("sequelize");
const { configViewEngine } = require("./src/configs/viewEngine");
const initWebRoute = require("./src/route/web");

const cloudinary = require('cloudinary');
// const sequelize = require("./src/configs/connectDB");
const customizeConfig = {
  host: "127.0.0.1",
  dialect: "mysql",
  dialectModule: require("mysql2"),
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    useUTC: false,
  },
  timezone: "+07:00",
};

cloudinary.config({
  cloud_name: "denvqae4v",
  api_key: "879654272522899",
  api_secret: "f4dDCroFWfRE3Nck05u7LgSQoFk"
})

const sequelize = new Sequelize(
  "podcast",
  "root",
  "root",
  customizeConfig
);

const morgan = require("morgan");

const path = require("path");



app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(fileUpload({limit: '100mb', extended: true}));
// app.use(cors());
app.use(morgan("combined"));

const staticFolderPath = path.join(__dirname, "public");

app.use("/static", express.static(staticFolderPath));

const port = 5000;

configViewEngine(app);
initWebRoute(app);

let co = true;

function connect() {
  sequelize
    .authenticate()
    .then(() => {
      if (co) {
        console.log("Success");
      }
      co = false;
    })
    .catch((err) => {
      if (!co) {
        console.log("Lỗi: ", err);
      }
      co = true;
    });
}

app.listen(port, () => {
  console.log(`VQC2712: OK ${port}`);
  connect();
  // setInterval(connect, 1000);

  // sequelize.authenticate()
  //     .then(() => {
  //       //   console.log("Ok!");
  //     })
  //     .catch(err => {
  //         console.log("Error: Lỗi --> ", err);
  //         process.exit(2);
  //     })
});
