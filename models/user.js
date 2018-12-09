'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment);
    User.belongsToMany(models.Restaurant, {
      through: models.Favorite,
      as: 'UserFavorite'
    });

    User.belongsToMany(User, {
      through: models.Followship,
      as: 'Follower',
      foreignKey: 'followingId',
    });

    User.belongsToMany(User, {
      through: models.Followship,
      as: 'Following',
      foreignKey: 'followerId',
    });
  };
  return User;
};