import express from "express";

const usersRouter = express.Router();

import {
    getAllUsers,
    getUser, 
    getUserById,
    getUserByUsername  
} from "./db/getUsers.js";

import {createUser} from "./db/createUser.js";

// POST /api/users/register

usersRouter.post("/users/register", async (req, res, next) => {
    try {
        const newUser = createUser(username, password)

        return newUser;
    } catch (error) {
    next (error);
    }
});

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
    try {
        const user_username = req.body;
        
        if (!(user_username)) {
            res.status(400).send("Username required");}
        
        const existingUser = await username.findOne({ user_username});

        if (existingUser)
        return res.status(409).send("User already exists. Please login");

        return
    } catch (error) {
        throw error;
        next (error);
    }
}

// GET /api/users/me

// GET /api/users/userId

// DELETE /api/users/userId

export { usersRouter };