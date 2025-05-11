const fs = require("fs");
const Sequelize = require("sequelize");

const db = {};
let sequelize;
sequelize = new Sequelize("podcast", "chien", "Chien@123", {
  username: "chien",
  password: "Chien@123",
  database: "podcast",
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases:0,
  timezone:"+07:00"
});
fs.readdirSync("/home/chien/BACKEND-PODCAST/db/models").forEach((file) => {
  let b = file.toString();
  let model = "";

  if (b === "content.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/content.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "review.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/review.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "measure.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/measure.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "pay.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/pay.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "role.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/role.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "schedule.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/schedule.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "time_schedule.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/time_schedule.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "user.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/user.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "discussioncontent.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/discussioncontent.js`)(
      sequelize,
      Sequelize.DataTypes
    );
  }
  if (b === "discussiontime.js") {
    model = require(`/home/chien/BACKEND-PODCAST/db/models/discussiontime.js`)(
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
      if (data && (data.email || data.phone)) {
        
        db.Schedule.create({
          email: data.email,
          phone: data.phone,
          selectedContent: data.selectedContent,
          otherContent: data.otherContent,
          selectedTimes: data.selectedTimes,
          otherTime: data.otherTime,
          selectedDate: data.selectedDate,
          trangThai: data.trangThai,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      } else {
        resolve({
          errCode: 0,
          message: "Không có dữ liệu",
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
          message: "Thiếu dữ liệu!",
        });
      }

      let scheduledata = await db.Schedule.findOne({
        where: { id: data.id },
      });

      if (scheduledata) {
        await db.Schedule.upsert({
          id: data.id,
          email: data.email,
          phone: data.phone,
          selectedContent: data.selectedContent,
          otherContent: data.otherContent,
          selectedTimes: data.selectedTimes,
          otherTime: data.otherTime,
          selectedDate: data.selectedDate,
          trangThai: data.trangThai,
        });
        resolve({
          errCode: 0,
          message: "Update the Schedule succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `Schedule isn't found!`,
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
          message: `The schedule isn't exist`,
        });
      }
      // await scheduledata.destroy(); scheduledata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Schedule.destroy({ where: { id: scheduleId } });

      resolve({
        errCode: 0,
        message: "Schedule has been deleted successfully!",
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
