"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPostSchema = void 0;
const zod_1 = require("zod");
exports.GetPostSchema = zod_1.z.object({
    q: zod_1.z.string().min(1).optional(),
    token: zod_1.z.string().min(1)
}).transform((data) => data);
//# sourceMappingURL=getPost.dto.js.map