import { Migration } from '@mikro-orm/migrations';

export class Migration20260113153418 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "student" ("id" serial primary key, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "dni" varchar(255) null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "student" cascade;`);
  }

}
