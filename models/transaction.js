'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    ticker: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};