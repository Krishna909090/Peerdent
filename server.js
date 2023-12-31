const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./app/models");
const app = express();

// app.use(cors({origin: '*'}));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Simple Routes
const User = require("./app/controller/user.controller");
const Ebook = require("./app/controller/ebook.controller");
const Article = require("./app/controller/article.controller");
const Video = require("./app/controller/video.controller");
const favourites = require("./app/controller/favourites.controller");
const category = require("./app/controller/catergories.controller");
const question = require("./app/controller/Q&A.controller");
var router = require("express").Router();

 // create application/json parser
 app.use(bodyParser.json());
 // parse various different custom JSON types as JSON
 app.use(bodyParser.json({ type: 'application/*+json' }));
 // parse some custom thing into a Buffer
 app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
 // parse an HTML body into a string
 app.use(bodyParser.text({ type: 'text/html' }));
 // parse an text body into a string
 app.use(bodyParser.text({ type: 'text/plain' }));
 // create application/x-www-form-urlencoded parser
 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//User Related APIS******************************************************
router.post("/register", User.Register); // Create a User
router.post("/login", User.login); // Login a User
router.post("/update", User.update); // Update the User Details
router.get("/getUserDetails", User.userDetails)

//************************************************************************

//Ebook Related APIS*******************************************************
router.post("/Ebooks", Ebook.create); // Create Ebook
router.post("/getAllFiles", Ebook.getAllFiles); // Get ALL Ebooks
router.get("/getFileById/:file_Id", Ebook.getFileById); // Get Ebook By Id
router.get("/getFilesByUserId/:user_Id", Ebook.getFilesByUserId); // Get By User Id
router.delete("/deleteFileById/:file_Id", Ebook.deleteByFileId); // Delete By File Id
//**************************************************************************

//Article Related APIS*******************************************************
router.post("/createArticle", Article.createArticle); // Create Article
router.get("/getAllArticles", Article.getAllFiles); // Get ALL Ebook Files
router.get("/getArticleById/:file_Id", Article.getFileById); // Get ALL Ebook by File ID
router.get("/getArticlesByUserId/:user_Id", Article.getFilesByUserId); // Get Files by User Id
router.delete("/deleteArticle/:file_Id", Article.deleteByFileId); // Delete Files by File Id
//*********************************************************************************************

//Video Related APIS********************************************************************************
router.post("/Uploadvideos", Video.UploadVideoFiles); // Create Video Record
router.get("/getVideoFileById/:video_Id", Video.getVideoFileById); // Get Video By Id
router.get("/getAllVideoFiles", Video.getALLVideoFiles); // Get ALL Videos
router.get("/getVideoFilesByUserId/:user_Id", Video.getVideoFilesByUserId); // Get Videos By User Id
router.delete("/deleteVideoFileById/:video_Id", Video.deleteVideoFileById); // Delete Files by Video Id
//*****************************************************************************************************
router.post("/createBookmark", favourites.createBookmark)
router.get("/getBookmarkByUserId/:user_Id", favourites.getBookmarksByUserId)
router.get("/getAllCategories", category.getAllCategories)
router.post("/createCategory", category.createCategory)
//******************************************************************************************************

router.post("/createQuestion", question.createQuestion);
router.post("/getAllQuestions", question.getAllQuestions);
router.post("/createAnswer", question.createAnswer);
router.post("/updateQuestion", question.updateQuestion);
router.post("/updateAnswer", question.updateAnswer);
router.get("/getAllAnswers", question.getAllAnswers);
router.delete("/deleteQuestion", question.deleteQuestion);
router.delete("/deleteAnswer", question.deleteAnswer);
//**********************************************************************************************************
app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to PeerDental application." });
});

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
    