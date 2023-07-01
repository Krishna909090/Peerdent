const db = require("../models");
const aws = require("../../aws/aws");
const Article = db.article;
const User = db.user;

var multer = require("multer");
const { all } = require("express/lib/application");

const store = multer.memoryStorage({
  function(req, file, cb) {
    cb(null, "");
  },
});

const uploadFile = multer({
  storage: store,
}).any("file");

console.log(uploadFile, "dadssffdsfds");

//Create EBook Record
exports.createArticle = async (req, res) => {
  try{
    return new Promise((resolve, reject) => {
      uploadFile(req, res, async function (err) {
        if (err) {
          reject({ error: err });
        } else {
          let file_Id = Math.floor(Math.random() * Math.pow(8, 5));
          const user = {
            title: req.body.title,
            content: req.body.content,
            amount: req.body.amount,
            userId: req.body.user_Id,
            file_Id: file_Id,
            category: req.body.category,
          };
          const id = req.body.user_Id;
          let users = await User.findOne({ where: { userId: id } });
          if(!users){
            res.status(400).send("User not found")
          }
          let x = await Article.create(user);
          
          let files = req.files;
          for (let K of files) {
            let Obj = await aws.uploadFiles(
              req.body.user_Id,
              K.originalname,
              K.buffer
            );
            if (K.fieldname === "thumbnail") {
              let params = {
                thumbnail: Obj.Location,
              };
              console.log(x.dataValues.file_Id, "sadada")
              await Article.update(params, {
                where: { file_Id: x.dataValues.file_Id },
              });
            } else {
              let params = {
                image: Obj.Location,
              };
              console.log(params);
              await Article.update(params, {
                where: { file_Id: x.dataValues.file_Id },
              });
            }
            
          }
          let data = await Article.findOne({ where: { file_Id: x.dataValues.file_Id } });
            return  res.status(200).send(data);
        }
      });
    });
  }
  catch(e){
    res.status(400).send("Something went wrong!")
  }
 
};

exports.getAllFiles = async (req, res) => {
  console.log("dadadadadaad")
  // let data = ["Periodontist", "Orthodontist"]
   let data = req.body.filter
   console.log(data)
   if(req.body.filter){
     let arr = data
     await Article.findAll( { where: {
       category : arr
  }}).then((response) => {
      if (!response) {
       return res.status(400).send("No Records Found")
      }
      console.log(response,"aaaaaaaaaaaaaaaasdasdpapdpada")
     return res.json(response);
    })
   }
   else{
     await Article.findAll().then((data) => {
      if (!data) {
       return res.status(400).send("Videos data empty")
      }
     return res.json(data);
    })
   }
};

exports.getFileById = async (req, res) => {
  let id = req.params.file_Id;
  let data = await Article.findOne({ where: { file_Id: id } });
  if (!data) {
    return res.status(400).send("No Article was found with this ID");
  }
  return res.status(200).send(data)
};

exports.getFilesByUserId = async (req, res) => {
  let id = req.params.user_Id;
  let data = await Article.findAndCountAll({ where: { userId: id } });
  if (!data) {
    return res.status(400).send("No Article Found for these User");
  }
  return res.status(200).send(data);
};

exports.deleteByFileId = async (req, res) => {
  let id = req.params.file_Id;
  let data = await Article.destroy({ where: { file_Id: id } });
  if (!data) {
   return  res.status(400).send("Unknown File Id");
  }
 return res.status(200).send("Article Deleted Successfully");
};
