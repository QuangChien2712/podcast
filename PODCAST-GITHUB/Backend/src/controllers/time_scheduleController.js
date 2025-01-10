const time_scheduleService = require("../services/time_scheduleService");

let handleCreateNewTime_schedule = async (req, res) => {
  try {
    let infor = await time_scheduleService.handleCreateNewTime_schedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleGetAllTime_schedules = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parametters",
        time_schedules: [],
      });
    }

    let time_schedules = await time_scheduleService.handleGetAllTime_schedules(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
      time_schedules,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleEditTime_schedule = async (req, res) => {
  let data = req.body;
  let message = await time_scheduleService.handleEditTime_schedule(data);
  return res.status(200).json(message);
};

let handleDeleteTime_schedule = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parametters!",
    });
  }
  let message = await time_scheduleService.handleDeleteTime_schedule(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewTime_schedule: handleCreateNewTime_schedule,
  handleGetAllTime_schedules: handleGetAllTime_schedules,
  handleEditTime_schedule: handleEditTime_schedule,
  handleDeleteTime_schedule: handleDeleteTime_schedule,
};
