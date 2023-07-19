import { LikeDislikeDataBase } from "../database/LikeDislikeDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UpdateLikeDislikeInputDTO } from "../dtos/dto-likedis/updateLikeDislike.dto";
import { BadRequest } from "../errors/BadRequest";
import { POST_LIKE } from "../models/LikeDislike";
import { Post } from "../models/Post";
import { TokenManager } from "../services/TokenManager";

export class LikeDislikeBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private likeDislikeDatabase: LikeDislikeDataBase,
        private tokenManager: TokenManager
    ) { }

    public updateLikeDislike = async (input: UpdateLikeDislikeInputDTO): Promise<void> => {
        const {
            id,
            token,
            like
        } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new BadRequest("Post não encontrado")
        }

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            postDB.creator_name
        )

        const likeDislikeExist = await this.likeDislikeDatabase.verifyExistenceOfLikeDislike(postDB)

        const likeToSQLite = like ? 1 : 0

        const likeDislikeDB = {
            user_id: payload.id,
            post_id: id,
            like: likeToSQLite
        }

        if (likeDislikeExist === POST_LIKE.LIKED) {
            if (like) {
                await this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExist === POST_LIKE.DISLIKED) {
            if (!like) {
                await this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB)
                post.removeDislike()
            } else {
                await this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.likeDislikeDatabase.newLikeDislike(likeDislikeDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatedPost = post.postToDB()

        await this.postDatabase.editPost(updatedPost)
    }
}