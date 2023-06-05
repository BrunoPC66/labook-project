import { z } from "zod";

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    message: string,
    token: string
}

export const LoginSchema = z.object({
    email: z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3),
    password: z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4)
}).transform((data) => data as LoginInputDTO)