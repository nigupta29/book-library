import { z } from "zod"

export const createBookSchema = z.object({
  book: z
    .string({ invalid_type_error: "Book title is required in string type" })
    .min(1, "Book title is required")
    .trim()
})

export const deleteBookSchema = z.object({
  book: z
    .string({ invalid_type_error: "Book title is required in string type" })
    .min(1, "Book title is required")
    .trim()
})

export const updateBookSchema = z.object({
  original_book: z
    .string({
      invalid_type_error: "Original book title is required in string type"
    })
    .min(1, "Original book title is required")
    .trim(),
  new_book: z
    .string({
      invalid_type_error: "New book title is required in string type"
    })
    .min(1, "New book title is required")
    .trim()
})
