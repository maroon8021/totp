import axios from "axios"
import { toDataURL } from "qrcode"

const main = () => {
  const qrcode = document.getElementById("qrcode")
  const input = document.getElementById("code") as HTMLInputElement
  const submitButton = document.getElementById("submit")
  const result = document.getElementById("result")

  axios
    .post<{ otpauthUrl: string }>("http://localhost:58000/totp/secret-key/")
    .then(async (result) => {
      const { otpauthUrl } = result.data
      await toDataURL(qrcode, otpauthUrl)
    })
    .catch((error) => {
      console.log(error)
    })

  submitButton.addEventListener("click", async () => {
    const { value } = input
    if (!value) {
      return
    }

    try {
      await axios.post<{ otpauthUrl: string }>(
        "http://localhost:58000/totp/secret-key/verify",
        {
          token: value,
        }
      )
      result.innerText = "correct!"
    } catch (error) {
      console.log(error)
      result.innerText = "wrong!"
    }
  })
}

main()
