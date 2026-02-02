const workoutService = require('../services/workouts.service'); 

async function createWorkout(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.createWorkout(userId, req.body);
        return res.status(201).json(workout);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'server error' });
    }
}

async function getUserWorkouts(req, res) {
    try {
        const userId = req.user.id;
        const workouts = await workoutService.getUserWorkouts(userId);
        return res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'server error' });
    }
}

async function getWorkoutById(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.getWorkoutById(userId, req.params.id);
        return res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'server error' });
    }
}

async function updateWorkout(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.updateWorkout(userId, req.params.id, req.body);
        return res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        if (err.message === 'Workout not found') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }
}

async function deleteWorkout(req, res) {
    try {
        const userId = req.user.id;
        await workoutService.deleteWorkout(userId, req.params.id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.message === 'Workout not found') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }  
}

async function addExerciseToWorkout(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.addExerciseToWorkout(userId, req.params.id, req.body);
        return res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        if (err.message === 'Workout not found' || err.message === 'Exercise not found' || err.message === 'Exercise already added to workout') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }
}

async function removeExerciseFromWorkout(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.removeExerciseFromWorkout(userId, req.params.id, req.params.exerciseId);
        return res.status(200).json(workout);
    }
    catch (err) {
        console.error(err);
        if (err.message === 'Workout not found' || err.message === 'Exercise not found in workout') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }
}

async function toggleExerciseCompletion(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.toggleExerciseCompletion(userId, req.params.id, req.params.exerciseId);
        return res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        if (err.message === 'Workout not found' || err.message === 'Exercise not found in workout') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }
}

async function updateNotesforEx(req, res) {
    try {
        const userId = req.user.id;
        const workout = await workoutService.updateNotesforEx(userId, req.params.id, req.params.exerciseId, req.body.notes);
        return res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        if (err.message === 'Workout not found' || err.message === 'Exercise not found in workout') {
            return res.status(404).json({ message: err.message });
        }
        return res.status(400).json({ message: 'server error' });
    }
}

module.exports = {
    createWorkout,
    getUserWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    toggleExerciseCompletion,
    updateNotesforEx
};