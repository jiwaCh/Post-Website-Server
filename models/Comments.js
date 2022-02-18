module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING(10000),
      //   type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // PostId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // }
  });

  return Comments;
};
