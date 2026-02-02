'use strict';

const { where } = require('sequelize');
const {Workout, User, WorkoutExercise, Exercise} = require('../models');
const { up } = require('../migrations/20260128085221-create-user');


// Get all workouts for a user + exercises ordered by date
async function getUserWorkouts(userId) {
    return await Workout.findAll({
        where: { user_id: userId },
        include: [
            {
                model: WorkoutExercise,
                as: 'workout_exercises',
                include: [{
                    model: Exercise,
                    as: 'exercise'
                }],
                order: [['order_index', 'ASC']]
            }],
        order: [['scheduled_at', 'ASC']]
    });
}

async function getWorkoutById(userId, workoutId) {
        // Fetch workout with associated exercises
        const workout = await Workout.findOne({
            where: {
                id: workoutId,
                user_id: userId
            },
            //get exercises included
            include: [
                {
                    model: WorkoutExercise,
                    as: 'workout_exercises', //model association alias
                    include: [{
                        model: Exercise,
                        as: 'exercise'
                    }],
                    order: [['order_index', 'ASC']] //retrieve in order
                }
            ]
        });

        return workout;
}

async function createWorkout(userId, data) {
    const transaction = await sequelize.transaction();

    try {
        // Validation
        if(!data.title || !data.title.trim()) {
            throw new Error('Workout title is required');
        }

        if(!data.scheduled_at || isNaN(new Date(data.scheduled_at).getTime())) {
            throw new Error('Valid scheduled_at date is required');
        }

        const workout = await Workout.create({
            user_id: userId,
            title: data.title,
            scheduled_at: new Date(data.scheduled_at),
            notes: data.notes || null
        }, { transaction });

        if(data.exercises && Array.isArray(data.exercises)) {
            //loop for each exercise
            for(let i = 0; i < data.exercises.length; i++) {
                //get exercise data
                const ex = data.exercises[i];

                //check if in exercises 
                const exercise = await Exercise.findByPk(ex.exercise_id);
                if(!exercise) {
                    throw new Error(`Exercise with ID ${ex.exercise_id} not found`);
                }

                // Create WorkoutExercise entry for each exercise
                await WorkoutExercise.create({
                    workout_id: workout.id,
                    exercise_id: ex.exercise_id,
                    order_index: i,
                    user_notes: ex.user_notes || null
                }, { transaction });
            }
        }

        await transaction.commit();

        //before commiting, add return getworkoutbyId here
    } catch (err) {
        console.error('Error creating workout:', err);
        await transaction.rollback();
        throw err;
    }
}


//
async function updateWorkout(userId, workoutId, data) {
    const transaction = await sequelize.transaction();

    try {
        //Check first if exists
        const workout = await Workout.findOne({
            where: {
                id: workoutId,
                user_id: userId
            }
        });

        if(!workout) {
            throw new Error('Workout not found');
        }

        //Update fields if provided
        const updateData = {};
        if(data.title !== undefined) updateData.title = data.title;
        if(data.scheduled_at !== undefined) updateData.scheduled_at = data.scheduled_at;
        if(data.notes !== undefined) updateData.notes = data.notes;

        await workout.update(updateData, { transaction });

        // Handle exercises update if provided

        if (data.exercises && Array.isArray(data.exercises)) {
            await WorkoutExercise.destroy({
                where: { workout_id: workoutId },
                transaction
            });

            for (let i = 0; i < data.exercises.length; i++) {
                const ex = data.exercises[i];
                const exercise = await Exercise.findByPk(ex.exercise_id);
                if (!exercise) {
                    throw new Error(`Exercise with ID ${ex.exercise_id} not found`);
                }

                await WorkoutExercise.create({
                    workout_id: workout.id,
                    exercise_id: ex.exercise_id,
                    order_index: i,
                    user_notes: ex.user_notes || null,
                    is_completed: ex.is_completed || false
                }, { transaction });
            }
        }

        await transaction.commit();

        return await getWorkoutById(userId, workoutId);
    } catch (err) {
        console.error('Error updating workout:', err);
        await transaction.rollback();
        throw err;
    }
}

