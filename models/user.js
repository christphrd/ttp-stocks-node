'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  User.newAccount = async function(data) {
    if (!data.password_confirmation || data.password === data.password_confirmation) {
      let hash = await bcrypt.hashSync(data.password, saltRounds);

      return User.create({name: data.name, email: data.email, password_digest: hash})
    };

    if (data.password !== data.password_confirmation) {
      throw new Error("Password and confirmation do not match.")
    }
  };
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};