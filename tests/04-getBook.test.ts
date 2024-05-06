import request from "supertest"
import app from "../src/app"
import { BOOKS_SEPERATOR } from "../src/utils/constants"
import { BOOKS_API_ROUTE, testBookData } from "./utils/constants"



describe(`GET ${BOOKS_API_ROUTE}}`, () => {
  it(`should give all the books name in string with ${BOOKS_SEPERATOR} seperator`, async () => {
    testBookData.forEach(async (bookName) => {
      await request(app)
        .post(BOOKS_API_ROUTE)
        .send({ book: bookName })
        .expect(201)
    })

    const response = await request(app).get(BOOKS_API_ROUTE).expect(200)
    const expectedString = testBookData.join(BOOKS_SEPERATOR)

    expect(response.body.status).toBe("success")
    expect(response.body.data.books).toEqual(expectedString)
  })

  it(`should give empty string when no books are present`, async () => {
    testBookData.forEach(async (bookName) => {
      await request(app)
        .delete(BOOKS_API_ROUTE)
        .send({ book: bookName })
        .expect(204)
    })

    const response = await request(app).get(BOOKS_API_ROUTE).expect(200)

    expect(response.body.status).toBe("success")
    expect(response.body.data.books).toEqual("")
  })
})
