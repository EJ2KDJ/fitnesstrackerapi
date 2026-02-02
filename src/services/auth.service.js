const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = process.env;

const SALT_ROUNDS = 10;

// User Registration
async function registerUser({email, password}) {

    //check if email already exists
    const existingUser = await User.findOne({where: {email}});

    if (existingUser) throw new Error('Email already in use');

    //hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    //create user
    const user = await User.create({
        email,
        password: hashedPassword
    });

    return user;
}


// User Login
async function loginUser({email, password}) {
    //find user by email
    const user = await User.findOne({where: {email}});

    if (!user) throw new Error('Invalid email or password');

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    //generate JWT token
    const token = jwt.sign(
        {id: user.id, 
        email: user.email}, 
        JWT_KEY, {expiresIn: '1h'}
    );

    return {user, token};
}

module.exports = {
    registerUser,
    loginUser
};