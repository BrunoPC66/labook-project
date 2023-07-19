import { LikeDislikeDB, POST_LIKE } from "../models/LikeDislike"
import { PostDB } from "../models/Post"
import { BaseDatabase } from "./BaseDatabase"

export class LikeDislikeDataBase extends BaseDatabase {
    static TABLE_LIKESDISLIKES = "likes_dislikes"

    public verifyExistenceOfLikeDislike = async (postDB: PostDB): Promise<POST_LIKE | undefined> => {
        const [result] = await BaseDatabase
            .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
            .where({
                user_id: postDB.creator_id,
                post_id: postDB.id
            })

        if (result.like === 1) {
            return POST_LIKE.LIKED
        } else if (result.like === 0) {
            return POST_LIKE.DISLIKED
        } else {
            return undefined
        }
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
            .del()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public newLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
        .insert(likeDislikeDB)
    }
 }