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
exports.Attendance = exports.AttendanceStatus = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Student_1 = require("./Student");
const Class_1 = require("./Class");
const AcademicPeriod_1 = require("./AcademicPeriod");
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "present";
    AttendanceStatus["ABSENT"] = "absent";
    AttendanceStatus["LATE"] = "late";
    AttendanceStatus["JUSTIFIED"] = "justified";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
let Attendance = class Attendance extends BaseEntity_1.CustomBaseEntity {
};
exports.Attendance = Attendance;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'integer', autoincrement: true }),
    __metadata("design:type", Object)
], Attendance.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Student_1.Student, { fieldName: 'student_id', nullable: false }),
    __metadata("design:type", Student_1.Student)
], Attendance.prototype, "student", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Class_1.Class, { fieldName: 'class_id', nullable: false }),
    __metadata("design:type", Class_1.Class)
], Attendance.prototype, "class", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => AcademicPeriod_1.AcademicPeriod, { fieldName: 'academic_period_id', nullable: false }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], Attendance.prototype, "academicPeriod", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'date', columnType: 'date', nullable: false }),
    __metadata("design:type", Date)
], Attendance.prototype, "date", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'status', nullable: false }),
    __metadata("design:type", String)
], Attendance.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'notes', nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
exports.Attendance = Attendance = __decorate([
    (0, core_1.Entity)(),
    (0, core_1.Unique)({ properties: ['student', 'class', 'date'] })
], Attendance);
//# sourceMappingURL=Attendance.js.map