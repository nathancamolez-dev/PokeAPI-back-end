import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PokemonInterface } from '../../types/pokemon'
import { BadRequest } from '../../errors/BadRequest-error'
import { AllPokemons } from '../middlewares/fetch-pokemons'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function comparePokemons(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/pokemons/compare',
    {
      schema: {
        summary: 'Compare pokemons',
        tags: ['Pokemons'],
        querystring: z.object({
          pokemon_name_first: z.string().toLowerCase(),
          pokemon_name_second: z.string().toLowerCase(),
        }),
      },
    },
    async (request, reply) => {
      const { pokemon_name_first, pokemon_name_second } = request.query

      const results = await AllPokemons()

      const pokemon_first_URL = results.find(
        (poke) => poke.name === pokemon_name_first,
      )
      const pokemon_second_URL = results.find(
        (poke) => poke.name === pokemon_name_second,
      )

      if (!pokemon_first_URL || !pokemon_second_URL) {
        throw new BadRequest('Pokemons not found')
      }

      const pokemonRaw_first = await axios.get(pokemon_first_URL.url)
      const pokemonRaw_second = await axios.get(pokemon_second_URL.url)

      const pokemon_first: PokemonInterface = pokemonRaw_first.data

      const pokemon_second: PokemonInterface = pokemonRaw_second.data

      pokemon_first.total_base_stat = pokemon_first.stats.reduce(
        (acc, curr) => acc + curr.base_stat,
        0,
      )

      pokemon_second.total_base_stat = pokemon_second.stats.reduce(
        (acc, curr) => acc + curr.base_stat,
        0,
      )
      let pokemon
      if (pokemon_first.total_base_stat > pokemon_second.total_base_stat) {
        pokemon = {
          name: pokemon_first.name,
          total_base_stat: pokemon_first.total_base_stat,
        }
      } else {
        pokemon = {
          name: pokemon_second.name,
          total_base_stat: pokemon_second.total_base_stat,
        }
      }
      return reply.status(200).send({
        pokemon,
      })
    },
  )
}
