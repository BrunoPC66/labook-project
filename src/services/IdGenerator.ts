import { v4 } from "uuid"

export class IdGenerator {
    public static generator = (): string => {
        return v4()
    }
}