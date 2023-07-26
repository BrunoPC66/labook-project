import { BaseDatabase } from "./BaseDatabase"
import { PostDB, PostDBPlusCreatorName } from "../models/Post"
import { UserDatabase } from "./UserDatabase"

export class PostDatabase extends BaseDatabase {
    static TABLE_POSTS = "posts"

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
                ).where(`${UserDatabase.TABLE_USERS}.name`, "LIKE", `%${q}%`)
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

    public async findPostById(id: string): Promise<PostDBPlusCreatorName | undefined> {
        
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
            .where(`${PostDatabase.TABLE_POSTS}.id`, "=", id)
            .limit(1)

        if (result) {
            return result
        } else {
            return undefined
        }
    }

    public async insertPost(post: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(post)
    }

    public async editPost(input: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id: input.id })
            .update(input)
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where({id})
    }
}