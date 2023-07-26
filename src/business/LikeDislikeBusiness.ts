import { LikeDislikeDataBase } from "../database/LikeDislikeDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UpdateLikeDislikeInputDTO, UpdateLikeDislikeOutputDTO } from "../dtos/dto-likedis/updateLikeDislike.dto";
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

    public updateLikeDislike = async (input: UpdateLikeDislikeInputDTO): Promise<UpdateLikeDislikeOutputDTO | undefined> => {
        const {
            id,
            token,
            like
        } = input

        const payload = await this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const postDB = await this.postDatabase.findPostById(id)

        if (!postDB) {
            throw new BadRequest("Post não encontrado")
        }

        if (postDB.creator_id === payload.id) {
            throw new BadRequest("Você não pode curtir ou discurtir o seu próprio post")
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

        const likeDislikeExist = await this.likeDislikeDatabase.verifyExistenceOfLikeDislike(payload.id , id)

        const likeToSQLite = like ? 1 : 0

        const likeDislikeDB = {
            user_id: payload.id,
            post_id: id,
            like: likeToSQLite
        }

        let message
        
        if(likeDislikeExist) {
            if (likeDislikeExist === POST_LIKE.LIKED) {
                if (like) {
                    await this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB)
                    post.removeLike()
                    message = "Você removeu seu like"
                } else {
                    await this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB)
                    post.removeLike()
                    post.addDislike()
                    message = "Você deu like"
                }
            } else if (likeDislikeExist === POST_LIKE.DISLIKED) {
                if (!like) {
                    await this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB)
                    post.removeDislike()
                    message = "Você removeu seu dislike"
                } else {
                    await this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB)
                    post.removeDislike()
                    post.addLike()
                    message = "Você deu dislike"
                }
            }
        }else {
            await this.likeDislikeDatabase.newLikeDislike(likeDislikeDB)

            const liked = () => {
                post.addLike()
                message = "Você deu like"
            }
            const disliked = () => {
                post.addDislike()
                message = "Você deu dislike"
            }

            like ? liked() : disliked()
        }

        const updatedPost = post.postToDB()

        await this.postDatabase.editPost(updatedPost)

        const output = {
            message
        }

        return output
    }
}