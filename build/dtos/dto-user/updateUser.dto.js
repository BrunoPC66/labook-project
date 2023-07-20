"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
const zod_1 = require("zod");
exports.UpdateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(3),
    password: zod_1.z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4),
    update: zod_1.z.object({
        newName: zod_1.z.string({ invalid_type_error: "'name' precisa ser no formato string" }).min(2).optional(),
        newEmail: zod_1.z.string({ invalid_type_error: "'email' precisa ser no formato string" }).email().min(3).optional(),
        newPassword: zod_1.z.string({ invalid_type_error: "'newPassword' precisa ser no formato string" }).min(4).optional()
    }).optional()
}).transform((data) => data);
//# sourceMappingURL=updateUser.dto.js.map