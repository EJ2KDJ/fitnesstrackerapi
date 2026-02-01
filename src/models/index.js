'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');

const db = {};

// Choose env safely
const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  sequelizeConfig
);

// Import models
const User = require('./user')(sequelize, DataTypes);
const Workout = require('./workout')(sequelize, DataTypes);
const Exercise = require('./exercise')(sequelize, DataTypes);
const WorkoutExercise = require('./workoutexercise')(sequelize, DataTypes);


User.hasMany(Workout, { foreignKey: 'user_id' });
Workout.belongsTo(User, { foreignKey: 'user_id' });

Workout.hasMany(WorkoutExercise, { foreignKey: 'workout_id' });
WorkoutExercise.belongsTo(Workout, { foreignKey: 'workout_id' });

Exercise.hasMany(WorkoutExercise, { foreignKey: 'exercise_id' });
WorkoutExercise.belongsTo(Exercise, { foreignKey: 'exercise_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Workout = Workout;
db.Exercise = Exercise;
db.WorkoutExercise = WorkoutExercise;

module.exports = db;
