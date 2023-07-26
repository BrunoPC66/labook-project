"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserSchema = void 0;
const zod_1 = require("zod");
exports.DeleteUserSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1),
    password: zod_1.z.string({ invalid_type_error: "'password' precisa ser no formato string" }).min(4)
}).transform((data) => data);
//# sourceMappingURL=deleteUser.dto.js.map