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
exports.Class = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const Student_1 = require("./Student");
let Class = class Class extends BaseEntity_1.CustomBaseEntity {
    constructor() {
        super(...arguments);
        this.students = new core_1.Collection(this);
    }
};
exports.Class = Class;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'integer', autoincrement: true }),
    __metadata("design:type", Object)
], Class.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'name', nullable: false }),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ fieldName: 'year', nullable: true }),
    __metadata("design:type", Number)
], Class.prototype, "year", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Student_1.Student, (student) => student.class),
    __metadata("design:type", Object)
], Class.prototype, "students", void 0);
exports.Class = Class = __decorate([
    (0, core_1.Entity)()
], Class);
//# sourceMappingURL=Class.js.map