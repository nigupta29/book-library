import { config } from "dotenv"
import express from "express"
import { errorHandler, notFound } from "./middlewares/error.middleware"
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

// Global Error Handlers
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Application running at port: ${port}`)
})

export default app
