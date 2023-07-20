"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const BaseError_1 = require("./BaseError");
class BadRequest extends BaseError_1.BaseError {
    constructor(message = "Requisição inválida") {
        super(400, message);
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=BadRequest.js.map