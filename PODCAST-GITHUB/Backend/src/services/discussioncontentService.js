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

let handleCreateNewDiscussioncontent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        db.Discussioncontent.create({
          noiDungThaoLuan: data.noiDungThaoLuan,
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

let handleGetAllDiscussioncontents = (discussioncontentId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let discussioncontents = "";
      if (discussioncontentId === "All") {
        discussioncontents = await db.Discussioncontent.findAll();
      }
      if (discussioncontentId && discussioncontentId !== "All") {
        discussioncontents = await db.Discussioncontent.findOne({
          where: { id: discussioncontentId },
        });
      }
      reslove(discussioncontents);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditDiscussioncontent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu!",
        });
      }

      let discussioncontentdata = await db.Discussioncontent.findOne({
        where: { id: data.id },
      });

      if (discussioncontentdata) {
        await db.Discussioncontent.upsert({
          id: data.id,
          noiDungThaoLuan: data.noiDungThaoLuan,
          trangThai: data.trangThai,
        });
        resolve({
          errCode: 0,
          message: "Update the Discussioncontent succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `Discussioncontent isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteDiscussioncontent = (discussioncontentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let discussioncontentdata = await db.Discussioncontent.findOne({
        where: { id: discussioncontentId },
      });
      if (!discussioncontentdata) {
        resolve({
          errCode: 2,
          message: `The discussioncontent isn't exist`,
        });
      }
      // await discussioncontentdata.destroy(); discussioncontentdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Discussioncontent.destroy({ where: { id: discussioncontentId } });

      resolve({
        errCode: 0,
        message: "Discussioncontent has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewDiscussioncontent: handleCreateNewDiscussioncontent,
  handleGetAllDiscussioncontents: handleGetAllDiscussioncontents,
  handleEditDiscussioncontent: handleEditDiscussioncontent,
  handleDeleteDiscussioncontent: handleDeleteDiscussioncontent,
};