async function deleteWorkout(userId, workoutId) {
    const workout = await Workout.findOne({
        where: {
            id: workoutId,
            user_id: userId
        }
    });

    if (!workout) throw new Error('Workout not found');

    await workout.destroy();

    return { message: 'Workout deleted successfully' };
}

async function addExerciseToWorkout(userId, workoutId, exerciseData) {
    const transaction = await sequelize.transaction();

    try {
        const workout = await Workout.findOne({
            where: {
                id: workoutId,
                user_id: userId
            },
            transaction
        });

        if(!workout) throw new Error('Workout not found');

        const exercise = await Exercise.findByPk(exerciseData.exercise_id);
        if(!exercise) throw new Error('Exercise not found');

        const exlink = await WorkoutExercise.findOne({
            where: {
                workout_id: workoutId,
                exercise_id: exerciseData.exercise_id
            },
            transaction
        });

        if(exlink) throw new Error('Exercise already added to workout');

        // Get last exercise in workout by order
        const lastExercise = await WorkoutExercise.findOne({
            where: { workout_id: workoutId },
            order: [['order_index', 'DESC']],
            transaction
        });

        // Add to end of list or start if none
        const orderIndex = lastExercise ? lastExercise.order_index + 1 : 0;

        //create workout exercise in workout
        const workoutExercise = await WorkoutExercise.create({
            workout_id: workoutId,
            exercise_id: exerciseData.exercise_id,
            order_index: orderIndex,
            user_notes: exerciseData.user_notes || null,
            is_completed: false
        }, { transaction });

        await transaction.commit();

        return await WorkoutExercise.findByPk(workoutExercise.id, {
            include: [{
                model: Exercise,
                as: 'exercise'
            }]
        });
    } catch (err) {
        console.error('Error adding exercise to workout:', err);
        await transaction.rollback();
        throw err;
    }
}

async function removeExFromWorkout(userId, workoutId, exerciseId) {
    const workout = await Workout.findOne({
        where: {
            id: workoutId,
            user_id: userId
        }
    });

    if (!workout) throw new Error('Workout not found');

    const workoutExercise = await WorkoutExercise.findOne({
        where: {
            workout_id: workoutId,
            exercise_id: exerciseId
        }
    });

    if (!workoutExercise) throw new Error('Exercise not found in workout');

    await workoutExercise.destroy();

    return { message: 'Exercise removed from workout successfully' };
}

async function toggleExCompletion(userId, workoutId, isCompleted) {
    const workout = await Workout.findOne({
        where: {
            id: workoutId,
            user_id: userId
        }
    });

    if (!workout) throw new Error('Workout not found');

    const workoutExercise = await WorkoutExercise.findOne({
        where: {
            workout_id: workoutId
        }
    });

    if (!workoutExercise) throw new Error('Exercise not found in workout');

    // Toggle completion statuss
    workoutExercise.is_completed = !workoutExercise.is_completed;
    await workoutExercise.save();

    return workoutExercise;
}

async function updateNotesToExercise(userId, workoutId, exerciseId, notes) {
    const workout = await Workout.findOne({
        where: {
            id: workoutId,
            user_id: userId
        }
    });

    if (!workout) throw new Error('Workout not found');

    const workoutExercise = await WorkoutExercise.findOne({
        where: {
            workout_id: workoutId,
            exercise_id: exerciseId
        }
    });

    if (!workoutExercise) throw new Error('Exercise not found in workout');

    workoutExercise.user_notes = notes; //replace notes

    await workoutExercise.save();

    return workoutExercise;
}

module.exports = {
    getUserWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    removeExFromWorkout,
    toggleExCompletion,
    updateNotesToExercise
};