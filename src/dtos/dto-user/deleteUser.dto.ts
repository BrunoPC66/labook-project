import { z } from "zod";

export interface DeleteUserInputDTO {
    email: string,
    password: string
}

export interface DeleteUserOutputDTO {
    message: string,
}

export const DeleteUserSchema = z.object({
    email: z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3),
    password: z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4)
}).transform((data) => data as DeleteUserInputDTO)