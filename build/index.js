"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
const PostRouter_1 = require("./router/PostRouter");
const LikeDislikeRouter_1 = require("./router/LikeDislikeRouter");
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const paths = [
    path_1.default.resolve(__dirname, "../dotenv.env"),
    path_1.default.resolve(__dirname, "../dotenv.env.example"),
];
paths.find((validEnvPath) => !(0, dotenv_1.config)({ path: validEnvPath }).error);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});
app.use("/users", UserRouter_1.usersRouter);
app.use("/posts", PostRouter_1.postsRouter);
app.use("/posts", LikeDislikeRouter_1.likeDislikeRouter);
app.use("/ping", UserRouter_1.usersRouter);
//# sourceMappingURL=index.js.map