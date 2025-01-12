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

let handleCreateNewMeasure = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.email) {
        db.Measure.create({
          email: data.email,
          linkAudio: data.linkAudio,
          totalTimeAudio: data.totalTimeAudio,
          timeViewAudio: data.timeViewAudio,
          totalTimeViewAudio: data.totalTimeViewAudio,
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

let handleGetAllMeasures = (measureId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let measures = "";
      if (measureId === "All") {
        measures = await db.Measure.findAll();
      }
      if (measureId && measureId !== "All") {
        measures = await db.Measure.findOne({
          where: { id: measureId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.User,
              as: "userMeasure",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      }
      reslove(measures);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditMeasure = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu dữ liệu!",
        });
      }

      let measuredata = await db.Measure.findOne({
        where: { id: data.id },
      });

      if (measuredata) {
        await db.Measure.upsert({
          id: data.id,
          email: data.email,
          linkAudio: data.linkAudio,
          totalTimeAudio: data.totalTimeAudio,
          timeViewAudio: data.timeViewAudio,
          totalTimeViewAudio: data.totalTimeViewAudio,
        });
        resolve({
          errCode: 0,
          errMessage: "Update the Measure succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Measure isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteMeasure = (measureId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let measuredata = await db.Measure.findOne({
        where: { id: measureId },
      });
      if (!measuredata) {
        resolve({
          errCode: 2,
          errMessage: `The measure isn't exist`,
        });
      }
      // await measuredata.destroy(); measuredata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Measure.destroy({ where: { id: measureId } });

      resolve({
        errCode: 0,
        errMessage: "Measure has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewMeasure: handleCreateNewMeasure,
  handleGetAllMeasures: handleGetAllMeasures,
  handleEditMeasure: handleEditMeasure,
  handleDeleteMeasure: handleDeleteMeasure,
};
