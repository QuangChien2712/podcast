"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      typeRole: DataTypes.STRING,
      isSchedule: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasOne(models.Pay, {
      foreignKey: "email",
      as: "userPay",
    });

    User.hasOne(models.Schedule, {
      foreignKey: "email",
      as: "userSchedule",
    });

    User.hasOne(models.Measure, {
      foreignKey: "email",
      as: "userMeasure",
    });

    User.hasMany(models.Review, {
      foreignKey: "email",
      as: "taiKhoanReview",
    });
  };
  return User;
};



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     phoneNumber: DataTypes.STRING,
//     typeRole: DataTypes.STRING,
//     isSchedule: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };