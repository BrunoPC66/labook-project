import { z } from "zod"

export interface UpdateLikeDislikeInputDTO {
    id: string,
    token: string
    like: boolean
}

export const UpdateLikeDislikeSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data => data as UpdateLikeDislikeInputDTO)