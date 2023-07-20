"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLikeDislikeSchema = void 0;
const zod_1 = require("zod");
exports.UpdateLikeDislikeSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1),
    like: zod_1.z.boolean()
}).transform(data => data);
//# sourceMappingURL=updateLikeDislike.dto.js.map