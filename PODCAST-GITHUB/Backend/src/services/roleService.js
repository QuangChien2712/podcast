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

let handleCreateNewRole = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.typeRole) {
        db.Role.create({
          nameRole: data.nameRole,
          typeRole: data.typeRole
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

let handleGetAllRoles = (roleId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let roles = "";
      if (roleId === "All") {
        roles = await db.Role.findAll();
      }
      if (roleId && roleId !== "All") {
        roles = await db.Role.findOne({
          where: { id: roleId },
        });
      }
      reslove(roles);
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditRole = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu dữ liệu!",
        });
      }

      let roledata = await db.Role.findOne({
        where: { id: data.id },
      });

      if (roledata) {
        await db.Role.upsert({
          id: data.id,
          nameRole: data.nameRole,
          typeRole: data.typeRole
        });
        resolve({
          errCode: 0,
          errMessage: "Update the Role succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Role isn't found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteRole = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let roledata = await db.Role.findOne({
        where: { id: roleId },
      });
      if (!roledata) {
        resolve({
          errCode: 2,
          errMessage: `The role isn't exist`,
        });
      }
      // await roledata.destroy(); roledata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Role.destroy({ where: { id: roleId } });

      resolve({
        errCode: 0,
        errMessage: "Role has been deleted successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewRole: handleCreateNewRole,
  handleGetAllRoles: handleGetAllRoles,
  handleEditRole: handleEditRole,
  handleDeleteRole: handleDeleteRole,
};
