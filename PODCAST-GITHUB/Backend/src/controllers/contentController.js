const contentService = require("../services/contentService");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "denvqae4v",
  api_key: "879654272522899",
  api_secret: "f4dDCroFWfRE3Nck05u7LgSQoFk",
});

let handleCreateNewContent = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    
    let images = req.body.images.split("CHIEN");

    
      let imagesLinks = [];
    
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "podcast",
        });
        imagesLinks.push(result.public_id);
        imagesLinks.push(result.secure_url);
      }
    
    let imagesLinksString = imagesLinks.join("CHIEN");
    console.log("url Content: ", imagesLinksString);

    req.body.hinhAnh = imagesLinksString;

    let infor = await contentService.handleCreateNewContent(req.body);

    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleGetAllContents = async (req, res) => {
  try {
    let id = req.query.id; //All, id

    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing required parametters",
        contents: [],
      });
    }

    let contents = await contentService.handleGetAllContents(id);
    return res.status(200).json({
      errCode: 0,
      message: "Ok",
      contents,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};


let handleGetAllContentsPTSN = async (req, res) => {
  try {
    let typeRole = req.query.typeRole; 
    let id = req.query.id;

    if (!typeRole && !id) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing required parametters",
        contents: [],
      });
    }

    if(typeRole){
      let contents = await contentService.handleGetAllContentsPTSN(typeRole, null);
      return res.status(200).json({
        errCode: 0,
        message: "Ok",
        contents,
      });
    }

    if(id){
      let contents = await contentService.handleGetAllContentsPTSN(null, id);
      return res.status(200).json({
        errCode: 0,
        message: "Ok",
        contents,
      });
    }    
    
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let handleEditContent = async (req, res) => {
  let id = req.body.id;
  let images = req.body.images;
  if(!id || !images){
    return res.status(200).json({message: "Thiếu dữ liệu"});
  }else{
    images = req.body.images.split("CHIEN");
    
      let imagesLinks = [];
    
      for (let i = 0; i < images.length; i++) {
        try {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "podcast",
          });
          imagesLinks.push(result.public_id);
          imagesLinks.push(result.secure_url);
        } catch (error) {
          console.log(error);
          
        }
      }
    
    let imagesLinksString = imagesLinks.join("CHIEN");
    console.log("url Content: ", imagesLinksString);

    req.body.hinhAnh = imagesLinksString;
  let data = req.body;
  let message = await contentService.handleEditContent(data);
  return res.status(200).json(message);
  }
    
    
};

let handleDeleteContent = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parametters!",
    });
  }
  let message = await contentService.handleDeleteContent(req.query.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewContent: handleCreateNewContent,
  handleGetAllContents: handleGetAllContents,
  handleEditContent: handleEditContent,
  handleDeleteContent: handleDeleteContent,
  handleGetAllContentsPTSN: handleGetAllContentsPTSN
};
