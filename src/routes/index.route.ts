import { Router } from "express"
import bookRoutes from "./book.route"

const route = Router()

route.use("/books", bookRoutes)

export default route
