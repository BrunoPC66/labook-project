import { z } from "zod";

export interface GetPostInputDTO {
    q?: string,
    token: string
}

export const GetPostSchema = z.object({
    q: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform((data) => data as GetPostInputDTO)