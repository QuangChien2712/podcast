const scheduleService = require("../services/scheduleService");

let handleCreateNewSchedule = async (req, res) => {
  try {
    let infor = await scheduleService.handleCreateNewSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleGetAllSchedules = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parametters",
        schedules: [],
      });
    }

    let schedules = await scheduleService.handleGetAllSchedules(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
      schedules,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
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
      message: "Missing required parametters!",
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