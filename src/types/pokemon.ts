export interface PokemonInterface {
  abilities: { ability: unknown; is_hidden: boolean; slot: number }[]
  base_experience: number
  cries: { latest: string; legacy: string }
  forms: { name: string; url: string }[]
  game_indices: { game_index: number; version: unknown }[]
  height: number
  held_items: unknown[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: { move: unknown; version_group_details: unknown[] }[]
  name: string
  order: number
  past_abilities: unknown[]
  past_types: unknown[]
  species: { name: string; url: string }
  sprites: {
    back_default: string
    back_female: unknown
    back_shiny: string
    back_shiny_female: unknown
    front_default: string
    front_female: unknown
    front_shiny: string
    front_shiny_female: unknown
    other: {
      dream_world: unknown
      home: unknown
      'official-artwork': unknown
      showdown: unknown
    }
    versions: {
      'generation-i': unknown
      'generation-ii': unknown
      'generation-iii': unknown
      'generation-iv': unknown
      'generation-v': unknown
      'generation-vi': unknown
      'generation-vii': unknown
      'generation-viii': unknown
    }
  }
  stats: { base_stat: number; effort: number; stat: unknown }[]
  types: { slot: number; type: unknown }[]
  weight: number
  total_base_stat?: number
}
