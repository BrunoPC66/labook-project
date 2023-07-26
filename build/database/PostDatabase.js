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
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    findPostPlusCreatorName(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (q) {
                return yield BaseDatabase_1.BaseDatabase
                    .connection(PostDatabase.TABLE_POSTS)
                    .select(`${PostDatabase.TABLE_POSTS}.id`, `${PostDatabase.TABLE_POSTS}.creator_id`, `${PostDatabase.TABLE_POSTS}.content`, `${PostDatabase.TABLE_POSTS}.likes`, `${PostDatabase.TABLE_POSTS}.dislikes`, `${PostDatabase.TABLE_POSTS}.created_at`, `${PostDatabase.TABLE_POSTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_USERS}.name as creator_name`)
                    .join(`${UserDatabase_1.UserDatabase.TABLE_USERS}`, `${PostDatabase.TABLE_POSTS}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USERS}.id`).where(`${UserDatabase_1.UserDatabase.TABLE_USERS}.name`, "LIKE", `%${q}%`);
            }
            else {
                return yield BaseDatabase_1.BaseDatabase
                    .connection(PostDatabase.TABLE_POSTS)
                    .select(`${PostDatabase.TABLE_POSTS}.id`, `${PostDatabase.TABLE_POSTS}.creator_id`, `${PostDatabase.TABLE_POSTS}.content`, `${PostDatabase.TABLE_POSTS}.likes`, `${PostDatabase.TABLE_POSTS}.dislikes`, `${PostDatabase.TABLE_POSTS}.created_at`, `${PostDatabase.TABLE_POSTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_USERS}.name as creator_name`)
                    .join(`${UserDatabase_1.UserDatabase.TABLE_USERS}`, `${PostDatabase.TABLE_POSTS}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USERS}.id`);
            }
        });
    }
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select(`${PostDatabase.TABLE_POSTS}.id`, `${PostDatabase.TABLE_POSTS}.creator_id`, `${PostDatabase.TABLE_POSTS}.content`, `${PostDatabase.TABLE_POSTS}.likes`, `${PostDatabase.TABLE_POSTS}.dislikes`, `${PostDatabase.TABLE_POSTS}.created_at`, `${PostDatabase.TABLE_POSTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_USERS}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_USERS}`, `${PostDatabase.TABLE_POSTS}.creator_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USERS}.id`)
                .where(`${PostDatabase.TABLE_POSTS}.id`, "=", id)
                .limit(1);
            if (result) {
                return result;
            }
            else {
                return undefined;
            }
        });
    }
    insertPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .insert(post);
        });
    }
    editPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where({ id: input.id })
                .update(input);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .del()
                .where({ id });
        });
    }
}
PostDatabase.TABLE_POSTS = "posts";
exports.PostDatabase = PostDatabase;
//# sourceMappingURL=PostDatabase.js.map