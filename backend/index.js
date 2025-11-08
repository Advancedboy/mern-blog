import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";

mongoose
  .connect(
    `mongodb+srv://admin:257AbhIjrOsyb5Vz@cluster0.zxupgpk.mongodb.net/blog?appName=Cluster0`
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => ("DB error", err));

const app = express();

app.use(express.json());

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server ok`);
});
