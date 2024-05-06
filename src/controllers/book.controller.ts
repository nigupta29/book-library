import { Request, Response } from "express"
import { getBookList } from "../utils/helper"

// added for testing api
const bookDB: string[] = [
  "1984",
  "A Christmas Carol",
  "Moby Dick",
  "The Hitchhiker’s Guide to the Galaxy",
  "The Lord of the Rings"
]

const getIndexIfBookPresent = (book: string) =>
  bookDB.findIndex((item) => item === book)

export const createBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const newBook = req.body.book.trim()

    if (getIndexIfBookPresent(newBook) !== -1) {
      res.status(400)
      throw new Error(`Book: '${newBook}' is already present in the library`)
    }

    bookDB.push(newBook)

    res.status(201).json({
      status: "success",
      message: `Book: '${newBook}' successfully added to the library`,
      data: bookDB
    })
  } catch (error) {
    res.json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error! Something went wrong!"
    })
  }
}

export const getAllBooks = (req: Request, res: Response) => {
  try {
    getBookList(bookDB, 0, ",", (bookList: string) => {
      res.status(200).json({ status: "success", data: { books: bookList } })
    })
  } catch (error) {
    res.json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error! Something went wrong!"
    })
  }
}

export const deleteBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const book = req.body.book.trim()

    const bookIndex = getIndexIfBookPresent(book)

    if (getIndexIfBookPresent(book) === -1) {
      res.status(404)
      throw new Error(`Book: '${book}' doesn't exist in the library`)
    }

    bookDB.splice(bookIndex, 1)

    res.status(204).json({})
  } catch (error) {
    res.json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error! Something went wrong!"
    })
  }
}

export const updateBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const originalBook = req.body.original_book.trim()
    const newBook = req.body.new_book.trim()

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
    res.json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error! Something went wrong!"
    })
  }
}

export const saveBooks = (req: Request, res: Response) => {
  try {
    const books = bookDB.map((item) => ({
      [item]: Math.random() * item.length
    }))

    res.status(200).json({
      status: "success",
      data: { books }
    })
  } catch (error) {
    res.json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error! Something went wrong!"
    })
  }
}
