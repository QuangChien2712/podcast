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

let handleCreateNewSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.typeRole) {
        db.Schedule.create({
          email: data.email,
          timeSchedule: data.timeSchedule,
          topicSchedule: data.topicSchedule,
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

let handleGetAllSchedules = (scheduleId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let schedules = "";
      if (scheduleId === "All") {
        schedules = await db.Schedule.findAll();
      }
      if (scheduleId && scheduleId !== "All") {
        schedules = await db.Schedule.findOne({
          where: { id: scheduleId },
        });
      }
      reslove(schedules);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu dữ liệu!",
        });
      }

      let scheduledata = await db.Schedule.findOne({
        where: { id: data.id },
      });

      if (scheduledata) {
        await db.Schedule.upsert({
          id: data.id,
          email: data.email,
          timeSchedule: data.timeSchedule,
          topicSchedule: data.topicSchedule,
        });
        resolve({
          errCode: 0,
          errMessage: "Update the Schedule succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Schedule isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteSchedule = (scheduleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let scheduledata = await db.Schedule.findOne({
        where: { id: scheduleId },
      });
      if (!scheduledata) {
        resolve({
          errCode: 2,
          errMessage: `The schedule isn't exist`,
        });
      }
      // await scheduledata.destroy(); scheduledata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Schedule.destroy({ where: { id: scheduleId } });

      resolve({
        errCode: 0,
        errMessage: "Schedule has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewSchedule: handleCreateNewSchedule,
  handleGetAllSchedules: handleGetAllSchedules,
  handleEditSchedule: handleEditSchedule,
  handleDeleteSchedule: handleDeleteSchedule,
};
