const reviewService = require("../services/reviewService");

let handleCreateNewReview = async (req, res) => {
  try {
    let infor = await reviewService.handleCreateNewReview(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleGetAllReviews = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu dữ liệu",
        reviews: [],
      });
    }

    let reviews = await reviewService.handleGetAllReviews(id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleGetReview = async (req, res) => {
  try {
    let idContent = req.query.idContent;

    if (!idContent) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu dữ liệu",
        reviews: [],
      });
    }

    let reviews = await reviewService.handleGetReview(idContent);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleEditReview = async (req, res) => {
  let data = req.body;
  let message = await reviewService.handleEditReview(data);
  return res.status(200).json(message);
};

let handleDeleteReview = async (req, res) => {
  if (!req.query.idContent || !req.query.email || !req.query.like) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }
  
  let message = await reviewService.handleDeleteReview(req.query.idContent, req.query.email, req.query.like);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewReview: handleCreateNewReview,
  handleGetAllReviews: handleGetAllReviews,
  handleEditReview: handleEditReview,
  handleDeleteReview: handleDeleteReview,

  handleGetReview: handleGetReview
};