"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPostSchema = void 0;
const zod_1 = require("zod");
exports.EditPostSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    newContent: zod_1.z.string().min(1).max(1000).optional(),
    token: zod_1.z.string().min(1)
}).transform(data => data);
//# sourceMappingURL=updatePost.dto.js.map