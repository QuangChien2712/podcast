const roleService = require("../services/roleService");

let handleCreateNewRole = async (req, res) => {
  try {
    let infor = await roleService.handleCreateNewRole(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleGetAllRoles = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parametters",
        roles: [],
      });
    }

    let roles = await roleService.handleGetAllRoles(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Ok",
      roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleEditRole = async (req, res) => {
  let data = req.body;
  let message = await roleService.handleEditRole(data);
  return res.status(200).json(message);
};

let handleDeleteRole = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parametters!",
    });
  }
  let message = await roleService.handleDeleteRole(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewRole: handleCreateNewRole,
  handleGetAllRoles: handleGetAllRoles,
  handleEditRole: handleEditRole,
  handleDeleteRole: handleDeleteRole,
};
