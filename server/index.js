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

app.get("/posts", async (req, res) => {
  console.log(req.body);
  res.send("get");
});

app.post("/posts", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
