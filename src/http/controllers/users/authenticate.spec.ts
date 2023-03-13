import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await supertest(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john_doe@example.com',
      password: '123456',
    })
    const response = await supertest(app.server).post('/sessions').send({
      email: 'john_doe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
