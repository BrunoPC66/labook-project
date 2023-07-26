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
exports.PostBusiness = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const Post_1 = require("../models/Post");
const IdGenerator_1 = require("../services/IdGenerator");
class PostBusiness {
    constructor(postDatabase, tokenManager) {
        this.postDatabase = postDatabase;
        this.tokenManager = tokenManager;
        this.getPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { q, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest('Requisição não autorizada');
            }
            const postPlusCreatorName = yield this.postDatabase.findPostPlusCreatorName(q);
            const output = postPlusCreatorName.map((post) => new Post_1.Post(post.id, post.content, post.likes, post.dislikes, post.created_at, post.updated_at, post.creator_id, post.creator_name).postToBusiness());
            return output;
        });
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Requisição não autorizada");
            }
            const id = IdGenerator_1.IdGenerator.generator();
            const postDB = new Post_1.Post(id, content, 0, 0, new Date().toISOString(), new Date().toISOString(), payload.id, payload.name).postToDB();
            yield this.postDatabase.insertPost(postDB);
        });
        this.editPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, newContent, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest();
            }
            const postDB = yield this.postDatabase.findPostById(id);
            if (!postDB) {
                throw new BadRequest_1.BadRequest("Post não encontrado");
            }
            if (postDB.creator_id !== payload.id) {
                throw new BadRequest_1.BadRequest("Edição não permitida");
            }
            const post = new Post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, postDB.creator_name);
            if (newContent) {
                post.setContent(newContent);
            }
            const editedPost = post.postToDB();
            yield this.postDatabase.editPost(editedPost);
            const output = { content: post.getContent() };
            return output;
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest();
            }
            const postDB = yield this.postDatabase.findPostById(id);
            if (!postDB) {
                throw new BadRequest_1.BadRequest("Post não encontrado");
            }
            yield this.postDatabase.deletePost(id);
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map