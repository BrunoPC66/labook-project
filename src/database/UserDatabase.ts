import { UserDB } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    public async findUser(q: string | undefined): Promise<UserDB[]> {
        if (q) {
            return await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${q}%`)
        } else {
            return await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
        }
    }

    public async findUserById(id: string): Promise<UserDB | undefined> {
        const [userDB] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })
            .limit(1)

        return userDB
    }

    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [userDB] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })
            .limit(1)

        return userDB
    }

    public async insertUser(user: UserDB): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(user)
    }

    public async updateUser(id: string, input: UserDB): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })
            .update(input)
    }

    public async deleteUser(id: string): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .del()
            .where({ id })
    }
}