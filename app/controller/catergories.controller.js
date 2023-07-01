const db = require("../models");
const category = db.categories;
const User = db.user

exports.getAllCategories = async (req, res) => {  
    let data = await category.findAll({ where: { active: 1 } })
    if (!data) {
      return res.status(400).send("No active categories");
    }
    console.log(data, "aaaaaa")
    return res.status(200).send(data)
  }

  exports.createCategory = async (req, res) => {
    let Obj = {
      active:1,
      categories:req.body.categories,
      id:req.body.id
    }  
    console.log(Obj)
    let data = await category.create(Obj)
    if (!data) {
      return res.status(400).send("Something went wrong!");
    }
    console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return res.status(200).send(data)
  }

