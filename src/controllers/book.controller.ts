import { Request, Response } from "express"

const bookDB: string[] = []

const checkIfBookPresent = (book: string) =>
  bookDB.findIndex((item) => item === book)

export const createBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const newBook = req.body.book.trim()

    if (checkIfBookPresent(newBook) !== -1) {
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
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }
}

export const getAllBooks = (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: bookDB })
  } catch (error) {
    //TODO: handle in global errors
    console.error(error)
  }
}

export const deleteBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const book = req.body.book.trim()

    const bookIndex = checkIfBookPresent(book)

    if (checkIfBookPresent(book) === -1) {
      res.status(404)
      throw new Error(`Book: '${book}' doesn't exist in the library`)
    }

    bookDB.splice(bookIndex, 1)

    res.status(204).json({
      status: "success",
      message: `Book: '${book}' successfully deleted from the library`
    })
  } catch (error) {
    res.json({
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }
}

export const updateBook = (req: Request, res: Response) => {
  try {
    // TODO: string validation
    const originalBook = req.body.original_book.trim()
    const newBook = req.body.new_book.trim()

    const bookIndex = checkIfBookPresent(originalBook)

    if (checkIfBookPresent(originalBook) === -1) {
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
      message: error instanceof Error ? error.message : "Something went wrong"
    })
  }
}
