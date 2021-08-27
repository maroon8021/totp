import { EntityRepository, Repository } from "typeorm"
import { TotpSecretKey } from "../models"

/**
 * Todoのリポジトリ
 *
 * @see https://typeorm.io/#/custom-repository
 */
@EntityRepository(TotpSecretKey)
export class TotpSecretKeyRepository extends Repository<TotpSecretKey> {
  // --- このモデル固有で必要なメソッドがあれば追加してください ---
}
