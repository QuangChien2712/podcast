const scheduleService = require("../services/scheduleService");

let handleCreateNewSchedule = async (req, res) => {
  try {
    console.log("data: ", req.body);
    
    let infor = await scheduleService.handleCreateNewSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleGetAllSchedules = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Thiếu dữ liệu",
        schedules: [],
      });
    }

    let schedules = await scheduleService.handleGetAllSchedules(id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      schedules,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Có lỗi từ máy chủ",
    });
  }
};

let handleEditSchedule = async (req, res) => {
  let data = req.body;
  let message = await scheduleService.handleEditSchedule(data);
  return res.status(200).json(message);
};

let handleDeleteSchedule = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }
  let message = await scheduleService.handleDeleteSchedule(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewSchedule: handleCreateNewSchedule,
  handleGetAllSchedules: handleGetAllSchedules,
  handleEditSchedule: handleEditSchedule,
  handleDeleteSchedule: handleDeleteSchedule,
};
