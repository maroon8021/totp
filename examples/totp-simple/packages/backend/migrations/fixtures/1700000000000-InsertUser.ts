import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { User } from "../../src/domain/models"
import { user1 } from "./data/user"

export class InsertUser1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const entityManager = queryRunner.manager

    const userRepository = entityManager.getRepository(User)
    await userRepository.save(new User({ ...user1 }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const entityManager = queryRunner.manager
    const repository = entityManager.getRepository(User)
    await repository.clear()
  }
}
