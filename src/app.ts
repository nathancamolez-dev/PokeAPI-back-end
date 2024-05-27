import fastify from 'fastify'

import { errorHandler } from './errors/error-handler'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifySwagger from '@fastify/swagger'
import { fetchPokemon } from './http/controllers/fetch-pokemons'
import { getPokemon } from './http/controllers/get-pokemons'
import { comparePokemons } from './http/controllers/compare-pokemons'

export const app = fastify()

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Pokemon-back-end-API',
      description: 'Api Documentation for back-end',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fetchPokemon)

app.register(getPokemon)

app.register(comparePokemons)

app.setErrorHandler(errorHandler)
