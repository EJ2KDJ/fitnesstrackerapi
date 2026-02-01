const authService = require('../sequelize/service/auth.service');

// User Registration Controller
async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body);
        return res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function login(req, res) {
    try {
        const { user, token } = await authService.loginUser(req.body);
        return res.status(200).json({ 
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports = {
    register,
    login
};