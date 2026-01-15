import { Migration } from '@mikro-orm/migrations';

export class Migration20260115224135 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "class" ("id" serial primary key, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) null, "name" varchar(255) not null, "year" int null);`);

    this.addSql(`alter table "student" add column "class_id" int null;`);
    this.addSql(`alter table "student" add constraint "student_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "student" drop constraint "student_class_id_foreign";`);

    this.addSql(`drop table if exists "class" cascade;`);

    this.addSql(`alter table "student" drop column "class_id";`);
  }

}
