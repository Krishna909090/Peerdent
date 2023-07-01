const db = require("../models");
const aws = require("../../aws/aws");
const favourites = db.favourites;
const Ebook = db.ebook;
const Article = db.article;
const Video = db.video
const User = db.user;

//Create EBook Record
exports.createBookmark = async (req, res) => {
  try {
    let type = JSON.stringify(req.body.type);
    const user = {
      userId: req.body.user_Id,
      file_Id: req.body.file_Id,
      statusInfo: req.body.statusInfo,
      type: req.body.type,
    };
    let users = await User.findOne({ where: { userId: req.body.user_Id } });
    
    if (!users) {
      return res.status(400).send({ message: "User not found", status: 400 });
    }
    let getData = await favourites.findOne({
      where: { userId: req.body.user_Id, file_Id: req.body.file_Id },
    });
    if (getData) {
      await favourites.update({statusInfo: req.body.statusInfo}, { where: { userId: req.body.user_Id, file_Id: req.body.file_Id },});
      if (req.body.type === "Ebook") {
        console.log("Update the Ebook")
     //   await Ebook.update({ statusInfo:  req.body.statusInfo }, { where: { file_Id: req.body.file_Id } });
        console.log("update");
        let data = await Ebook.findOne({
          where: { file_Id: req.body.file_Id },
        });
        
        return res.status(200).send({ data: data, status: 200 });
      }
      if (req.body.type === "Article") {
        console.log("Update the Article")
      //  await Article.update({ statusInfo:  req.body.statusInfo }, { where: { file_Id: req.body.file_Id } });
        let data = await Article.findOne({
          where: { file_Id: req.body.file_Id },
        });
        return res.status(200).send({ data: data, status: 200 });
      }
      if (req.body.type === "Video") {
        console.log("Update the Video")
      //  await Video.update({ statusInfo:  req.body.statusInfo }, { where: { video_Id: req.body.file_Id } });
        let data = await Video.findOne({
          where: { video_Id: req.body.file_Id },
        });
        return res.status(200).send({ data: data, status: 200 });
      }
    }
    else {

      console.log("Came at the else bookmark")
      
      if (req.body.type === "Ebook") {
        console.log("Create the Ebook")
      //  await Ebook.update({ statusInfo: true }, { where: { file_Id: req.body.file_Id } });
        let data = await Ebook.findOne({
          where: { file_Id: x.dataValues.file_Id },
        });
        let Obj = {
          ...user,
          ...data
        }
        let x = await favourites.create(Obj);
        return res.status(200).send({ data: data, status: 200 });
      }
      else if (req.body.type === "Article") {
        console.log("Create the Article")
      //  await Article.update({ statusInfo: true }, { where: { file_Id: req.body.file_Id } });
        let data = await Article.findOne({
          where: { file_Id: x.dataValues.file_Id },
        });
        let Obj = {
          ...user,
          ...data
        }
        let x = await favourites.create(Obj);
        return res.status(200).send({ data: data, status: 200 });
      }
      else if (req.body.type === "Video") {
        console.log("Create the Video")
     //   await Video.update({ statusInfo: true }, { where: { file_Id: req.body.file_Id } });
        let data = await Video.findOne({
          where: { file_Id: x.dataValues.file_Id },
        });
        let Obj = {
          ...user,
          ...data
        }
        let x = await favourites.create(Obj);
        return res.status(200).send({ data: data, status: 200 });
      }
    }
  } catch (e) {
    res.status(400).send({message:"Something went wrong!", status:400});
  }
};

exports.getBookmarksByUserId = async (req, res) => {
  try {
    let id = req.params.user_Id;
    let data = await favourites.findAll({ where: { userId: id } });
    if (!data) {
      return res.status(400).send("No Bookmarks Found for these User");
    }
    let Ebooks = [];
    let Articles = [];
    let Videos = [];
    for (let K of data) {
      if (K.type === 'Ebook') {
        let data = await Ebook.findOne({
          where: { file_Id: K.dataValues.file_Id }
        });
        Ebooks.push(K);
      };
      if (K.type === 'Article') {
        let data = await Article.findOne({
          where: { file_Id: K.dataValues.file_Id }
        })
        Articles.push(K);
      };
      if (K.type === 'Video') {
        let data = await Video.findOne({
          where: { video_Id: K.dataValues.file_Id }
        });
        Videos.push(K);
      };
    }
    return res.status(200).send({ Ebook: Ebooks, Article: Articles, Video: Videos, status: 200 });
  } catch (e) {
    res.status(400).send({ message: "Something went wrong!", status: 400 });
  }
};
