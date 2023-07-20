"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDislikeRouter = void 0;
const express_1 = __importDefault(require("express"));
const LikeDislikeController_1 = require("../controller/LikeDislikeController");
const LikeDislikeBusiness_1 = require("../business/LikeDislikeBusiness");
const LikeDislikeDatabase_1 = require("../database/LikeDislikeDatabase");
const TokenManager_1 = require("../services/TokenManager");
const PostDatabase_1 = require("../database/PostDatabase");
exports.likeDislikeRouter = express_1.default.Router();
const likeDislikeController = new LikeDislikeController_1.LikeDislikeController(new LikeDislikeBusiness_1.LikeDislikeBusiness(new PostDatabase_1.PostDatabase(), new LikeDislikeDatabase_1.LikeDislikeDataBase(), new TokenManager_1.TokenManager()));
exports.likeDislikeRouter.put("/:id/like", likeDislikeController.updateLikeDislike);
//# sourceMappingURL=LikeDislikeRouter.js.map