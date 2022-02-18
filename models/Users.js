module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade", // when a Users is deleted, all the likes that are related to it will be deleted.
    });
    Users.hasMany(models.Posts, {
      onDelete: "cascade", // when a Users is deleted, all the likes that are related to it will be deleted.
    });
  };

  return Users;
};
