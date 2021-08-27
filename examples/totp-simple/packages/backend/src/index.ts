import express from "express"
import cors from "cors"
import { totpRouter } from "./interfaces"
import { connect } from "./utils/typeorm"

const app = express()

app.use("/totp", totpRouter)
app.use(cors())

app.listen(8080, async () => {
  await connect()
  console.log("Start on port 8080")
})
