import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnl3ZGVzbmhjcWZ2cGtleWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NTUwNDUsImV4cCI6MTk5NzUzMTA0NX0.2XKnp4jowOJpcChy6xDus45p6UO00OrW-JPpZSqRiRQ";
const SUPABASE_URL = "https://sgfywdesnhcqfvpkeyhg.supabase.co";
const PORT = 3000;
const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5173/",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get user
app.post("/getuserinfo", async (req, res) => {
  const { email } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("email", email)
      .single();
    res.status(200).send({ name: data.name });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all posts from DB
app.post("/getposts", async (req, res) => {
  const { name } = req.body;
  try {
    const { data, error } = await supabase.from("posts").select("*");
    res.status(200).send(data);
  } catch (error) {
    throw error;
  }
});

app.get("/user", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();
    data !== null ? res.status(200).send(data) : res.status(404).send(false);
  } catch (error) {
    throw error;
  }
});

// Add new user to DB
app.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate a new UUID for the auth_uid column
    const { data: auth } = await supabase.auth.signUp({ email, password });

    // Insert the new user into the users table
    const { data: user, error } = await supabase
      .from("users")
      .insert({ name, email, password, auth_uid: auth.user.id })
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  const date = new Date();
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert({ title, content, author, date: date })
      .single();
    res.status(200).send("Post Created!");
  } catch (error) {
    console.log(error);
  }
});

// Delete post
app.delete("/deletepost", async (req, res) => {
  const { id } = req.body;
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .single();
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
  res.status(404).send(false);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
