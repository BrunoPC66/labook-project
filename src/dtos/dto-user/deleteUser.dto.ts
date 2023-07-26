import { z } from "zod";

export interface DeleteUserInputDTO {
    id: string,
    token: string,
    password: string
}

export interface DeleteUserOutputDTO {
    message: string,
}

export const DeleteUserSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1),
    password: z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4)
}).transform((data) => data as DeleteUserInputDTO)