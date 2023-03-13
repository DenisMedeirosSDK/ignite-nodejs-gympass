import { app } from '@/app'
import { prisma } from '@/lib/prima'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym-01',
        description: 'Gym-01',
        phone: '5555-555',
        latitude: -23.5585184,
        longitude: -46.6722788,
      },
    })

    const response = await supertest(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5585184,
        longitude: -46.6722788,
      })

    expect(response.statusCode).toEqual(201)
  })
})
