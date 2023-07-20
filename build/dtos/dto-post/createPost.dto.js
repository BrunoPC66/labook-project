"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostSchema = void 0;
const zod_1 = require("zod");
exports.CreatePostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(1000),
    token: zod_1.z.string().min(1)
}).transform(data => data);
//# sourceMappingURL=createPost.dto.js.map