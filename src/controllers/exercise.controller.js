const exerciseService = require('../services/exercise.service');


async function createExercise(req, res) {
    try {
        const exercise = await exerciseService.createExercise(req.body);
        return res.status(201).json(exercise);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message || 'Failed to create exercise' });
    }
}

async function listExercises(req, res) {
    try {
        const filters = {
            muscle_group: req.query.muscle_group
        };

        const exercises = await exerciseService.listExercises(filters);
        return res.status(200).json(exercises);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || 'Failed to list exercises' });
    }
}

async function getExerciseById(req, res) {
    try {
        const exercise = await exerciseService.getExerciseById(req.params.id);
        return res.status(200).json(exercise);
    } catch (err) {
        console.error(err);
        return res.status(404).json({ message: err.message || 'Exercise not found' });
    }
}

async function updateExercise(req, res) {
    try {
        const exercise = await exerciseService.updateExercise(req.params.id, req.body);
        return res.status(200).json(exercise);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message || 'Failed to update exercise' });
    }
}

async function deleteExercise(req, res) {
    try {
        const result = await exerciseService.deleteExercise(req.params.id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || 'Failed to delete exercise' });
    }
}

module.exports = {
    createExercise,
    listExercises,
    getExerciseById,
    updateExercise,
    deleteExercise
};