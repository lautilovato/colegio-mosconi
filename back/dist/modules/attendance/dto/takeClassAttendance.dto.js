"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeClassAttendanceDto = exports.AttendanceRecordDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AttendanceRecordDto {
}
exports.AttendanceRecordDto = AttendanceRecordDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AttendanceRecordDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['present', 'absent', 'late', 'justified']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttendanceRecordDto.prototype, "status", void 0);
class TakeClassAttendanceDto {
}
exports.TakeClassAttendanceDto = TakeClassAttendanceDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TakeClassAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AttendanceRecordDto),
    __metadata("design:type", Array)
], TakeClassAttendanceDto.prototype, "attendances", void 0);
//# sourceMappingURL=takeClassAttendance.dto.js.map