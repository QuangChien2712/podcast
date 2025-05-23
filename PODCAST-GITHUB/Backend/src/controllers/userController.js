const userService = require("../services/userService");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "denvqae4v",
  api_key: "879654272522899",
  api_secret: "f4dDCroFWfRE3Nck05u7LgSQoFk",
});

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }

  let userData = await userService.handleUserLogin(email, password, res);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
    accessToken: userData.accessToken ? userData.accessToken : "",
  });
};

let handleLogout = async (req, res, next) => {
  res.cookie("refreshToken", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("accessToken", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đã đăng xuất",
  });
};

let handleGetAllUsers = async (req, res) => {
  let email = req.user.email;
  let role = req.user.typeRole;

  if (role && email) {
    if (role === "A" || role === "O") {
      let users = await userService.getAllUsers("All");
      return res.status(200).json({
        errCode: 0,
        message: "Ok",
        users: users,
      });
    } else {
      let users = await userService.getAllUsers(email);
      return res.status(200).json({
        errCode: 0,
        message: "Ok",
        users: users,
      });
    }
  }

  // if (role && role === "TP") {
  //   let users = await userService.getAllUsers(company);
  //   return res.status(200).json({
  //     errCode: 0,
  //     errMessage: "Ok",
  //     users: users[0]
  //   });
  // }

  // if (role &&
  // (role.includes("CB")
  // || role.includes("CHD")
  // || role.includes("PTP"))) {
  //   let users = await userService.getAllUsers(email);
  //   return res.status(200).json({
  //     errCode: 0,
  //     errMessage: "Ok",
  //     users: users
  //   });
  // }
};

let handleGetAccount = async (req, res) => {
  let email = req.user.email;

  if (email) {
    let data = await userService.getAllUsers(email);

    return res.status(200).json(data);
  } else {
    return res.status(200).json({
      errCode: 0,
      message: "Thiếu dữ liệu!",
    });
  }
};

let handleGetUser = async (req, res) => {
  let id = req.query.id;

  if (id) {
    let data = await userService.getUser(id);

    return res.status(200).json(data);
  } else {
    return res.status(200).json({
      errCode: 0,
      message: "Thiếu dữ liệu!",
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }

  let images = [];
  let imagesLinks = [];

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "podcast",
      });
      imagesLinks.push(result.public_id);
      imagesLinks.push(result.secure_url);
    }
  }

  let imagesLinksString = imagesLinks.join(";");

  req.body.avatar = imagesLinksString;

  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleCreateNewAccount = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let images = req.body.avatar;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }

  let imagesLinks = [];
  if (images) {
    const result = await cloudinary.v2.uploader.upload(images, {
      folder: "podcast",
    });
    imagesLinks.push(result.public_id);
    imagesLinks.push(result.secure_url);
  }

  let imagesLinksString = imagesLinks.join("CHIEN");

  req.body.avatar = imagesLinksString;
  let data = await userService.createNewAccount(req.body);
  return res.status(200).json(data);
};

let handleDeleteUser = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }
  let message = await userService.deleteUser(req.query.id);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let user = req.user;
  let data = req.body;
  let message = await userService.updateUserData(user, data);
  return res.status(200).json(message);
};

let handleEditAccount = async (req, res) => {
  let user = req.user;
  let email = req.body.email;
  let images = req.body.avatar;

  if (!email) {
    return res.status(500).json({
      errCode: 1,
      message: "Thiếu dữ liệu!",
    });
  }

  let imagesLinks = [];
  if (images) {
    const result = await cloudinary.v2.uploader.upload(images, {
      folder: "podcast",
    });
    imagesLinks.push(result.public_id);
    imagesLinks.push(result.secure_url);
  }

  let imagesLinksString = imagesLinks.join("CHIEN");

  req.body.avatar = imagesLinksString;

  let message = await userService.updateAccountData(user, req.body);
  return res.status(200).json(message);
};


let handleUpdatePassword = async (req, res) => {
  let id = req.user.id;
  let oldPassword = req.body.oldPassword;
  let password = req.body.password;

  let message = await userService.updatePassword(String(id), oldPassword, password);
  return res.status(200).json(message);
  
};

module.exports = {
  handleLogin: handleLogin,
  handleLogout: handleLogout,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,

  handleCreateNewAccount: handleCreateNewAccount,
  handleGetAccount: handleGetAccount,
  handleGetUser: handleGetUser,
  handleEditAccount: handleEditAccount,
  handleUpdatePassword: handleUpdatePassword
};
