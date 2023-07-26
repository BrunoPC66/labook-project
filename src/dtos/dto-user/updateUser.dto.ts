import { z } from "zod";

export interface UpdateUserInputDTO {
    id: string,
    token:string,
    password: string,
    newName?: string,
    newEmail?: string,
    newPassword?: string
}

export interface UpdateUserOutputDTO {
    message: string
}

export const UpdateUserSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1),
    password: z.string({invalid_type_error: "'password' precisa ser no formato string"}).min(4),
    newName: z.string({ invalid_type_error: "'name' precisa ser no formato string" }).min(2).optional(),
    newEmail: z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3).optional(),
    newPassword: z.string({ invalid_type_error: "'newPassword' precisa ser no formato string" }).min(4).optional()
}).transform((data) => data as UpdateUserInputDTO)