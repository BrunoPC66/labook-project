import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/dto-user/signup.dto";
import { LoginSchema } from "../dtos/dto-user/login.dto";
import { UpdateUserSchema } from "../dtos/dto-user/updateUser.dto";
import { DeleteUserSchema } from "../dtos/dto-user/deleteUser.dto";
import { GetUserSchema } from "../dtos/dto-user/getUser.dto";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = GetUserSchema.parse({
                q: req.query.q,
                token: req.headers.authorization
            })

            const output = await this.userBusiness.getUsers(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            const output = await this.userBusiness.signup(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
                console.log(error);

            }
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password,
            })

            const output = await this.userBusiness.login(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = UpdateUserSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                password: req.body.password,
                newName: req.body.newName,
                newEmail: req.body.newEmail,
                newPassword: req.body.newPassword
            })
            
            const output = await this.userBusiness.updateUser(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeleteUserSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                password: req.body.password
            })

            const output = await this.userBusiness.deleteUser(input)

            res.status(200).send(output)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //     public ping = (req: Request, res: Response) => {
    //         res.send("Pong")
    //       }
}