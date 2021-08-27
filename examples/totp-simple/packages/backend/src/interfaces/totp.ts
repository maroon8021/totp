import express, { Request } from "express"
import { TotpApplicationService } from "../application"

const router = express.Router()

router.post("/secret-key", async (req, res) => {
  try {
    const secrets = await TotpApplicationService.createSecretKey(
      "00000000-0000-0000-0000-000000000001"
    )
    console.log(secrets)
    return res.status(200).json(secrets)
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: "internal server error" })
  }
})

router.post(
  "/secret-key/verify",
  async (req: Request<{}, {}, { token: string }>, res) => {
    try {
      const { token } = req.body
      await TotpApplicationService.verify(
        "00000000-0000-0000-0000-000000000001",
        token
      )
      res.send()
    } catch (error) {
      res.status(401).send({ message: "internal server error" })
    }
  }
)

export { router }
