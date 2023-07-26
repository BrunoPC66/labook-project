"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikeBusiness = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const LikeDislike_1 = require("../models/LikeDislike");
const Post_1 = require("../models/Post");
class LikeDislikeBusiness {
    constructor(postDatabase, likeDislikeDatabase, tokenManager) {
        this.postDatabase = postDatabase;
        this.likeDislikeDatabase = likeDislikeDatabase;
        this.tokenManager = tokenManager;
        this.updateLikeDislike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, like } = input;
            const payload = yield this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Faça o login para interagir nos posts");
            }
            const postDB = yield this.postDatabase.findPostById(id);
            if (!postDB) {
                throw new BadRequest_1.BadRequest("Post não encontrado");
            }
            if (postDB.creator_id === payload.id) {
                throw new BadRequest_1.BadRequest("Você não pode curtir ou discurtir o seu próprio post");
            }
            const post = new Post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, postDB.creator_name);
            const likeDislikeExist = yield this.likeDislikeDatabase.verifyExistenceOfLikeDislike(payload.id, id);
            const likeToSQLite = like ? 1 : 0;
            const likeDislikeDB = {
                user_id: payload.id,
                post_id: id,
                like: likeToSQLite
            };
            let message;
            if (likeDislikeExist) {
                if (likeDislikeExist === LikeDislike_1.POST_LIKE.LIKED) {
                    if (like) {
                        yield this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB);
                        post.removeLike();
                        message = "Você removeu seu like";
                    }
                    else {
                        yield this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB);
                        post.removeLike();
                        post.addDislike();
                        message = "Você deu like";
                    }
                }
                else if (likeDislikeExist === LikeDislike_1.POST_LIKE.DISLIKED) {
                    if (!like) {
                        yield this.likeDislikeDatabase.removeLikeDislike(likeDislikeDB);
                        post.removeDislike();
                        message = "Você removeu seu dislike";
                    }
                    else {
                        yield this.likeDislikeDatabase.updateLikeDislike(likeDislikeDB);
                        post.removeDislike();
                        post.addLike();
                        message = "Você deu dislike";
                    }
                }
            }
            else {
                yield this.likeDislikeDatabase.newLikeDislike(likeDislikeDB);
                const liked = () => {
                    post.addLike();
                    message = "Você deu like";
                };
                const disliked = () => {
                    post.addDislike();
                    message = "Você deu dislike";
                };
                like ? liked() : disliked();
            }
            const updatedPost = post.postToDB();
            yield this.postDatabase.editPost(updatedPost);
            const output = {
                message
            };
            return output;
        });
    }
}
exports.LikeDislikeBusiness = LikeDislikeBusiness;
//# sourceMappingURL=LikeDislikeBusiness.js.map