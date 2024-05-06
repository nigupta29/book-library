import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE } from "./utils/constants"

describe(`UPDATE ${BOOKS_API_ROUTE}}`, () => {
  it("should update an existing book", async () => {
    const testOriginalBookName = "The Lord of the"
    const testNewBookName = "The Lord of the Rings"

    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testOriginalBookName })
      .expect(201)

    const response = await request(app)
      .patch(BOOKS_API_ROUTE)
      .send({ original_book: testOriginalBookName, new_book: testNewBookName })
      .expect(201)

    expect(response.body.status).toBe("success")
    expect(response.body.message).toContain(
      `Book: '${testOriginalBookName}' successfully updated to '${testNewBookName}' in the library`
    )
  })

  it("should not update an existing book if new book name already exists in the library", async () => {
    const testOriginalBookName1 = "The Laws of the"
    const testNewBookName = "The Laws of Human Nature"
    const testOriginalBookName2 = "The Laws of Human Nature"

    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testOriginalBookName1 })
      .expect(201)

    await request(app)
      .post(BOOKS_API_ROUTE)
      .send({ book: testOriginalBookName2 })
      .expect(201)

    const response = await request(app)
      .patch(BOOKS_API_ROUTE)
      .send({ original_book: testOriginalBookName1, new_book: testNewBookName })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(
      `Can't update Book: '${testOriginalBookName1}' to name: '${testNewBookName}', as the '${testNewBookName}' already exist in the library`
    )
  })

  it("should not update an existing book if parameters aren't provided", async () => {
    const response = await request(app)
      .patch(BOOKS_API_ROUTE)
      .send()
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(`Original book title is required`)
    expect(response.body.message).toContain(`New book title is required`)
  })

  it("should not update an existing book if parameters are of invalid type", async () => {
    const response = await request(app)
      .patch(BOOKS_API_ROUTE)
      .send({ original_book: 1984, new_book: 1984 })
      .expect(400)

    expect(response.body.status).toBe("error")
    expect(response.body.message).toContain(`Original book title is required`)
    expect(response.body.message).toContain(`New book title is required`)
  })
})
