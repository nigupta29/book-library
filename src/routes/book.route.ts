import { Router } from "express"

const route = Router()

route.get("/", (_, res) => {
  res.json({ message: "test" })
})

route.post("/", )

export default route
