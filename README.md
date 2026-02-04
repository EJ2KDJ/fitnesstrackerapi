# Simple Fitness Tracker API

A fitness tracker RESTful API that includes JWT authentication, workout creation with notes for users, and pre-made exercises that users can add to workouts.

This project is purely backend with no UI. Endpoints were tested using Postman.

---

## Features

- Authentication (register & login)  
- Workouts and exercise listing  
- Create, view, update, and delete workouts and exercises  

---

## How It Works

### Authentication
- Users register with an email and password (hashed)
- Token-based authentication is used for protected routes

### Workouts and Exercises
- Users create workouts by adding pre-made exercises using their UUID
- Users can update workouts by marking them complete, switching exercises, or deleting them
- Users can view created workouts by date
- Users can view pre-made exercises

---

## What I Learned

### Sequelize Seeding
- Creating dummy data using Sequelize

### Database Relationships
- Designed many-to-many relationships  
- Workouts can have multiple exercises, and exercises can be added to multiple workouts
