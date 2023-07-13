import { z } from "zod";

export interface DeletePostInputDTO {
    id: string,
    token: string
}

export const DeletePostSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)