import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReservationEntity1746292851001 implements MigrationInterface {
    name = 'AddReservationEntity1746292851001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "professionalId" character varying NOT NULL, "serviceId" character varying NOT NULL, "clientId" character varying NOT NULL, "businessId" character varying NOT NULL, "date" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "status" "public"."reservation_status_enum" NOT NULL DEFAULT 'pending', "notes" character varying(500), CONSTRAINT "PK_reservation" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
    }
}
