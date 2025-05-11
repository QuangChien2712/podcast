const discussioncontentService = require("../services/discussioncontentService");

let handleCreateNewDiscussioncontent = async (req, res) => {
  try {
    let infor = await discussioncontentService.handleCreateNewDiscussioncontent(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleGetAllDiscussioncontents = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu dữ liệu",
        discussioncontents: [],
      });
    }

    let discussioncontents = await discussioncontentService.handleGetAllDiscussioncontents(id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      discussioncontents,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleEditDiscussioncontent = async (req, res) => {
  let data = req.body;
  let message = await discussioncontentService.handleEditDiscussioncontent(data);
  return res.status(200).json(message);
};

let handleDeleteDiscussioncontent = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }
  let message = await discussioncontentService.handleDeleteDiscussioncontent(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewDiscussioncontent: handleCreateNewDiscussioncontent,
  handleGetAllDiscussioncontents: handleGetAllDiscussioncontents,
  handleEditDiscussioncontent: handleEditDiscussioncontent,
  handleDeleteDiscussioncontent: handleDeleteDiscussioncontent,
};
