const { Exercise } = require('../models');

async function createExercise(data) {
    if (!data.name) throw new Error('Exercise name is required');

    const exist = await Exercise.findOne({ where: { name: data.name.trim() } });
    if (exist) throw new Error('Exercise with this name already exists');

    return await Exercise.create({
        name: data.name.trim(),
        muscle_group: data.muscle_group ? data.muscle_group.trim() : null,
        description: data.description ? data.description.trim() : null
    });
}

async function listExercises(filters = {}) {
    const where = {};
    if (filters.muscle_group) {
        where.muscle_group = filters.muscle_group;
    }
    return await Exercise.findAll({ 
        where,
        order: [['name', 'ASC']] 
    });
}

async function getExerciseById(id) {
    const exercise = await Exercise.findByPk(id);

    if (!exercise) throw new Error('Exercise not found');

    return exercise;
}

async function updateExercise(id, data) {
    const exercise = await getExerciseById(id);
    if (data.name && data.name.trim() !== exercise.name) {
        const exist = await Exercise.findOne({ where: { name: data.name.trim() } });
        if (exist) throw new Error('Exercise with this name already exists');
    }
   
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.muscle_group !== undefined) updateData.muscle_group = data.muscle_group ? data.muscle_group.trim() : null;
    if (data.description !== undefined) updateData.description = data.description ? data.description.trim() : null;

    await exercise.update(updateData);
    return exercise;
}

async function deleteExercise(id) {
    const exercise = await getExerciseById(id);
    await exercise.destroy();
    return;
}

module.exports = {
    createExercise,
    listExercises,  
    getExerciseById,
    updateExercise,
    deleteExercise
};