module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING
    },
    middlename: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.INTEGER
    },
    phonenumber: {
      type: Sequelize.INTEGER
    },
    dob: {
      type: Sequelize.INTEGER
    },
    address: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    work: {
      type: Sequelize.STRING
    },
    experience: {
      type: Sequelize.STRING
      },
    history: {
      type: Sequelize.STRING
    },
    skill: {
      type: Sequelize.STRING
    },
    highschool: {
      type: Sequelize.STRING
    },
    graduationyear: {
      type: Sequelize.INTEGER
    },
    workplace:{
      type: Sequelize.STRING
    },
    specialization:{
      type: Sequelize.STRING
    }
    });
    return User;
  };

