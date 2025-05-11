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

let handleCreateNewDiscussiontime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        db.Discussiontime.create({
          thoiGianThaoLuan: data.thoiGianThaoLuan,
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

let handleGetAllDiscussiontimes = (discussiontimeId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let discussiontimes = "";
      if (discussiontimeId === "All") {
        discussiontimes = await db.Discussiontime.findAll();
      }
      if (discussiontimeId && discussiontimeId !== "All") {
        discussiontimes = await db.Discussiontime.findOne({
          where: { id: discussiontimeId },
        });
      }
      reslove(discussiontimes);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditDiscussiontime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu!",
        });
      }

      let discussiontimedata = await db.Discussiontime.findOne({
        where: { id: data.id },
      });

      if (discussiontimedata) {
        await db.Discussiontime.upsert({
          id: data.id,
          thoiGianThaoLuan: data.thoiGianThaoLuan,
          trangThai: data.trangThai,
        });
        resolve({
          errCode: 0,
          message: "Update the Discussiontime succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `Discussiontime isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteDiscussiontime = (discussiontimeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let discussiontimedata = await db.Discussiontime.findOne({
        where: { id: discussiontimeId },
      });
      if (!discussiontimedata) {
        resolve({
          errCode: 2,
          message: `The discussiontime isn't exist`,
        });
      }
      // await discussiontimedata.destroy(); discussiontimedata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Discussiontime.destroy({ where: { id: discussiontimeId } });

      resolve({
        errCode: 0,
        message: "Discussiontime has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewDiscussiontime: handleCreateNewDiscussiontime,
  handleGetAllDiscussiontimes: handleGetAllDiscussiontimes,
  handleEditDiscussiontime: handleEditDiscussiontime,
  handleDeleteDiscussiontime: handleDeleteDiscussiontime,
};
