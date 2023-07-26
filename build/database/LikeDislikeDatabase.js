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
exports.LikeDislikeDataBase = void 0;
const LikeDislike_1 = require("../models/LikeDislike");
const BaseDatabase_1 = require("./BaseDatabase");
class LikeDislikeDataBase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.verifyExistenceOfLikeDislike = (user, post) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
                .where({
                user_id: user,
                post_id: post
            }).first();
            if (result) {
                if (result.like === 1) {
                    return LikeDislike_1.POST_LIKE.LIKED;
                }
                else if (result.like === 0) {
                    return LikeDislike_1.POST_LIKE.DISLIKED;
                }
            }
            return undefined;
        });
        this.newLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
                .insert(likeDislikeDB);
        });
        this.updateLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.removeLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(LikeDislikeDataBase.TABLE_LIKESDISLIKES)
                .del()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
    }
}
LikeDislikeDataBase.TABLE_LIKESDISLIKES = "likes_dislikes";
exports.LikeDislikeDataBase = LikeDislikeDataBase;
//# sourceMappingURL=LikeDislikeDatabase.js.map