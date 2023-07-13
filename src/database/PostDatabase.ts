import { BaseDatabase } from "./BaseDatabase"
import { PostDB, PostDBPlusCreatorName } from "../models/Post"
import { UserDatabase } from "./UserDatabase"

export class PostDatabase extends BaseDatabase {
    static TABLE_POSTS = "posts"
    static TABLE_USERS = "users"

    public async findPostPlusCreatorName(q: string | undefined): Promise<PostDBPlusCreatorName[]> {
        if (q) {
            return await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    `${PostDatabase.TABLE_POSTS}.id`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `${PostDatabase.TABLE_POSTS}.content`,
                    `${PostDatabase.TABLE_POSTS}.likes`,
                    `${PostDatabase.TABLE_POSTS}.dislikes`,
                    `${PostDatabase.TABLE_POSTS}.created_at`,
                    `${PostDatabase.TABLE_POSTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.name as creator_name`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    "=",
                    `${UserDatabase.TABLE_USERS}.id`
                ).where("content", "LIKE", `%${q}%`)
        } else {
            return await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(
                    `${PostDatabase.TABLE_POSTS}.id`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    `${PostDatabase.TABLE_POSTS}.content`,
                    `${PostDatabase.TABLE_POSTS}.likes`,
                    `${PostDatabase.TABLE_POSTS}.dislikes`,
                    `${PostDatabase.TABLE_POSTS}.created_at`,
                    `${PostDatabase.TABLE_POSTS}.updated_at`,
                    `${UserDatabase.TABLE_USERS}.name as creator_name`
                )
                .join(
                    `${UserDatabase.TABLE_USERS}`,
                    `${PostDatabase.TABLE_POSTS}.creator_id`,
                    "=",
                    `${UserDatabase.TABLE_USERS}.id`
                )
        }
    }

    public async findPostById(id: string): Promise<PostDBPlusCreatorName> {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where(id)

        return result
    }

    public async insertPost(post: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(post)
    }

    public async editPost(id: string, input: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where(id)
            .update(input)
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where(id)
    }
}