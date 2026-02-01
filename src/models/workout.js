'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Workout.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: DataTypes.STRING,
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};