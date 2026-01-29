"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260129002019 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20260129002019 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table "academic_period" ("id" serial primary key, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) null, "name" varchar(255) not null, "start_date" date not null, "end_date" date not null, "year" int not null, "is_active" boolean not null default false, "class_id" int not null);`);
        this.addSql(`alter table "academic_period" add constraint "academic_period_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;`);
        this.addSql(`alter table "class" add column "section" varchar(255) null;`);
        this.addSql(`alter table "class" alter column "year" type int using ("year"::int);`);
        this.addSql(`alter table "class" alter column "year" set not null;`);
        this.addSql(`alter table "attendance" add column "academic_period_id" int not null, add column "notes" varchar(255) null;`);
        this.addSql(`alter table "attendance" alter column "status" type varchar(255) using ("status"::varchar(255));`);
        this.addSql(`alter table "attendance" add constraint "attendance_academic_period_id_foreign" foreign key ("academic_period_id") references "academic_period" ("id") on update cascade;`);
    }
    async down() {
        this.addSql(`alter table "attendance" drop constraint "attendance_academic_period_id_foreign";`);
        this.addSql(`drop table if exists "academic_period" cascade;`);
        this.addSql(`alter table "class" drop column "section";`);
        this.addSql(`alter table "class" alter column "year" type int using ("year"::int);`);
        this.addSql(`alter table "class" alter column "year" drop not null;`);
        this.addSql(`alter table "attendance" drop column "academic_period_id", drop column "notes";`);
        this.addSql(`alter table "attendance" alter column "status" type varchar(20) using ("status"::varchar(20));`);
    }
}
exports.Migration20260129002019 = Migration20260129002019;
//# sourceMappingURL=Migration20260129002019.js.map