import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBussinesAndSomeRelationships1725388248755
  implements MigrationInterface
{
  name = 'AddBussinesAndSomeRelationships1725388248755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(300) NOT NULL, "phone" character varying(300), "email" character varying(300), "ownerId" uuid NOT NULL, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "businessId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "business" ADD CONSTRAINT "FK_91230ea862c52e2aa78208c7bb8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_3eb29dbcdd36a9b99a0ec2c2caa" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_3eb29dbcdd36a9b99a0ec2c2caa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "business" DROP CONSTRAINT "FK_91230ea862c52e2aa78208c7bb8"`,
    );
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "businessId"`);
    await queryRunner.query(`DROP TABLE "business"`);
  }
}
