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

app.use(cors(corsOptions));
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get("/user", async (req, res) => {});

app.post("/posts", async (req, res) => {
  
});

app.get("/posts", async (req, res) => {
  console.log(req.body);
  res.send("get");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
