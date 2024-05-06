import { NextFunction, Request, Response } from "express"
import { BOOKS_SEPERATOR } from "../utils/constants"
import { getBookList } from "../utils/helper"
import {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema
} from "../utils/schema"

const bookDB: string[] = []

const getIndexIfBookPresent = (book: string) =>
  bookDB.findIndex((item) => item.toLowerCase() === book.toLowerCase())

/**
 * @desc    Create new books to the library
 * @route   POST /api/v1/books
 * @access  Public
 */
export const createBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book: bookName } = createBookSchema.parse(req.body)

    if (getIndexIfBookPresent(bookName) !== -1) {
      res.status(400)
      throw new Error(`Book: '${bookName}' is already present in the library`)
    }

    bookDB.push(bookName)

    res.status(201).json({
      status: "success",
      message: `Book: '${bookName}' successfully added to the library`
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
    getBookList(bookDB, 0, BOOKS_SEPERATOR, (bookList: string) => {
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
    const { book: bookName } = deleteBookSchema.parse(req.body)

    const bookIndex = getIndexIfBookPresent(bookName)

    if (bookIndex === -1) {
      res.status(404)
      throw new Error(`Book: '${bookName}' doesn't exist in the library`)
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
    const { original_book: originalBookName, new_book: newBookName } =
      updateBookSchema.parse(req.body)

    const originalBookIndex = getIndexIfBookPresent(originalBookName)
    if (originalBookIndex === -1) {
      res.status(404)
      throw new Error(
        `Book: '${originalBookName}' doesn't exist in the library`
      )
    }

    const newBookNameIndex = getIndexIfBookPresent(newBookName)

    if (newBookNameIndex !== -1) {
      res.status(400)
      throw new Error(
        `Can't update Book: '${originalBookName}' to name: '${newBookName}', as the '${newBookName}' already exist in the library`
      )
    }

    bookDB[originalBookIndex] = newBookName

    res.status(201).json({
      status: "success",
      message: `Book: '${originalBookName}' successfully updated to '${newBookName}' in the library`
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
