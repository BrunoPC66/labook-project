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
exports.UserBusiness = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const User_1 = require("../models/User");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
class UserBusiness {
    constructor(userDatabase, tokenManager, hashManager) {
        this.userDatabase = userDatabase;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.getUsers = (input) => __awaiter(this, void 0, void 0, function* () {
            const { q, token } = input;
            const userDB = yield this.userDatabase.findUser(q);
            if (!userDB) {
                throw new BadRequest_1.BadRequest("Usuario não encontrado");
            }
            const payload = yield this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequest_1.BadRequest("Token inválido");
            }
            const output = userDB.map((user) => {
                const eachUser = new User_1.User(user.id, user.name, user.email, user.password, user.role, user.created_at).userToBusiness();
                return eachUser;
            });
            return output;
        });
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, } = input;
            const hashedPassword = yield this.hashManager.hash(password);
            const id = IdGenerator_1.IdGenerator.generator();
            const idExist = yield this.userDatabase.findUserById(id);
            const emailExist = yield this.userDatabase.findUserByEmail(email);
            if (idExist) {
                throw new BadRequest_1.BadRequest("Erro incomum, por favor tente novamente");
            }
            if (emailExist) {
                throw new BadRequest_1.BadRequest("Email já cadastrado, faça o login ou cadastre um novo email");
            }
            const newUser = new User_1.User(id, name, email, hashedPassword, TokenManager_1.USER_ROLES.STANDARD, new Date().toISOString());
            const newUserDB = newUser.userToDB();
            yield this.userDatabase.insertUser(newUserDB);
            const payload = {
                id: newUser.getId(),
                name: newUser.getName(),
                role: TokenManager_1.USER_ROLES.STANDARD
            };
            const token = yield this.tokenManager.createToken(payload);
            const output = {
                message: "Conta criada com sucesso",
                token
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userDB = yield this.userDatabase.findUserByEmail(email);
            if (!userDB) {
                throw new BadRequest_1.BadRequest("Email ou senha incorreto");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, userDB.password);
            if (!isPasswordCorrect) {
                throw new BadRequest_1.BadRequest("Email ou senha incorreto");
            }
            const payload = {
                id: userDB.id,
                name: userDB.name,
                role: userDB.role
            };
            const token = yield this.tokenManager.createToken(payload);
            const output = {
                message: `Login efetuado com sucesso. Bem vindo(a) de volta, ${userDB.name}!`,
                token
            };
            return output;
        });
        this.updateUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, password, newName, newEmail, newPassword } = input;
            const payload = yield this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest();
            }
            const userDB = yield this.userDatabase.findUserById(id);
            if (!userDB) {
                throw new BadRequest_1.BadRequest("Usuario não encontrado");
            }
            if (userDB.id !== payload.id) {
                throw new BadRequest_1.BadRequest("Autorização inválida");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, userDB.password);
            if (!isPasswordCorrect) {
                throw new BadRequest_1.BadRequest("Senha incorreta");
            }
            const newHashedPassword = yield this.hashManager.hash(newPassword);
            const user = new User_1.User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.created_at);
            if (newName) {
                user.setName(newName);
            }
            if (newEmail) {
                user.setEmail(newEmail);
            }
            if (newPassword) {
                user.setPassword(newHashedPassword);
            }
            const updatedUser = user.userToDB();
            yield this.userDatabase.updateUser(userDB.id, updatedUser);
            const output = {
                message: "Dados atualizados com sucesso"
            };
            return output;
        });
        this.deleteUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, password } = input;
            const payload = yield this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest();
            }
            const userDB = yield this.userDatabase.findUserById(id);
            if (!userDB) {
                throw new BadRequest_1.BadRequest("Usuario não encontrado");
            }
            if (userDB.id !== payload.id) {
                throw new BadRequest_1.BadRequest("Autorização inválida");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, userDB.password);
            if (!isPasswordCorrect) {
                throw new BadRequest_1.BadRequest("Senha incorreta");
            }
            yield this.userDatabase.deleteUser(userDB.id);
            const output = {
                message: "Conta deletada com sucesso"
            };
            return output;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map