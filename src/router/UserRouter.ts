import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

export const usersRouter = express.Router()

const usersController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new TokenManager(),
        new HashManager()
    )
)

usersRouter.get("/:q", usersController.getUser)
usersRouter.post("/signup", usersController.signup)
usersRouter.post("/login", usersController.login)
usersRouter.put("/:email", usersController.updateUser)
usersRouter.delete("/:email", usersController.deleteUser)