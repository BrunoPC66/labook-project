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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    findUser(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (q) {
                return yield BaseDatabase_1.BaseDatabase
                    .connection(UserDatabase.TABLE_USERS)
                    .where("name", "LIKE", `%${q}%`);
            }
            else {
                return yield BaseDatabase_1.BaseDatabase
                    .connection(UserDatabase.TABLE_USERS);
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ id })
                .limit(1);
            return userDB;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userDB] = yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ email })
                .limit(1);
            return userDB;
        });
    }
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .insert(user);
        });
    }
    updateUser(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where({ id })
                .update(input);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .del()
                .where({ id });
        });
    }
}
UserDatabase.TABLE_USERS = "users";
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map