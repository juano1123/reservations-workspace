import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfessionalServicesJoinTable1747292851001 implements MigrationInterface {
    name = 'AddProfessionalServicesJoinTable1747292851001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professional_services" ("professionalId" uuid NOT NULL, "serviceId" uuid NOT NULL, CONSTRAINT "PK_professional_services" PRIMARY KEY ("professionalId", "serviceId"))`);
        await queryRunner.query(`ALTER TABLE "professional_services" ADD CONSTRAINT "FK_professional_services_professional" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_services" ADD CONSTRAINT "FK_professional_services_service" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional_services" DROP CONSTRAINT "FK_professional_services_service"`);
        await queryRunner.query(`ALTER TABLE "professional_services" DROP CONSTRAINT "FK_professional_services_professional"`);
        await queryRunner.query(`DROP TABLE "professional_services"`);
    }
}
