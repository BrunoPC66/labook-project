import { z } from "zod";

export interface GetUserInputDTO {
    q?: string,
    token: string
}

export const GetUserSchema = z.object({
    q: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform((data) => data as GetUserInputDTO)