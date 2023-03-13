import { FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await supertest(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john_doe@example.com',
    password: '123456',
  })
  const authResponse = await supertest(app.server).post('/sessions').send({
    email: 'john_doe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
