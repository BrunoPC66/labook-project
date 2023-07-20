"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "'name' precisa ser no formato string" }).min(2),
    email: zod_1.z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3),
    password: zod_1.z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4),
}).transform((data) => data);
//# sourceMappingURL=signup.dto.js.map