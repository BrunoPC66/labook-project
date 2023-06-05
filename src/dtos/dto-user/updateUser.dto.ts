import { z } from "zod";

export interface UpdateUserInputDTO {
    email:string,
    password: string,
    update: {
        newName?: string,
        newEmail?: string,
        newPassword?: string
    }
}

export interface UpdateUserOutputDTO {
    message: string
}

export const UpdateUserSchema = z.object({
    email: z.string().email().min(3),
    password: z.string({invalid_type_error: "'password' precisa ser no formato string"}).min(4),
    update: z.object({
        newName: z.string({ invalid_type_error: "'name' precisa ser no formato string" }).min(2).optional(),
        newEmail: z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3).optional(),
        newPassword: z.string({ invalid_type_error: "'newPassword' precisa ser no formato string" }).min(4).optional()
    }).optional()
}).transform((data) => data as UpdateUserInputDTO)