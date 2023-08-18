import express from "express";

import * as jwt from "jsonwebtoken";
const usersRouter = express.Router();

import { getUser, getUserById, getUserByUsername, createUser } from "../db/users.js";



// POST /api/users/register

usersRouter.post("/users/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      next({
        message: "Password Too Short!",
        name: "Password too short error",
        error: "Password Too Short",
      });
    }
    const user = await createUser({ username, password });

    const token = jwt.sign({
      id: user.id,
      username: user.username,
    });

    res.send({
      message: "Thank you for registering",
      token,
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      message: "Please provide a username and password",
      name: "Missing credentials error",
      error: "Please provide a username and password",
    });
  }
  try {
    const user = await getUser({ username, password });

    if (user.username == username) {
      const token = jwt.sign({ id: user.id, username });

      res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        message: "Your username or password is incorrect",
        name: "Incorrect username or password error",
        error: " Your username or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/

usersRouter.get("/me", async (req, res, next) => {
  const user = getUserByUsername();

  try {
    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:userId

usersRouter.get("/userid", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const userById = await getUserById(userId);

    res.send(userById);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

export { usersRouter };
