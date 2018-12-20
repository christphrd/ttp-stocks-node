'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    account_balance: DataTypes.DECIMAL,
    password_digest: DataTypes.STRING
  }, {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email']
      },
    ]
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};