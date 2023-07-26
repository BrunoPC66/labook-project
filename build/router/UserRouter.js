"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../database/UserDatabase");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
exports.usersRouter = express_1.default.Router();
const usersController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDatabase_1.UserDatabase(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.usersRouter.get("/", usersController.getUsers);
exports.usersRouter.post("/signup", usersController.signup);
exports.usersRouter.post("/login", usersController.login);
exports.usersRouter.put("/:id", usersController.updateUser);
exports.usersRouter.delete("/:id", usersController.deleteUser);
//# sourceMappingURL=UserRouter.js.map