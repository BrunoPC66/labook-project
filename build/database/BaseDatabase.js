"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = require("knex");
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const paths = [
    path_1.default.resolve(__dirname, "../../dotenv.env"),
    path_1.default.resolve(__dirname, "../../dotenv.env.example"),
];
paths.find((validEnvPath) => !(0, dotenv_1.config)({ path: validEnvPath }).error);
class BaseDatabase {
}
BaseDatabase.connection = (0, knex_1.knex)({
    client: "sqlite3",
    connection: {
        filename: process.env.DB_FILE_PATH,
    },
    useNullAsDefault: true,
    pool: {
        min: 0,
        max: 1,
        afterCreate: (conn, cb) => {
            conn.run("PRAGMA foreign_keys = ON", cb);
        },
    },
});
exports.BaseDatabase = BaseDatabase;
//# sourceMappingURL=BaseDatabase.js.map