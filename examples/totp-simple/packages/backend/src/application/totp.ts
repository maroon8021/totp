import { getCustomRepository } from "typeorm"
import { TotpSecretKey } from "../domain/models"
import { TotpSecretKeyRepository, UserRepository } from "../domain/repositories"
import { authenticator } from "otplib"

const ISSUER = "321"

export class TotpApplicationService {
  static async createSecretKey(userId: string) {
    console.log("userId", userId)
    const user = await getCustomRepository(UserRepository).findOneOrFail({
      where: {
        id: userId,
      },
    })
    console.log("user", user)
    const totpSecretKey = await getCustomRepository(
      TotpSecretKeyRepository
    ).findOne({ user })

    if (totpSecretKey) {
      const otpauthUrl = authenticator.keyuri(
        user.name,
        ISSUER,
        totpSecretKey.key
      )
      return {
        secretKey: totpSecretKey.key,
        otpauthUrl,
      }
    }

    const secretKey = authenticator.generateSecret()

    const otpauthUrl = authenticator.keyuri(user.name, ISSUER, secretKey)

    await getCustomRepository(TotpSecretKeyRepository).save(
      new TotpSecretKey({
        key: secretKey,
        user,
        isRegistered: false,
      })
    )

    return {
      secretKey,
      otpauthUrl,
    }
  }

  static async verify(userId: string, token: string) {
    const user = await getCustomRepository(UserRepository).findOneOrFail({
      where: {
        id: userId,
      },
    })
    const totpSecretKey = await getCustomRepository(
      TotpSecretKeyRepository
    ).findOne({ user })

    if (!totpSecretKey) {
      throw new Error("シークレットキーが存在しません")
    }

    const isVerified = authenticator.checkDelta(token, totpSecretKey.key) === 0 //FIXME: なぜか `totp.verify` だと正常に動かなかったので、一旦これでチェックする。挙動には問題ない

    if (!isVerified) {
      throw new Error("認証コードが異なります")
    }
  }
}
