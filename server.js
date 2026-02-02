
require('dotenv').config();

//Imports
const express = require('express');
const app = express();

const { sequelize } = require('./src/models');

//Routes - later
const userRoutes = require('./src/routes/auth.routes');
//middleware
app.use(express.json());

//test
app.get('/', (req, res) => {
  res.status(200).json('Welcome to the API');
});

//Mounting routes
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 3000;

(
    async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }
)()