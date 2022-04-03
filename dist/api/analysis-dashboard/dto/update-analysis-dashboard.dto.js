"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnalysisDashboardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_analysis_dashboard_dto_1 = require("./create-analysis-dashboard.dto");
class UpdateAnalysisDashboardDto extends swagger_1.PartialType(create_analysis_dashboard_dto_1.CreateAnalysisDashboardDto) {
}
exports.UpdateAnalysisDashboardDto = UpdateAnalysisDashboardDto;
//# sourceMappingURL=update-analysis-dashboard.dto.js.map