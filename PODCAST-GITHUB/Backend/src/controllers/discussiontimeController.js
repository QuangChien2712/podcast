const discussiontimeService = require("../services/discussiontimeService");

let handleCreateNewDiscussiontime = async (req, res) => {
  try {
    let infor = await discussiontimeService.handleCreateNewDiscussiontime(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleGetAllDiscussiontimes = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu dữ liệu",
        discussiontimes: [],
      });
    }

    let discussiontimes = await discussiontimeService.handleGetAllDiscussiontimes(id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      discussiontimes,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleEditDiscussiontime = async (req, res) => {
  let data = req.body;
  let message = await discussiontimeService.handleEditDiscussiontime(data);
  return res.status(200).json(message);
};

let handleDeleteDiscussiontime = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }
  let message = await discussiontimeService.handleDeleteDiscussiontime(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewDiscussiontime: handleCreateNewDiscussiontime,
  handleGetAllDiscussiontimes: handleGetAllDiscussiontimes,
  handleEditDiscussiontime: handleEditDiscussiontime,
  handleDeleteDiscussiontime: handleDeleteDiscussiontime,
};
