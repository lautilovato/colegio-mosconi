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
exports.Student = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
let Student = class Student extends BaseEntity_1.CustomBaseEntity {
};
exports.Student = Student;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'integer', autoincrement: true }),
    __metadata("design:type", Object)
], Student.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'first_name', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'last_name', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'dni', nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "dni", void 0);
exports.Student = Student = __decorate([
    (0, core_1.Entity)()
], Student);
//# sourceMappingURL=Student.js.map