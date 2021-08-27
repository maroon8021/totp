import express, { Request } from "express"
import cors from "cors"
import { connect } from "./utils/typeorm"
import { TotpApplicationService } from "./application"

const app = express()

app.use(express.json())
//app.use("/totp", totpRouter)
app.use(cors())

app.get("/hoge", (_, res) => {
  res.send("hello")
})

app.post("/totp/secret-key", async (_, res) => {
  const secrets = await TotpApplicationService.createSecretKey(
    "00000000-0000-0000-0000-000000000001"
  )
  res.send(secrets)
})

app.post(
  "/totp/secret-key/verify",
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

app.listen(8080, async () => {
  await connect()
  console.log("Start on port 8080")
})
