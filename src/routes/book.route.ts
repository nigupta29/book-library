import { Router } from "express"
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook
} from "../controllers/book.controller"

const route = Router()

route
  .route("/")
  .get(getAllBooks)
  .post(createBook)
  .patch(updateBook)
  .delete(deleteBook)

export default route
