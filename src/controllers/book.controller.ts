import { NextFunction, Request, Response } from "express"
import { getBookList } from "../utils/helper"
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema
} from "../utils/schema"

const bookDB: string[] = []

const getIndexIfBookPresent = (book: string) =>
  bookDB.findIndex((item) => item === book)

/**
 * @desc    Create new books to the library
 * @route   POST /api/v1/books
 * @access  Public
 */
export const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book } = createBookSchema.parse(req.body)
    const newBook = book.toLowerCase()

    if (getIndexIfBookPresent(newBook) !== -1) {
      res.status(400)
      throw new Error(`Book: '${book}' is already present in the library`)
    }

    bookDB.push(newBook)

    res.status(201).json({
      status: "success",
      message: `Book: '${book}' successfully added to the library`
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get all the books present in the library
 * @route   GET /api/v1/books
 * @access  Public
 */
export const getAllBooks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    getBookList(bookDB, 0, ",", (bookList: string) => {
      res.status(200).json({ status: "success", data: { books: bookList } })
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Delete any existing book present in the library
 * @route   DELETE /api/v1/books
 * @access  Public
 */
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book } = deleteBookSchema.parse(req.body)

    const bookIndex = getIndexIfBookPresent(book)

    if (getIndexIfBookPresent(book) === -1) {
      res.status(404)
      throw new Error(`Book: '${book}' doesn't exist in the library`)
    }

    bookDB.splice(bookIndex, 1)

    res.status(204).json({})
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update the name of any existing book from the library
 * @route   PATCH /api/v1/books
 * @access  Public
 */
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { original_book: originalBook, new_book: newBook } =
      updateBookSchema.parse(req.body)

    const bookIndex = getIndexIfBookPresent(originalBook)

    if (getIndexIfBookPresent(originalBook) === -1) {
      res.status(404)
      throw new Error(`Book: '${originalBook}' doesn't exist in the library`)
    }

    bookDB[bookIndex] = newBook

    res.status(201).json({
      status: "success",
      message: `Book: '${originalBook}' successfully updated to '${newBook}' in the library`
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Mocking the process of saving the library data to the database.
 * @route   PUT /api/v1/books
 * @access  Public
 */
export const saveBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = bookDB.map((item) => ({
      [item]: Math.random() * item.length
    }))

    res.status(200).json({
      status: "success",
      data: { books }
    })
  } catch (error) {
    next(error)
  }
}
