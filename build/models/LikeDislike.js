"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislike = exports.POST_LIKE = void 0;
var POST_LIKE;
(function (POST_LIKE) {
    POST_LIKE["LIKED"] = "LIKED";
    POST_LIKE["DISLIKED"] = "DISLIKED";
})(POST_LIKE = exports.POST_LIKE || (exports.POST_LIKE = {}));
class LikeDislike {
    constructor(userId, postId, like) {
        this.userId = userId;
        this.postId = postId;
        this.like = like;
    }
}
exports.LikeDislike = LikeDislike;
//# sourceMappingURL=LikeDislike.js.map