import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-01',
        description: 'Gym-01',
        phone: '5555-555',
        latitude: -23.5585184,
        longitude: -46.6722788,
      })

    expect(response.statusCode).toEqual(201)
  })
})
