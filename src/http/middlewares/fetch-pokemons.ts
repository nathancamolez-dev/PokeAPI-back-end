import axios from 'axios'
import { z } from 'zod'
import { NotFoundError } from '../../errors/BadRequest-error'

export async function AllPokemons() {
  const pokeSchema = z.object({
    count: z.number(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
    results: z.array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    ),
  })

  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/?limit=151',
  )

  const { results } = pokeSchema.parse(response.data)
  const pokemons = results.map((pokemon) => {
    return {
      name: pokemon.name,
      url: pokemon.url,
    }
  })

  if (pokemons.length <= 0) {
    throw new NotFoundError()
  }

  return pokemons
}
