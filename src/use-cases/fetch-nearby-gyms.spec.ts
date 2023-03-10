import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Jamal',
      latitude: -23.455811,
      longitude: -47.482252,
    })

    await gymsRepository.create({
      title: 'GymSP',
      latitude: -23.5585184,
      longitude: -46.6722788,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.455811,
      userLongitude: -47.482252,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Jamal' })])
  })
})
