'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_lang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category_lang.belongsTo(models.category, {
        foreignKey: 'main_ID',
        onDelete:"CASCADE"
      })
      models.category.hasMany(category_lang, {
        foreignKey: 'main_ID'
      })
      category_lang.belongsTo(models.language, {
        foreignKey: 'lang',
        onDelete:"CASCADE"
      })
      models.language.hasMany(category_lang, {
        foreignKey: 'lang'
      })
    }
  }
  category_lang.init({
    main_ID: DataTypes.INTEGER,
    lang: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category_lang',
  });
  return category_lang;
};