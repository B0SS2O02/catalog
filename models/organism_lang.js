'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organism_lang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      organism_lang.belongsTo(models.organism, {
        foreignKey: 'main_ID',
        onDelete:"CASCADE"
      })
      models.organism.hasMany(organism_lang, {
        foreignKey: 'main_ID'
      })
      organism_lang.belongsTo(models.language, {
        foreignKey: 'lang',
        onDelete:"CASCADE"
      })
      models.language.hasMany(organism_lang, {
        foreignKey: 'lang'
      })
    }
  }
  organism_lang.init({
    main_ID: DataTypes.INTEGER,
    lang: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'organism_lang',
  });
  return organism_lang;
};