module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      // type: DataTypes.STRING(10000), // need to drop table to update
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", // when a post is deleted, all the comment that are related to it will be deleted.
    });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
