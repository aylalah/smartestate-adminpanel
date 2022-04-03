"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrolmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_enrolment_dto_1 = require("./create-enrolment.dto");
class UpdateEnrolmentDto extends swagger_1.PartialType(create_enrolment_dto_1.CreateEnrolmentDto) {
}
exports.UpdateEnrolmentDto = UpdateEnrolmentDto;
//# sourceMappingURL=update-enrolment.dto.js.map