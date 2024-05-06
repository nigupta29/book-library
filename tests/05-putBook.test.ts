import request from "supertest"
import app from "../src/app"
import { BOOKS_API_ROUTE, testBookData } from "./utils/constants"

describe(`PUT ${BOOKS_API_ROUTE}}`, () => {
  it(`should give all the books name with the time elapsed while saving on the DB`, async () => {
    
    testBookData.forEach(async (bookName) => {
      await request(app)
        .post(BOOKS_API_ROUTE)
        .send({ book: bookName })
        .expect(201)
    })

    const response = await request(app).put(BOOKS_API_ROUTE).expect(200)
    const expectedKeys = testBookData.sort()
    const actualKeys = Object.keys(response.body.data.books).sort()

    expect(response.body.status).toBe("success")
    expect(actualKeys).toEqual(expectedKeys)
  })
})
