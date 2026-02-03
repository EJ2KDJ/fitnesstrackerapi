'use strict';

const { v4: uuidv4 } = require('uuid');

// Hardcoded UUIDs so you can copy these into Postman
const exercises = [
  // Chest
  { id: 'a1b2c3d4-0001-0001-0001-000000000001', name: 'Bench Press',        muscle_group: 'Chest',     description: 'Lie on a bench and press a barbell upward, then lower it back to chest level.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000002', name: 'Push-Ups',           muscle_group: 'Chest',     description: 'Place hands slightly wider than shoulders, lower body to the ground, then push back up.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000003', name: 'Chest Fly',          muscle_group: 'Chest',     description: 'Lie on a bench with dumbbells extended to the sides, then bring them together over your chest.' },

  // Back
  { id: 'a1b2c3d4-0001-0001-0001-000000000004', name: 'Deadlift',           muscle_group: 'Back',      description: 'Stand with feet hip-width apart, grip the barbell, and lift it to hip level while keeping your back straight.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000005', name: 'Pull-Ups',           muscle_group: 'Back',      description: 'Hang from a bar with an overhand grip and pull your body up until your chin is above the bar.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000006', name: 'Bent-Over Row',      muscle_group: 'Back',      description: 'Hinge at the hips holding a barbell, then row the weight up to your lower ribcage.' },

  // Legs
  { id: 'a1b2c3d4-0001-0001-0001-000000000007', name: 'Squats',             muscle_group: 'Legs',      description: 'Stand with feet shoulder-width apart, lower your hips as if sitting, then drive back up.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000008', name: 'Lunges',             muscle_group: 'Legs',      description: 'Step one foot forward into a deep stance, lower your back knee toward the ground, then step back.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000009', name: 'Leg Press',          muscle_group: 'Legs',      description: 'Sit in a leg press machine and push the platform away using your legs.' },

  // Shoulders
  { id: 'a1b2c3d4-0001-0001-0001-000000000010', name: 'Overhead Press',     muscle_group: 'Shoulders', description: 'Sit or stand with a barbell at shoulder height and press it overhead until arms are fully extended.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000011', name: 'Lateral Raises',     muscle_group: 'Shoulders', description: 'Hold dumbbells at your sides and raise them out to shoulder height, keeping arms slightly bent.' },

  // Arms
  { id: 'a1b2c3d4-0001-0001-0001-000000000012', name: 'Bicep Curls',        muscle_group: 'Arms',      description: 'Hold dumbbells at your sides, palms facing forward, and curl them up to shoulder height.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000013', name: 'Tricep Dips',        muscle_group: 'Arms',      description: 'Place hands on a bench behind you, lower your body by bending elbows, then push back up.' },

  // Core
  { id: 'a1b2c3d4-0001-0001-0001-000000000014', name: 'Plank',              muscle_group: 'Core',      description: 'Hold a push-up position on your forearms, keeping your body in a straight line.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000015', name: 'Crunches',           muscle_group: 'Core',      description: 'Lie on your back with knees bent, curl your upper body up toward your knees.' },

  // Cardio
  { id: 'a1b2c3d4-0001-0001-0001-000000000016', name: 'Burpees',            muscle_group: 'Cardio',    description: 'Drop to the ground into a push-up, jump your feet to your hands, then jump up with arms overhead.' },
  { id: 'a1b2c3d4-0001-0001-0001-000000000017', name: 'Jumping Jacks',      muscle_group: 'Cardio',    description: 'Jump with feet spreading apart while raising arms overhead, then return to starting position.' },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Exercises', exercises.map(ex => ({
      id:           ex.id,
      name:         ex.name,
      muscle_group: ex.muscle_group,
      description:  ex.description,
      createdAt:    now,
      updatedAt:    now
    })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercises', null, {});
  }
};