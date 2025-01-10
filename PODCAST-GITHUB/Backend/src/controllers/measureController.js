const measureService = require("../services/measureService");

let handleCreateNewMeasure = async (req, res) => {
  try {
    let infor = await measureService.handleCreateNewMeasure(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleGetAllMeasures = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parametters",
        measures: [],
      });
    }

    let measures = await measureService.handleGetAllMeasures(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
      measures,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleEditMeasure = async (req, res) => {
  let data = req.body;
  let message = await measureService.handleEditMeasure(data);
  return res.status(200).json(message);
};

let handleDeleteMeasure = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parametters!",
    });
  }
  let message = await measureService.handleDeleteMeasure(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewMeasure: handleCreateNewMeasure,
  handleGetAllMeasures: handleGetAllMeasures,
  handleEditMeasure: handleEditMeasure,
  handleDeleteMeasure: handleDeleteMeasure,
};
