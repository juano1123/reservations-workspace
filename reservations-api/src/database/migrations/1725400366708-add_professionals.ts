import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfessionals1725400366708 implements MigrationInterface {
  name = 'AddProfessionals1725400366708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "businessId" uuid NOT NULL, CONSTRAINT "REL_d3d3f94c80dd7418b6820360d4" UNIQUE ("userId"), CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "professional" ADD CONSTRAINT "FK_d3d3f94c80dd7418b6820360d48" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "professional" ADD CONSTRAINT "FK_eedc567ec8a641340d72c111def" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "professional" DROP CONSTRAINT "FK_eedc567ec8a641340d72c111def"`,
    );
    await queryRunner.query(
      `ALTER TABLE "professional" DROP CONSTRAINT "FK_d3d3f94c80dd7418b6820360d48"`,
    );
    await queryRunner.query(`DROP TABLE "professional"`);
  }
}
