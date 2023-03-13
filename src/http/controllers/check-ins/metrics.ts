import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metric-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const searchGymUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await searchGymUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
