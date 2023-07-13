import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export enum USER_ROLES {
    STANDARD = "STANDARD",
    ADMIN = "ADMIN"
}

export interface Payload {
    id: string,
    name: string,
    role: USER_ROLES
}

export class TokenManager {
    public createToken = (payload: Payload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    public getPayload = (token: string): Payload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as Payload
        } catch (error) {
            return null
        }
    }
}