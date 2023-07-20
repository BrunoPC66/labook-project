"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, content, likes, dislikes, createdAt, updatedAt, creatorId, creatorName) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
    }
    getId() {
        return this.id;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getLikes() {
        return this.likes;
    }
    addLike() {
        this.likes++;
    }
    removeLike() {
        this.likes--;
    }
    getDislikes() {
        return this.dislikes;
    }
    addDislike() {
        this.dislikes++;
    }
    removeDislike() {
        this.dislikes--;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getCreatorId() {
        return this.creatorId;
    }
    getCreatorName() {
        return this.creatorName;
    }
    postToDB() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    postToBusiness() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        };
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map