import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE } from "./utils/constants"

const testBookName = "Sapiens"
const existingBookName = "Dune"

describe(`POST ${BOOKS_API_ROUTE}}`, () => {
  it(`should create a new book: ${testBookName}`, async () => {
    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testBookName })
      .expect(201)

    expect(response.body.status).toBe("success")
    expect(response.body.message).toContain(
      `Book: '${testBookName}' successfully added to the library`
    )
  })

  it("should return an error if the book already exists", async () => {
    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: existingBookName })
      .expect(201)

    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: existingBookName })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book: '${existingBookName}' is already present in the library`
    )
  })

  it("should return an error if the book is present and provided in lowercase", async () => {
    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testBookName.toLowerCase() })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book: '${testBookName.toLowerCase()}' is already present in the library`
    )
  })

  it("should return an error if the book title is given as an empty string", async () => {
    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: "" })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(`Book title is required`)
  })

  it("should return an error if the book title is not of string type", async () => {
    const response = await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: 1984 })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Book title is required in string type`
    )
  })
})
