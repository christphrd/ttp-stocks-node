'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secret = 'cdiep';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      unique: true,
      type: DataTypes.STRING
    },
    account_balance: {
      defaultValue: 5000.00,
      type: DataTypes.DECIMAL
    },
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
  User.newAccount = async function(data) {
    if (!data.password_confirmation || data.password === data.password_confirmation) {
      let hash = await bcrypt.hashSync(data.password, saltRounds);

      return User.build({name: data.name, email: data.email, password_digest: hash})
    };

    if (data.password !== data.password_confirmation) {
      throw new Error("Password and confirmation does not match.")
    }
  };
  User.checkUser = async function(email, password) {
    //... fetch user from a db etc.
    const user = await User.findOne({where: {email: email}});

    const match = await bcrypt.compare(password, user.password_digest);

    if (match) {
      //login
      return user
    }
  };
  User.prototype.encodeToken = function() {
    const payload = {email: this.email};
    const token = jwt.sign(payload, secret);
    return token
  };
  return User;
};