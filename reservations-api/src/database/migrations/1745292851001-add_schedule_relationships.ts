import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScheduleRelationships1745292851001 implements MigrationInterface {
    name = 'AddScheduleRelationships1745292851001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedule_block_type_enum" AS ENUM('Work', 'Break')`);
        await queryRunner.query(`CREATE TABLE "schedule_block" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "scheduleDayId" character varying NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "type" "public"."schedule_block_type_enum" NOT NULL DEFAULT 'Work', "dayId" uuid, CONSTRAINT "PK_b1b5c7e64a46080524a271f6575" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."schedule_day_day_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`CREATE TABLE "schedule_day" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "scheduleId" uuid NOT NULL, "day" "public"."schedule_day_day_enum" NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, CONSTRAINT "PK_a98a46ced73651332d6ce829335" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "closed_day" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "scheduleId" uuid NOT NULL, "reason" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_0f03e7166d86a110e3a914de4cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "businessId" uuid NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule_block" ADD CONSTRAINT "FK_7337901aa46b37d31dfabde6b7e" FOREIGN KEY ("dayId") REFERENCES "schedule_day"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_day" ADD CONSTRAINT "FK_78f1923682012b1f5f5fecdec02" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "closed_day" ADD CONSTRAINT "FK_04ca84c4c25d75c9c62f7d7a36e" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_c85ce6de727c64ef16ed4bf43cf" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c85ce6de727c64ef16ed4bf43cf"`);
        await queryRunner.query(`ALTER TABLE "closed_day" DROP CONSTRAINT "FK_04ca84c4c25d75c9c62f7d7a36e"`);
        await queryRunner.query(`ALTER TABLE "schedule_day" DROP CONSTRAINT "FK_78f1923682012b1f5f5fecdec02"`);
        await queryRunner.query(`ALTER TABLE "schedule_block" DROP CONSTRAINT "FK_7337901aa46b37d31dfabde6b7e"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "closed_day"`);
        await queryRunner.query(`DROP TABLE "schedule_day"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_day_day_enum"`);
        await queryRunner.query(`DROP TABLE "schedule_block"`);
        await queryRunner.query(`DROP TYPE "public"."schedule_block_type_enum"`);
    }

}
