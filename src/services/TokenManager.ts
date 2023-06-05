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
    public createToken = async (payload: any): Promise<string> => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    public getPayload = async (token: string): Promise<any | null> => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload
        } catch (error) {
            return null
        }
    }
}