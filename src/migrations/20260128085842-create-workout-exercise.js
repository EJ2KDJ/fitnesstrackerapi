'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    'WorkoutExercises',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      workout_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      exercise_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Exercises',
          key: 'id'
        }
      },

      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      user_notes: {
        type: Sequelize.TEXT
      },

      order_index: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['workout_id', 'exercise_id']
        }
      ]
    }
  );
},
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WorkoutExercises');
  }
};