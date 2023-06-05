import { z } from "zod";

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string,
}

export interface SignupOutputDTO {
    message: string,
    token: string
}

export const SignupSchema = z.object({
    name: z.string({ invalid_type_error: "'name' precisa ser no formato string" }).min(2),
    email: z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3),
    password: z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4),
}).transform((data) => data as SignupInputDTO)