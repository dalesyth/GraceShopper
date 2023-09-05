import express from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { REACT_APP_JWT_SECRET } = process.env;
const usersRouter = express.Router();

import {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUser,
  createUser,
  deleteUser,
} from "../db/users.js";

// POST /api/users/register

usersRouter.post("/register", async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password.length < 8) {
      next({
        message: "Password Too Short!",
        name: "Password too short error",
        error: "Password Too Short",
      });
    }
    const user = await createUser(req.body);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      REACT_APP_JWT_SECRET
    );

    res.send({
      message: "Thank you for registering, please login",
      token,
      user,
    });
  } catch ({ name, message }) {
    console.error({ name, message });
    next({ name, message });
  }
});

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log("attempting to login");

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
      const token = jwt.sign({ id: user.id, username }, REACT_APP_JWT_SECRET);

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

// GET http://localhost:3000/api/users

usersRouter.get("/", async (req, res, next) => {
  const user = await getAllUsers();

  try {
    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:userId

usersRouter.get("/:userid", async (req, res, next) => {
  const { userid } = req.params;

  try {
    const userById = await getUserById(userid);

    res.send(userById);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/username/:username

usersRouter.get("/username/:username", async (req, res, next) => {
  const { username } = req.params;

  try {
    const userByName = await getUserByUsername(username);
    res.send(userByName);
  } catch ({ name, message }) {
    next({ name, message });
  }
});




// DELETE /api/users/:userId

usersRouter.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId);

    res.send(deletedUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
})

export { usersRouter };
