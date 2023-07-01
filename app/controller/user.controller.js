const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.user;

// Registration
exports.Register = async (req, res) => {
  let userId = Math.floor(Math.random() * Math.pow(8, 5))
  const user = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.useremail,
    code: req.body.code,
    phonenumber: JSON.stringify(req.body.phonenumber),
    dob: req.body.dob,
    address: req.body.address,
    country: req.body.country,
    userId: userId,
  };
   
  let email = await User.findOne({ where: { email: req.body.useremail } })
  if(email){
    return res.status(400).send({data:req.body.useremail, message:"Email already exists"})
  }

  let phonenumber = await User.findOne({ where: { phonenumber: req.body.phonenumber } })
  if(phonenumber){
    return res.status(400).send({data:req.body.phonenumber, message:"Phone number already exists"})
  }
  console.log(user)
  user.password = await bcrypt.hash(user.password, 10);
  User.create(user)
    .then(data => {
      res.status(200).send({ data: data, message: "User Registered Successfully" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

//Authentication
exports.login = async (req, res) => {
  let params = req.body;
  let data = await User.findOne({ where: { email: req.body.useremail } })
  if (data && bcrypt.compareSync(params.password, data.dataValues.password)) {
    const token = jwt.sign(
      {
        useremail: params.useremail,
        userId: data.dataValues.userId
      },
      "Secret",
      {
        expiresIn: "24h",
      }
    );

    let userDetail = {
      user: data.dataValues,
      token: token
    }
    res.status(200).send(userDetail)
  }
  else {
    res.status(400).send("Invalid Useremail or Password")
  }

}

// Update Profile
exports.update = async (req, res) => {
  let params = req.body
  console.log(params, "params")
  const id = params.user_Id;
  console.log(id,"adadsadadada")
  await User.update(params, {
    where: { userId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User Profile Updated Successfully"
        });
      } else {
        res.send({
          message: `Cannot update User details with id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User details  with id=" + id
      });
    });
};


// Update Profile
exports.userDetails = async (req, res) => {
  console.log("adadasdasadadada")
  const id = req.query.userId;
// console.log(req.params, "Sdadaada", req.query)
  try {
    
    let data = await User.findOne({
      where: { userId: id }})
      console.log(data, "data")
    res.status(200).send(data)
  }

  catch (err) {
    res.status(500).send({
      message: "Error getting User details  with id=" + id
    });
  }

};







