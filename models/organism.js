'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organism extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      organism.belongsTo(models.category, {
        foreignKey: 'category_ID',
        onDelete: 'CASCADE',
        onUpdate: "no action"
      })
      models.category.hasMany(organism, {
        foreignKey: 'category_ID'
      })
      organism.hasMany(models.category, {
        foreignKey: 'category_ID'
      })
    }
  }
  organism.init({
    category_ID: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'organism',
  });
  return organism;
};