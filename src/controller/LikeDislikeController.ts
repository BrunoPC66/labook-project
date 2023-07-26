import { Request, Response } from "express";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";
import { BaseError } from "../errors/BaseError";
import { UpdateLikeDislikeSchema } from "../dtos/dto-likedis/updateLikeDislike.dto";


export class LikeDislikeController {
    constructor(
        private likeDislikeBusiness: LikeDislikeBusiness
    ) { }

    public updateLikeDislike = async (req: Request, res: Response) => {
        try {
            const input = UpdateLikeDislikeSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            })

            const output = await this.likeDislikeBusiness.updateLikeDislike(input)

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
}