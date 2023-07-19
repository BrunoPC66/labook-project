import { Request, Response } from "express";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";
import { BaseError } from "../errors/BaseError";


export class LikeDislikeController {
    constructor(
        private likeDislikeBusiness: LikeDislikeBusiness
    ) { }

    public updateLikeDislike = async (req: Request, res: Response) => {
        try {
            const input = ({
                id: req.params.id,
                token: req.headers.authorization as string,
                like: req.body.like
            })

            await this.likeDislikeBusiness.updateLikeDislike(input)

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