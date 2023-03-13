import { app } from '@/app'
import { prisma } from '@/lib/prima'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in history Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to to list history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym-01',
        description: 'Gym-01',
        phone: '5555-555',
        latitude: -23.5585184,
        longitude: -46.6722788,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })

    const response = await supertest(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ])
  })
})
