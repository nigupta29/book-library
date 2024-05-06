import { Router } from "express"
import {
  createBook,
  deleteBook,
  getAllBooks
} from "../controllers/book.controller"

const route = Router()

route.route("/").get(getAllBooks).post(createBook).delete(deleteBook)

export default route
