"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePostSchema = void 0;
const zod_1 = require("zod");
exports.DeletePostSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1)
}).transform(data => data);
//# sourceMappingURL=deletePost.dto.js.map