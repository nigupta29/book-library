import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE } from "./utils/constants"

describe(`DELETE ${BOOKS_API_ROUTE}}`, () => {
  it("should delete an existing book", async () => {
    const testBookName = "The Lord of the Rings"

    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(201)

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(204)

    expect(response.body).toMatchObject({})
  })

  it("should return error if the book doesn't exists", async () => {
    const testBookName = "Book test for Delete"

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(404)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book: '${testBookName}' doesn't exist in the library`
    )
  })

  it("should return error if the book title is empty string", async () => {
    const testBookName = ""

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(`Book title is required`)
  })

  it("should return error if the invalid book title is provided", async () => {
    const testBookName = false

    const response = await request(app)
      .delete(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book title is required in string type`
    )
  })
})
