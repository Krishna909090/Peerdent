module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      file_Id: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      statusInfo:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false
      }
      });
      return Article;
    };
  
  