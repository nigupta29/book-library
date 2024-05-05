import { Router } from "express"
import { createBook, getAllBooks } from "../controllers/book.controller"

const route = Router()

route.route("/").get(getAllBooks).post(createBook)

export default route
