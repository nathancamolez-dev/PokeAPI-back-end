import { FastifyInstance } from 'fastify'
import { AllPokemons } from '../middlewares/fetch-pokemons'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function fetchPokemon(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pokemons',
    {
      schema: {
        summary: 'Get all pokemons',
        tags: ['Pokemons'],
        response: {
          200: z.object({
            Pokemons: z.array(z.string()),
          }),
        },
      },
    },
    async (request, reply) => {
      const pokemons = await AllPokemons()

      const names = pokemons.map((pokemons) => pokemons.name)

      return reply.status(200).send({ Pokemons: names })
    },
  )
}
