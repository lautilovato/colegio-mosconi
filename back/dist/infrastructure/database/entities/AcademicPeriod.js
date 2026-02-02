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
exports.AcademicPeriod = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Class_1 = require("./Class");
const Attendance_1 = require("./Attendance");
let AcademicPeriod = class AcademicPeriod extends BaseEntity_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.isActive = false;
        this.attendances = new core_1.Collection(this);
    }
};
exports.AcademicPeriod = AcademicPeriod;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'integer', autoincrement: true }),
    __metadata("design:type", Object)
], AcademicPeriod.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'name', nullable: false }),
    __metadata("design:type", String)
], AcademicPeriod.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'start_date', columnType: 'date', nullable: false }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'end_date', columnType: 'date', nullable: false }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "endDate", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'year', nullable: false }),
    __metadata("design:type", Number)
], AcademicPeriod.prototype, "year", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'is_active', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AcademicPeriod.prototype, "isActive", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Class_1.Class, { fieldName: 'class_id', nullable: false }),
    __metadata("design:type", Class_1.Class)
], AcademicPeriod.prototype, "class", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Attendance_1.Attendance, (attendance) => attendance.academicPeriod),
    __metadata("design:type", Object)
], AcademicPeriod.prototype, "attendances", void 0);
exports.AcademicPeriod = AcademicPeriod = __decorate([
    (0, core_1.Entity)()
], AcademicPeriod);
//# sourceMappingURL=AcademicPeriod.js.map