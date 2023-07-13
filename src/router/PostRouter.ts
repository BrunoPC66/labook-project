import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { TokenManager } from "../services/TokenManager"

export const postsRouter = express.Router()

const postsController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new TokenManager()
    )
)

postsRouter.get("/", postsController.getPost)
postsRouter.post("/", postsController.createPost)
postsRouter.put("/:id", postsController.editPost)
postsRouter.delete("/:id", postsController.deletePost)