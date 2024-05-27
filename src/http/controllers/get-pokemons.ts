import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PokemonInterface } from '../../types/pokemon'

import { AllPokemons } from '../middlewares/fetch-pokemons'
import { BadRequest } from '../../errors/BadRequest-error'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getPokemon(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pokemon/search',
    {
      schema: {
        summary: 'Get pokemon by name',
        tags: ['Pokemons'],
        querystring: z.object({
          name: z.string().toLowerCase().nullish(),
        }),
        response: {
          200: z.object({
            name: z.string(),
            height: z.number(),
            weight: z.number(),
            total_base_stat: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.query

      const result = await AllPokemons()

      const pokemonURL = result.find((pokemon) => pokemon.name === name)

      if (!pokemonURL) {
        throw new BadRequest('Pokemon not found')
      }

      const pokemonRaw = await axios.get(pokemonURL.url)
      const pokemon: PokemonInterface = pokemonRaw.data

      pokemon.total_base_stat = pokemon.stats.reduce(
        (acc, curr) => acc + curr.base_stat,
        0,
      )

      return reply.status(200).send({
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        total_base_stat: pokemon.total_base_stat,
      })
    },
  )
}
