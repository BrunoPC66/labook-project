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
exports.LikeDislikeController = void 0;
const BaseError_1 = require("../errors/BaseError");
const updateLikeDislike_dto_1 = require("../dtos/dto-likedis/updateLikeDislike.dto");
class LikeDislikeController {
    constructor(likeDislikeBusiness) {
        this.likeDislikeBusiness = likeDislikeBusiness;
        this.updateLikeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = updateLikeDislike_dto_1.UpdateLikeDislikeSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization,
                    like: req.body.like
                });
                const output = yield this.likeDislikeBusiness.updateLikeDislike(input);
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
    }
}
exports.LikeDislikeController = LikeDislikeController;
//# sourceMappingURL=LikeDislikeController.js.map