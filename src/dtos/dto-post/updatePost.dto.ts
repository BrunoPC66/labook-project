import { z } from "zod";

export interface EditPostInputDTO {
    id: string,
    newContent?: string,
    token: string
}

export interface EditPostOuputDTO {
    content: string
}

export const EditPostSchema = z.object({
    id: z.string().min(1),
    newContent: z.string().min(1).max(1000).optional(),
    token: z.string().min(1)
}).transform(data => data as EditPostInputDTO)