const fs = require("fs");
const Sequelize = require("sequelize");

const db = {};
let sequelize;
sequelize = new Sequelize("podcast", "root", "root", {
  username: "root",
  password: "root",
  database: "podcast",
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases:0,
  timezone:"+07:00"
});
fs.readdirSync("D:/DU_AN_QUY/BACKEND/db/models").forEach((file) => {
  let b = file.toString();
  let model = "";

  if (b === "content.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/content.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "review.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/review.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "measure.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/measure.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "pay.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/pay.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "role.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/role.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "schedule.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/schedule.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "time_schedule.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/time_schedule.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "user.js") {
    model = require(`D:/DU_AN_QUY/BACKEND/db/models/user.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const { resolve } = require("path");

let handleCreateNewPay = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        db.Pay.create({
            email: data.email,
            amountPay: data.amountPay,
            contentPay: data.contentPay
        });
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Không có dữ liệu",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllPays = (payId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let pays = "";
      if (payId === "All") {
        pays = await db.Pay.findAll();
      }
      if (payId && payId !== "All") {
        pays = await db.Pay.findOne({
          where: { id: payId },
        });
      }
      reslove(pays);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditPay = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu dữ liệu!",
        });
      }

      let paydata = await db.Pay.findOne({
        where: { id: data.id },
      });

      if (paydata) {
        await db.Pay.upsert({
          id: data.id,
          email: data.email,
          amountPay: data.amountPay,
          contentPay: data.contentPay
        });
        resolve({
          errCode: 0,
          errMessage: "Update the Pay succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Pay isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeletePay = (payId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let paydata = await db.Pay.findOne({
        where: { id: payId },
      });
      if (!paydata) {
        resolve({
          errCode: 2,
          errMessage: `The pay isn't exist`,
        });
      }
      // await paydata.destroy(); paydata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Pay.destroy({ where: { id: payId } });

      resolve({
        errCode: 0,
        errMessage: "Pay has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewPay: handleCreateNewPay,
  handleGetAllPays: handleGetAllPays,
  handleEditPay: handleEditPay,
  handleDeletePay: handleDeletePay,
};
