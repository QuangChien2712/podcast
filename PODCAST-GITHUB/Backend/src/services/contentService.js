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

// let checkContent = (maNoidung) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let content = await db.Content.findOne({
//         where: { codeContent: maNoidung },
//       });
//       if (content) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let handleCreateNewContent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {      
      
        db.Content.create({
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
          message: "Ok",
          content: {
            typeRole: data.typeRole,
            tenBaiViet: data.tenBaiViet,
            chuDe: data.chuDe,
            moTaNgan: data.moTaNgan,
            noiDung: data.noiDung,
            hinhAnh: data.hinhAnh,
            audio: data.audio,
            thuTuHienThi: data.thuTuHienThi,
          },
        });
      
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllContents = (contentId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let contents = "";
      if (contentId === "All") {
        contents = await db.Content.findAll();
      }
      if (contentId && contentId !== "All") {
        contents = await db.Content.findOne({
          where: { id: contentId },
        });
      }
      if (contents && (contents.tenBaiViet || contents.length > 0)) {
        reslove(contents);
      } else {
        reslove({
          message: "Không có trong hệ thống",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllContentsPTSN = (typeRole, id) => {
  return new Promise(async (reslove, reject) => {
    try {
      let contents = "";

      if (typeRole) {
        contents = await db.Content.findAll({
          where: { typeRole: typeRole },
          attributes: {
            exclude: ["typeRole"],
          },
        });
        
        if (contents && contents.length > 0) {
          let thuTuConTents = [];
          let contentsSort = [];
          for (let index = 0; index < contents.length; index++) {
            const element = contents[index];
            thuTuConTents.push(parseFloat(element.thuTuHienThi));
          }         
          thuTuConTents.sort((a,b)=>{return b-a;});
          
          for (let i = 0; i < thuTuConTents.length; i++) {
            const elementi = thuTuConTents[i];
            for (let m = 0; m < contents.length; m++) {
              const elementm = parseFloat(contents[m].thuTuHienThi);
              if(elementm === elementi){
                contentsSort.push(contents[m]);                
              }
            }                     
          }
          reslove(contentsSort);
        } else {
          reslove({
            message: "Không có trong hệ thống",
          });
        }
      }

      if (id) {
        contents = await db.Content.findAll({
          where: { id: id },
          attributes: {
            exclude: ["thuTuHienThi", "typeRole"],
          },
        });

        if (contents && contents.length > 0) {
          reslove(contents[0]);
        } else {
          reslove({
            message: "Không có trong hệ thống",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditContent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu!",
        });
      }

      let contentdata = await db.Content.findOne({
        where: { id: data.id },
      });

      if (contentdata) {
        await db.Content.upsert({
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
          message: "Đã cập nhật bài viết!",
          content: {
            id: data.id,
            typeRole: data.typeRole,
            tenBaiViet: data.tenBaiViet,
            chuDe: data.chuDe,
            moTaNgan: data.moTaNgan,
            noiDung: data.noiDung,
            hinhAnh: data.hinhAnh,
            audio: data.audio,
            thuTuHienThi: data.thuTuHienThi,
          },
        });
      } else {
        resolve({
          errCode: 1,
          message: `Nội dung không tồn tại!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteContent = (contentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contentdata = await db.Content.findOne({
        where: { id: contentId },
      });
      if (!contentdata) {
        resolve({
          errCode: 2,
          message: `Nội dung không tồn tại!`,
        });
      }
      // await contentdata.destroy(); contentdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Content.destroy({ where: { id: contentId } });

      resolve({
        errCode: 0,
        message: "Bài viết đã được xóa!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewContent: handleCreateNewContent,
  handleGetAllContents: handleGetAllContents,
  handleEditContent: handleEditContent,
  handleDeleteContent: handleDeleteContent,
  handleGetAllContentsPTSN: handleGetAllContentsPTSN,
};
