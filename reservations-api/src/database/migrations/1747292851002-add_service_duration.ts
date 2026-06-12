import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceDuration1747292851002 implements MigrationInterface {
    name = 'AddServiceDuration1747292851002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "duration" integer NOT NULL DEFAULT 60`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "duration"`);
    }
}
