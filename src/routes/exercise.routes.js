const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller');
const {auth} = require('../middleware/auth.middleware');

router.get('/', exerciseController.listExercises);
router.get('/:id', exerciseController.getExerciseById);

router.post('/', auth, exerciseController.createExercise);
router.put('/:id', auth, exerciseController.updateExercise);
router.delete('/:id', auth, exerciseController.deleteExercise);

module.exports = router;