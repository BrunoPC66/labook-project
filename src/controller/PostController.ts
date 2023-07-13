import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import { GetPostSchema } from "../dtos/dto-post/getPost.dto";
import { CreatePostSchema } from "../dtos/dto-post/createPost.dto";
import { EditPostSchema } from "../dtos/dto-post/updatePost.dto";
import { DeletePostSchema } from "../dtos/dto-post/deletePost.dto";


export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = GetPostSchema.parse({
                q: req.query.q as string,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.getPost(input)

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

    public createPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

            await this.postBusiness.createPost(input)

            res.status(201)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = EditPostSchema.parse({
                id: req.params.id,
                newContent: req.body.content,
                token: req.headers.authorization as string
            })

            const output = await this.postBusiness.editPost(input)

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

    public deletePost = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeletePostSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            await this.postBusiness.deletePost(input)

            res.status(200)
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}