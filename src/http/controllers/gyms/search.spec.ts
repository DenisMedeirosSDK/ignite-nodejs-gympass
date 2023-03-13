import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gym by title', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-01',
        description: 'Gym-01',
        phone: '5555-555',
        latitude: -23.5585184,
        longitude: -46.6722788,
      })

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym-02',
        description: 'Gym-02',
        phone: '5555-555',
        latitude: -23.6085184,
        longitude: -46.7022788,
      })

    const response = await supertest(app.server)
      .get('/gyms/search')
      .query({
        q: '02',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Gym-02' }),
    ])
  })
})
