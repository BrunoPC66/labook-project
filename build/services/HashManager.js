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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashManager = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class HashManager {
    constructor() {
        this.hash = (plaintext) => __awaiter(this, void 0, void 0, function* () {
            const rounds = Number(process.env.BCRYPT_COST);
            const salt = yield bcryptjs_1.default.genSalt(rounds);
            const hash = yield bcryptjs_1.default.hash(plaintext, salt);
            return hash;
        });
        this.compare = (plaintext, hash) => __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(plaintext, hash);
        });
    }
}
exports.HashManager = HashManager;
//# sourceMappingURL=HashManager.js.map