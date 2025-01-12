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

let handleCreateNewTime_schedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.typeRole) {
        db.Time_schedule.create({
          typeRole: data.typeRole,
          tenBaiViet: data.tenBaiViet,
          chuDe: data.chuDe,
          moTaNgan: data.moTaNgan,
          noiDung: data.noiDung,
          hinhAnh: data.hinhAnh,
          audio: data.audio,
          thuTuHienThi: data.thuTuHienThi,
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

let handleGetAllTime_schedules = (time_scheduleId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let time_schedules = "";
      if (time_scheduleId === "All") {
        time_schedules = await db.Time_schedule.findAll();
      }
      if (time_scheduleId && time_scheduleId !== "All") {
        time_schedules = await db.Time_schedule.findOne({
          where: { id: time_scheduleId },
        });
      }
      reslove(time_schedules);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditTime_schedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu dữ liệu!",
        });
      }

      let time_scheduledata = await db.Time_schedule.findOne({
        where: { id: data.id },
      });

      if (time_scheduledata) {
        await db.Time_schedule.upsert({
          id: data.id,
          typeRole: data.typeRole,
          tenBaiViet: data.tenBaiViet,
          chuDe: data.chuDe,
          moTaNgan: data.moTaNgan,
          noiDung: data.noiDung,
          hinhAnh: data.hinhAnh,
          audio: data.audio,
          thuTuHienThi: data.thuTuHienThi,
        });
        resolve({
          errCode: 0,
          errMessage: "Update the Time_schedule succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Time_schedule isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteTime_schedule = (time_scheduleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let time_scheduledata = await db.Time_schedule.findOne({
        where: { id: time_scheduleId },
      });
      if (!time_scheduledata) {
        resolve({
          errCode: 2,
          errMessage: `The time_schedule isn't exist`,
        });
      }
      // await time_scheduledata.destroy(); time_scheduledata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Time_schedule.destroy({ where: { id: time_scheduleId } });

      resolve({
        errCode: 0,
        errMessage: "Time_schedule has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewTime_schedule: handleCreateNewTime_schedule,
  handleGetAllTime_schedules: handleGetAllTime_schedules,
  handleEditTime_schedule: handleEditTime_schedule,
  handleDeleteTime_schedule: handleDeleteTime_schedule,
};
