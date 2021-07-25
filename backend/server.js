import express from "express";
import mongoose from "mongoose";
import Cards from "./model/dbCards.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log("server running http://localhost:" + port);
});
