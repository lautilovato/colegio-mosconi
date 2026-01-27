import { Migration } from '@mikro-orm/migrations';

export class Migration20260127161516 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "attendance" ("id" serial primary key, "created_at" timestamp(6) not null default now(), "updated_at" timestamp(6) null, "student_id" int not null, "class_id" int not null, "date" date not null, "status" varchar(20) not null);`);
    this.addSql(`alter table "attendance" add constraint "attendance_student_id_class_id_date_unique" unique ("student_id", "class_id", "date");`);

    this.addSql(`alter table "attendance" add constraint "attendance_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade;`);
    this.addSql(`alter table "attendance" add constraint "attendance_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "attendance" cascade;`);
  }

}
