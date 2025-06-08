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

let handleCreateNewReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        db.Review.create({
          idContent: data.idContent,
          email: data.email,
          like: data.like,
          comment: data.comment,
          share: data.share,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllReviews = (reviewId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let reviews = "";
      if (reviewId === "All") {
        reviews = await db.Review.findAll();
      }
      if (reviewId && reviewId !== "All") {
        reviews = await db.Review.findOne({
          where: { id: reviewId },
        });
      }
      reslove(reviews);
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetReview = (idContent) => {
  return new Promise(async (reslove, reject) => {
    try {
      let reviews = "";
     
        reviews = await db.Review.findAll({
          where: { idContent: idContent },
        });
     
      if(reviews && reviews.length > 0){
        reslove(reviews);
      }else{
        reslove([]);
      }
      
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu!",
        });
      }

      let reviewdata = await db.Review.findOne({
        where: { id: data.id },
      });

      if (reviewdata) {
        await db.Review.upsert({
          id: data.id,
          idContent: data.idContent,
          email: data.email,
          like: data.like,
          comment: data.comment,
          share: data.share,
        });
        resolve({
          errCode: 0,
          message: "Thành công!",
        });
      } else {
        resolve({
          errCode: 1,
          message: `Bình luận không tồn tại!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleDeleteReview = (idContent, email, like) => {
  return new Promise(async (resolve, reject) => {
    try {
      let reviewdata = "";
     
        reviewdata = await db.Review.findOne({
          where: { idContent: idContent, email: email, like: like},
        });
      
      if (!reviewdata) {
        resolve({
          errCode: 2,
          message: `Bình luận không tồn tại!`,
        });
      }
      // await reviewdata.destroy(); reviewdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.Review.destroy({ where: { id: reviewdata.id } });

      resolve({
        errCode: 0,
        message: "Đã xóa bình luận!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewReview: handleCreateNewReview,
  handleGetAllReviews: handleGetAllReviews,
  handleEditReview: handleEditReview,
  handleDeleteReview: handleDeleteReview,

  handleGetReview: handleGetReview
};
