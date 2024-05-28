## PokeAPI back end

Project using Node 20.11 version lts

Start :
 ```npm i ```  to setting up dependencies after use ``npm run dev`` to start on port 3333 (default port)

### Technologies
- fastify
- fastify/swagger
- fastify/swagger-ui
- Zod
- axios
    

 ### Routes

 When called route ``/pokemons`` , fetch operation is performed, creating an list with all first 151 pokemons names

When called route ``/pokemon/search`` , by query string is performed a search of the pokemon by name\
example:``http://localhost:3333/pokemon/search?name=Pikachu`` 

When called route ``/pokemon/compare`` , by query string is performed a comparison between two pokemons by name
example: ``http://localhost:3333/pokemons/compare?pokemon_name_first=charmander&pokemon_name_second=pikachu``


 For better understanding of usage you can use the swagger-ui gerated at ``http://localhost:3333/docs``
 
