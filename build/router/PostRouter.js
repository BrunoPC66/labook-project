"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controller/PostController");
const PostBusiness_1 = require("../business/PostBusiness");
const PostDatabase_1 = require("../database/PostDatabase");
const TokenManager_1 = require("../services/TokenManager");
exports.postsRouter = express_1.default.Router();
const postsController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new TokenManager_1.TokenManager()));
exports.postsRouter.get("/", postsController.getPost);
exports.postsRouter.post("/", postsController.createPost);
exports.postsRouter.put("/:id", postsController.editPost);
exports.postsRouter.delete("/:id", postsController.deletePost);
//# sourceMappingURL=PostRouter.js.map