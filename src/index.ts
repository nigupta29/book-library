import { config } from "dotenv"
import express from "express"
// loading environment variables.
config()

// intializing the express instance
const app = express()

app.get("/", (_, res) => {
  res.json({ message: "test" })
})

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Application running at port: ${port}`)
})
