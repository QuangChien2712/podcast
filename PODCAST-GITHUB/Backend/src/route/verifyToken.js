const jwt =require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  //const refreshToken = req.cookies.refreshToken; //req.headers
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, "voquangchien-be", (err, decode) => {
      if (err) {
       return res.status(403).json("Xác thực không thành công!");
      }
      req.user = decode;
      // console.log("decode: ", decode);
      
      next();
    });
  } else {
    return res.status(401).json("Chưa được xác thực!");
  };
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.typeRole.includes("A")
      || req.user.typeRole.includes("O") 
      || req.user.typeRole.includes("S")
      || req.user.typeRole.includes("K")
      )) {
      next();
    } else {      
      return res.status(403).json("Không có quyền truy cập!");
    }
  });
};

const verifyTokenAndIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.typeRole === "A")) {
      next();
    } else {
    return res.status(403).json("Không có quyền truy cập!");
    }
  });
};

const verifyTokenAndIsOwner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.typeRole === "O")) {
      next();
    } else {
    return res.status(403).json("Không có quyền truy cập!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndIsAdmin,
  verifyTokenAndAuth,
  verifyTokenAndIsOwner
};
