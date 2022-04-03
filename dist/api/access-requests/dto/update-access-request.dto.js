"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_access_request_dto_1 = require("./create-access-request.dto");
class UpdateAccessRequestDto extends swagger_1.PartialType(create_access_request_dto_1.CreateAccessRequestDto) {
}
exports.UpdateAccessRequestDto = UpdateAccessRequestDto;
//# sourceMappingURL=update-access-request.dto.js.map