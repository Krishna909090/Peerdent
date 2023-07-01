module.exports = (sequelize, Sequelize) => {
    const favourites = sequelize.define("favourites", {
     
      file_Id:{
          type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      statusInfo:{
          type: Sequelize.BOOLEAN
      },
      type: {
          type: Sequelize.STRING
      }
      });
      return favourites;
    };
  
   
  
  