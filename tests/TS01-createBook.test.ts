import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE } from "./utils/constants"

describe(`POST ${BOOKS_API_ROUTE}}`, () => {
  it("should create a new book", async () => {
    const newBook = "New Book"

    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: newBook })
      .expect(201)

    expect(response.body.status).toBe("success")
    expect(response.body.message).toContain(
      `Book: '${newBook}' successfully added to the library`
    )
  })

  it("should return 400 if the book already exists", async () => {
    const existingBook = "Existing Book"

    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: existingBook })
      .expect(201)

    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: existingBook })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book: '${existingBook}' is already present in the library`
    )
  })
})
