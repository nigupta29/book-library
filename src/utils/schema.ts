import { z } from "zod"

export const createBookSchema = z.object({
  book: z
    .string({ required_error: "Book title is required" })
    .min(1, "Minimum 1 character is for the Book title")
    .trim()
    .toLowerCase()
})

export const deleteBookSchema = z.object({
  book: z
    .string({ required_error: "Book title is required" })
    .min(1, "Minimum 1 character is for the Book title")
    .trim()
    .toLowerCase()
})

export const updateBookSchema = z.object({
  original_book: z
    .string({ required_error: "Original book title is required" })
    .min(1, "Minimum 1 character is for the Book title")
    .trim()
    .toLowerCase(),
  new_book: z
    .string({ required_error: "Book title is required" })
    .min(1, "Minimum 1 character is for the Book title")
    .trim()
    .toLowerCase()
})