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

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resolve } = require("path");

const salt = bcrypt.genSaltSync(10);

let refreshTokens = [];

let generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      typeRole: user.typeRole,
    },
    "voquangchien-be",
    { expiresIn: "2592000s" }
  );
};

let generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      typeRole: user.typeRole,
    },
    "nguyennhuquynh-be",
    { expiresIn: "2592000s" }
  );
};

let requestRefreshToken = async (req, res) => {
  //Take refresh token from user
  const refreshToken = req.body.refreshToken;
  //Send error if token is not valid
  if (!refreshToken)
    return res
      .status(401)
      .json({ errCode: 1, errMessage: "Chưa được xác thực!" });
  if (!refreshTokens.includes(refreshToken)) {
    return res
      .status(403)
      .json({ errCode: 2, errMessage: "RefreshToken không đúng!" });
  }

  jwt.verify(refreshToken, "nguyennhuquynh-be", (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    //create new access token, refresh token and send to user
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens = [...refreshTokens, newRefreshToken];
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

let hashUserPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

let handleUserLogin = (email, password, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "password",
            "name",
            "avatar",
            "typeRole",
            "phoneNumber",
            "isSchedule",
            "createdAt",
          ],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            if (user.typeRole === "Block") {
              userData.errCode = 2;
              userData.errMessage = `Tài khoản bị khóa!`;
            } else {
              const accessToken = generateAccessToken(user);
              const refreshToken = generateRefreshToken(user);
              refreshTokens = [...refreshTokens, refreshToken];
              //STORE REFRESH TOKEN IN COOKIE
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
              });

              userData.errCode = 0;
              userData.errMessage = "Ok";

              delete user.password;
              let user2 = { ...user, accessToken, refreshToken };
              userData.user = user2;
              userData.accessToken = accessToken;
            }
          } else {
            userData.errCode = 3;
            userData.errMessage = "Mật khẩu không đúng!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Không tìm thấy tài khoản!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Email không tồn tại trong hệ thống!`;
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let users = "";

      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });

        if (users) {
          reslove(users);
        }
      }

      if (userId && userId !== "All" && userId.includes("@gmail.com")) {
        let b = [{}];
        let userdata = await db.User.findOne({
          where: { email: userId },
          attributes: {
            exclude: ["password"],
          },
        });

        if (userdata) {
          b[0] = userdata;
          users = b;
          reslove({
            errCode: 0,
            message: "Ok",
            user: users[0],
          });
        } else {
          reslove({
            errCode: 0,
            message: "User không tồn tại",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = (userId) => {
  return new Promise(async (reslove, reject) => {
    try {
      let users = "";

      if (userId) {
        let b = [{}];
        let userdata = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });

        if (userdata) {
          b[0] = userdata;
          users = b;
          reslove({
            errCode: 0,
            message: "Ok",
            user: users[0],
          });
        } else {
          reslove({
            errCode: 0,
            message: "User không tồn tại",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email đã tồn tại trong hệ thống!",
        });
      } else {
        let hashpassword = hashUserPassword(data.password);
        db.User.create({
          email: data.email,
          password: hashpassword,
          name: data.name,
          avatar: data.avatar,
          typeRole: data.typeRole,
          phoneNumber: data.phoneNumber,
          isSchedule: data.isSchedule,
        });
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createNewAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email đã tồn tại trong hệ thống!",
        });
      } else {
        let hashpassword = hashUserPassword(data.password);
        db.User.create({
          email: data.email,
          password: hashpassword,
          name: data.name,
          avatar: data.avatar,
          typeRole: "K",
          phoneNumber: data.phoneNumber,
          isSchedule: "No",
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

let deleteUser = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = await db.User.findOne({
        where: { id: uid },
      });
      if (!userdata) {
        resolve({
          errCode: 2,
          errMessage: `Tài khoản không tồn tại!`,
        });
      }
      // await userdata.destroy(); userdata phải là instance của sequelize mới destroy được. Vì config query raw = true nên không còn là thể hiện nữa nên phải chọc trực tiếp từ db
      await db.User.destroy({ where: { id: uid } });

      resolve({
        errCode: 0,
        message: "Tài khoản được xóa thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

// let updateUserData = (user, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.id) {
//         resolve({
//           errCode: 2,
//           message: "Thiếu dữ liệu đầu vào!",
//         });
//       }

//       let userdata = await db.User.findOne({
//         where: { id: data.id },
//       });

//       if (userdata) {
//         if (user.typeRole === "O" || user.typeRole === "A") {
//           let hashpassword = hashUserPassword(data.password);
//           await db.User.upsert({
//             id: data.id,
//             email: data.email,
//             password: hashpassword,
//             name: data.name,
//             avatar: data.avatar,
//             typeRole: data.typeRole,
//             phoneNumber: data.phoneNumber,
//             isSchedule: data.isSchedule,
//           });
//           resolve({
//             errCode: 0,
//             message: "Cập nhật tài khoản thành công!",
//           });
//         } else {
//           let hashpassword = hashUserPassword(data.password);
//           await db.User.upsert({
//             id: data.id,
//             email: userdata.email,
//             password: hashpassword,
//             name: data.name,
//             avatar: data.avatar,
//             typeRole: userdata.typeRole,
//             phoneNumber: data.phoneNumber,
//             isSchedule: userdata.isSchedule,
//           });
//           resolve({
//             errCode: 0,
//             message: "Cập nhật tài khoản thành công!",
//           });
//         }
//       } else {
//         resolve({
//           errCode: 1,
//           message: `Không tìm thấy tài khoản!`,
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let updateUserData = (user, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu đầu vào!",
        });
      }

      let userdata = await db.User.findOne({
        where: { id: data.id },
      });

      if (userdata) {
        if (user.typeRole === "O" || user.typeRole === "A") {
          await db.User.upsert({
            id: data.id,
            email: data.email,
            name: data.name,
            typeRole: data.typeRole,
          });
          resolve({
            errCode: 0,
            message: "Cập nhật tài khoản thành công!",
          });
        } else {
          await db.User.upsert({
            id: data.id,
            email: userdata.email,
            name: data.name,
            typeRole: userdata.typeRole,
          });
          resolve({
            errCode: 0,
            message: "Cập nhật tài khoản thành công!",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: `Không tìm thấy tài khoản!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateAccountData = (user, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Thiếu dữ liệu đầu vào!",
        });
      }

      let userdata = await db.User.findOne({
        where: { id: data.id },
      });

      if (userdata) {
        if (
          user.typeRole === "O" ||
          user.typeRole === "A" ||
          user.typeRole === "K"
        ) {
          await db.User.upsert({
            id: data.id,
            email: data.email,
            name: data.name,
            avatar: data.avatar,
          });
          resolve({
            errCode: 0,
            message: "Cập nhật tài khoản thành công!",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: `Tài khoản không tồn tại!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updatePassword = (id, oldPassword, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await checkUserId(id);

      if (user) {
        let check = await bcrypt.compareSync(oldPassword, user.password);
        console.log("so sánh pass: ", check);
        
        if (!check) {
          resolve({
            errCode: 1,
            message: "Mật khẩu cũ không đúng!",
          });
          
        } else {
          let hashpassword = hashUserPassword(password);
          await db.User.upsert({
            id: user.id,
            email: user.email,
            password: hashpassword,
            name: user.name,
            avatar: user.avatar,
            typeRole: user.typeRole,
            phoneNumber: user.phoneNumber,
            isSchedule: user.isSchedule,
          });
          resolve({
            errCode: 0,
            message: "Cập nhật mật khẩu thành công!",
          });
        }

      } else {
        resolve({
          errCode: 1,
          message: "Tài khoản không tồn tại!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  requestRefreshToken: requestRefreshToken,
  handleUserLogin: handleUserLogin,

  getAllUsers: getAllUsers,
  getUser: getUser,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,

  createNewAccount: createNewAccount,
  updateAccountData: updateAccountData,
  updatePassword: updatePassword,
};
