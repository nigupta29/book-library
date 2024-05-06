import { config } from "dotenv"
import express from "express"
import indexRoutes from "./routes/index.route"

// loading environment variables.
config()

// intializing the express instance
const app = express()

// --- MIDDLEWARES ---
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// implementing api versioning
app.use("/api/v1", indexRoutes)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Application running at port: ${port}`)
})

export default app