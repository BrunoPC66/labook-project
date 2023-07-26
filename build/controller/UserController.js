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
exports.UserController = void 0;
const BaseError_1 = require("../errors/BaseError");
const signup_dto_1 = require("../dtos/dto-user/signup.dto");
const login_dto_1 = require("../dtos/dto-user/login.dto");
const updateUser_dto_1 = require("../dtos/dto-user/updateUser.dto");
const deleteUser_dto_1 = require("../dtos/dto-user/deleteUser.dto");
const getUser_dto_1 = require("../dtos/dto-user/getUser.dto");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getUser_dto_1.GetUserSchema.parse({
                    q: req.query.q,
                    token: req.headers.authorization
                });
                const output = yield this.userBusiness.getUsers(input);
                res.status(200).send(output);
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
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = signup_dto_1.SignupSchema.parse({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                const output = yield this.userBusiness.signup(input);
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = login_dto_1.LoginSchema.parse({
                    email: req.body.email,
                    password: req.body.password,
                });
                const output = yield this.userBusiness.login(input);
                res.status(200).send(output);
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
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = updateUser_dto_1.UpdateUserSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization,
                    password: req.body.password,
                    newName: req.body.newName,
                    newEmail: req.body.newEmail,
                    newPassword: req.body.newPassword
                });
                const output = yield this.userBusiness.updateUser(input);
                res.status(200).send(output);
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
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deleteUser_dto_1.DeleteUserSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization,
                    password: req.body.password
                });
                const output = yield this.userBusiness.deleteUser(input);
                res.status(200).send(output);
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
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map