"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSchema = void 0;
const zod_1 = require("zod");
exports.GetUserSchema = zod_1.z.object({
    q: zod_1.z.string().min(1).optional(),
    token: zod_1.z.string().min(1)
}).transform((data) => data);
//# sourceMappingURL=getUser.dto.js.map