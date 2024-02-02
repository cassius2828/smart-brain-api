import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleImage from "./controllers/image.js";
import { handleApiCall } from "./controllers/imageDetect.js";
import handleProfileID from "./controllers/profileID.js";


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "cassiusreynolds",
    password: "",
    database: "smart-brain",
  },
});

// * EXPRESS SETUP
const app = express();
app.use(cors());
app.use(express.json());

// * GET REQUEST TEST
app.get("/", (req, res) => {
  res.send("success");
});

// * SIGN IN
app.post("/signin", (req, res) => {
  handleSignIn(req, res, bcrypt, db);
});

// * REGISTER
app.post("/register", (req, res) => {
  handleRegister(req, res, bcrypt, db);
});

// * PROFILE ID
app.get("/profile/:id", (req, res) => {
  handleProfileID(req, res, db);
});

// * IMAGE
app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

// * IMAGE DETECT
app.post("/imageDetect", (req, res) => {
  handleApiCall(req, res);
});

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res);
});

// * RUN SERVER
app.listen(3001, () => {
  console.log("app is running on port 3001");
});

/*
/--> res = this is working
/signin --> POST = success : fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> user

this.setState(Object.assign(this.state.user, { entries: count }));
this.setState(Object.assign(this.state.user, { entires: count }));
*/
// const myFunction = (res, reqType) => {
//   const { id } = reqType;
//   let found = false;
//   database.users.forEach((user) => {
//     if (user.id === id) {
//       found = true;
//       return res.json(user);
//     }
//     if (!found) res.status(400).json("not found");
//   });
// };


