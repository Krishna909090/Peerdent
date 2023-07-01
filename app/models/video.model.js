module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("video", {
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      video_Id:{
          type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      videoType:{
        type: Sequelize.STRING
      },
      statusInfo:{
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull: false
      }
      });
      return Video;
    };
  
   
  
  