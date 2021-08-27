import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTotpSecretKey1500000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "totp_secret_key",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "key",
            type: "varchar",
            length: "32",
          },
          {
            name: "is_registered",
            type: "boolean",
            default: false,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamptz",
            default: "NOW()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("totp_secret_key")
  }
}
