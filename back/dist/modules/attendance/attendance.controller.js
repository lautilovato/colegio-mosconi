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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
const takeClassAttendance_dto_1 = require("./dto/takeClassAttendance.dto");
const updateAttendance_dto_1 = require("./dto/updateAttendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async takeClassAttendance(classId, dto) {
        return this.attendanceService.takeClassAttendance(classId, dto);
    }
    async getClassAttendanceByDate(classId, date) {
        return this.attendanceService.getClassAttendanceByDate(classId, date);
    }
    async getStudentAttendanceHistory(studentId) {
        return this.attendanceService.getStudentAttendanceHistory(studentId);
    }
    async updateAttendance(id, dto) {
        return this.attendanceService.updateAttendance(id, dto);
    }
    async getClassAttendanceReport(classId, startDate, endDate) {
        return this.attendanceService.getClassAttendanceReport(classId, startDate, endDate);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)('class/:classId/take'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, takeClassAttendance_dto_1.TakeClassAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "takeClassAttendance", null);
__decorate([
    (0, common_1.Get)('class/:classId/date/:date'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getClassAttendanceByDate", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStudentAttendanceHistory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateAttendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "updateAttendance", null);
__decorate([
    (0, common_1.Get)('class/:classId/report'),
    __param(0, (0, common_1.Param)('classId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getClassAttendanceReport", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map