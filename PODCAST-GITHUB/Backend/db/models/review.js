"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      idContent: DataTypes.STRING,
      email: DataTypes.STRING,
      like: DataTypes.STRING,
      comment: DataTypes.STRING,
      share: DataTypes.STRING
    },
    {}
  );
  Review.associate = function (models) {
    // Review.belongsTo(models.Content, {
    //   foreignKey: "idContent",
    //   targetKey: "idContent",
    //   as: "maNoiDung",
    // });

    // Review.belongsTo(models.User, {
    //   foreignKey: "email",
    //   targetKey: "email",
    //   as: "taiKhoanReview",
    // });
  };
  return Review;
};