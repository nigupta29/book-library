import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE } from "./utils/constants"

describe(`DELETE ${BOOKS_API_ROUTE}}`, () => {
  it("should delete an existing book", async () => {
    const newBook = "Book test for Delete"

    await request(app).post(BOOKS_API_ROUTE).send({ book: newBook }).expect(201)

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: newBook })
      .expect(204)

    expect(response.body).toMatchObject({})
  })

  it("should return 404 if the book doesn't exists", async () => {
    const bookTitle = "Book test for Delete"

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: bookTitle })
      .expect(404)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book: '${bookTitle}' doesn't exist in the library`
    )
  })
})
