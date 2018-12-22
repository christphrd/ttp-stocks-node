'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    ticker: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER
  }, { 
    underscored: true
  });
  Transaction.associate = function(models) {
    // associations can be defined here
    models.Transaction.belongsTo(models.User)
  };
  return Transaction;
};