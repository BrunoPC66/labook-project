import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./router/UserRouter";
import { postsRouter } from "./router/PostRouter";
import { likeDislikeRouter } from "./router/LikeDislikeRouter";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`) 
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", likeDislikeRouter);
app.use("/ping", usersRouter);

// app.get("/ping", (req, res) => {
//   res.send("Pong")
// })