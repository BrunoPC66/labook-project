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
exports.PostController = void 0;
const BaseError_1 = require("../errors/BaseError");
const getPost_dto_1 = require("../dtos/dto-post/getPost.dto");
const createPost_dto_1 = require("../dtos/dto-post/createPost.dto");
const updatePost_dto_1 = require("../dtos/dto-post/updatePost.dto");
const deletePost_dto_1 = require("../dtos/dto-post/deletePost.dto");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getPost_dto_1.GetPostSchema.parse({
                    q: req.query.q,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.getPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = createPost_dto_1.CreatePostSchema.parse({
                    content: req.body.content,
                    token: req.headers.authorization
                });
                yield this.postBusiness.createPost(input);
                res.status(201).send("Post criado com sucesso!");
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = updatePost_dto_1.EditPostSchema.parse({
                    id: req.params.id,
                    newContent: req.body.newContent,
                    token: req.headers.authorization
                });
                const output = yield this.postBusiness.editPost(input);
                res.status(200).send(output);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deletePost_dto_1.DeletePostSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                yield this.postBusiness.deletePost(input);
                res.status(200).send("Post deletado com sucesso");
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map