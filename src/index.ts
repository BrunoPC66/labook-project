import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import { usersRouter } from "./router/UserRouter";
import { postsRouter } from "./router/PostRouter";
import { likeDislikeRouter } from "./router/LikeDislikeRouter";
import path from "path";
import { config } from "dotenv";

// dotenv.config() ESTÁ DANDO PROBLEMA NA LEITURA DO 'dotenv'

const paths = [
  path.resolve(__dirname, "../dotenv.env"),
  path.resolve(__dirname, "../dotenv.env.example"),
];

paths.find((validEnvPath) => !config({ path: validEnvPath }).error);

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`) 
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", likeDislikeRouter);
app.use("/ping", usersRouter);