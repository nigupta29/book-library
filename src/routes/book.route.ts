import { Router } from "express"
import {
  createBook,
  deleteBook,
  getAllBooks,
  saveBooks,
  updateBook
} from "../controllers/book.controller"

const route = Router()

route
  .route("/")
  .get(getAllBooks)
  .post(createBook)
  .patch(updateBook)
  .delete(deleteBook)
  .put(saveBooks)

export default route
