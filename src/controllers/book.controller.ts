import { Request, Response } from "express"

const bookDB: string[] = []

const checkIfBookPresent = (book: string) =>
  bookDB.some((item) => item === book)

export const createBook = (req: Request, res: Response) => {
  try {
    const newBook = req.body.book.trim()

    if (checkIfBookPresent(newBook)) {
      res.status(401)
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
