"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260113153418 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20260113153418 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "student" ("id" serial primary key, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "dni" varchar(255) null);`);
    }
    async down() {
        this.addSql(`drop table if exists "student" cascade;`);
    }
}
exports.Migration20260113153418 = Migration20260113153418;
//# sourceMappingURL=Migration20260113153418.js.map