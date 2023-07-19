import express from "express"
import { LikeDislikeController } from "../controller/LikeDislikeController"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikeDislikeDataBase } from "../database/LikeDislikeDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const likeDislikeRouter = express.Router()

const likeDislikeController = new LikeDislikeController(
    new LikeDislikeBusiness(
        new PostDatabase(),
        new LikeDislikeDataBase(),
        new TokenManager()
    )
)

likeDislikeRouter.put("/:id/like", likeDislikeController.updateLikeDislike)