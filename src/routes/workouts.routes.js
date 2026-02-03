const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts.controller');
const {auth} = require('../middleware/auth.middleware');

router.use(auth); // Protect all routes below

//workout routes
router.post('/', workoutsController.createWorkout);
router.get('/', workoutsController.getUserWorkouts);
router.get('/:id', workoutsController.getWorkoutById);
router.put('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

//routes for exercises within workouts

router.post('/:workoutId/exercises', workoutsController.addExerciseToWorkout);
router.patch('/:workoutId/exercises/:exerciseId/toggle-completion', workoutsController.toggleExerciseCompletion);
router.patch('/:workoutId/exercises/:exerciseId/notes', workoutsController.updateNotesforEx);


module.exports = router;