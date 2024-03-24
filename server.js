import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";


const port = 3000;
const app = express();
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "TYPING",
  password: "root",
  port: 5432,
});

db.connect();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("test.ejs", {obj: {name: "Naman"}, error: false});
});

app.get("/leaderboard", (req, res) => {
  res.render("leaderboard.ejs", { obj: {name: "Naman"}, error: false});
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { obj: {name: "Naman"}, error: false });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", { obj: {name: "Naman"}, error: false });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { obj: {name: "Naman"}, error: false });
});

app.get("/test", (req, res) => {
  res.render("test.ejs", { obj: {name: "Naman"}, error: false });
});

app.post("/signup", (req, res) => {
  const {username ,email, password} = req.body;
  console.log(username, email, password);
});

app.post("/login", (req, res)=>{
  console.log(req.body.email);
  console.log(req.body.password);
});

app.get("/reset", (req, res) => {
  res.render("reset.ejs");
});

app.post("/reset", (req, res) => {
  const email = req.body.email;
  console.log(email);
});

app.listen(port, () => {
  console.log(`The server has started on port number ${port}`);
});
