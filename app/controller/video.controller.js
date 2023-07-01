const db = require("../models");
const aws = require("../../aws/aws");
const Video = db.video;
const User = db.user;


//Create EBook Record
exports.UploadVideoFiles = async (req, res) => {
  try{
    let video_Id =  Math.floor(Math.random() * Math.pow(8, 5))
    const user = {
      title: req.body.title,
      content: req.body.content,
      amount: req.body.amount,
      userId: req.body.user_Id,
      video:req.body.file,
      video_Id: video_Id,
      category: req.body.category,
    }; 
    let users = await User.findOne({ where: { userId: req.body.user_Id } });
    if(!users){
      res.status(400).send("User not found")
    }
    let x = await Video.create(user);
    console.log(x,"xxxx")
    let Obj = await Video.findOne({ where: { video_Id: x.dataValues.video_Id } });
    console.log(Obj)
    return  res.status(200).send(Obj);
  }
  catch(e){
    res.status(400).send("Something went wrong!")
  }
 
};

exports.getALLVideoFiles = async (req, res) => {
  
  console.log("dadadadadaad")
  // let data = ["Periodontist", "Orthodontist"]
   let data = req.body.filter
   console.log(data)
   if(req.body.filter){
     let arr = data
     await Video.findAll( { where: {
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
     await Video.findAll().then((data) => {
      if (!data) {
       return res.status(400).send("Videos data empty")
      }
     return res.json(data);
    })
   }
};



exports.getVideoFileById = async (req, res) => {
  let id = req.params.video_Id;
  let data = await Video.findOne({ where: { video_Id: id } });
  if (!data) {
    return res.status(400).send("No Article was found with this ID");
  }
  return res.status(200).send(data)
};

exports.getVideoFilesByUserId = async (req, res) => {
  let id = req.params.user_Id;
  let data = await Video.findAndCountAll({ where: { userId: id } });
  if (!data) {
    return res.status(400).send("No Article Found for these User");
  }
  return res.status(200).send(data);
};

exports.deleteVideoFileById = async (req, res) => {
  let id = req.params.video_Id;
  let data = await Video.destroy({ where: { video_Id: id } });
  if (!data) {
   return  res.status(400).send("Unknown File Id");
  }
 return res.status(200).send("Article Deleted Successfully");
};
