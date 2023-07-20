"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3),
    password: zod_1.z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4)
}).transform((data) => data);
//# sourceMappingURL=login.dto.js.map