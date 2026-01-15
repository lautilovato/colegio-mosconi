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
exports.BaseMikroOrmRepository = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
let BaseMikroOrmRepository = class BaseMikroOrmRepository extends postgresql_1.EntityRepository {
    constructor(em, entityClass) {
        super(em, entityClass);
        this.em = em;
    }
    async save(entity) {
        await this.em.persistAndFlush(entity);
    }
    async removeAndFlush(entity) {
        await this.em.removeAndFlush(entity);
    }
    async flush() {
        await this.em.flush();
    }
    async persist(entity) {
        this.em.persist(entity);
    }
    async remove(entity) {
        this.em.remove(entity);
    }
};
exports.BaseMikroOrmRepository = BaseMikroOrmRepository;
exports.BaseMikroOrmRepository = BaseMikroOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, Object])
], BaseMikroOrmRepository);
//# sourceMappingURL=base.repository.js.map