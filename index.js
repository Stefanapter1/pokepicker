import express from 'express';
import Pokedex from 'pokedex-promise-v2';
import axios from 'axios';
const P = new Pokedex();
const app = express();
const port = 4000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const gen = req.query['gen'];

  const team = [];

  if (typeof gen !== 'undefined') {
    // Use gen to get names.
    // Pick random names.
    const generation = await P.getGenerationByName(gen);

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(
        Math.random() * generation.pokemon_species.length
      );

      const result = await P.getPokemonSpeciesByName(
        generation.pokemon_species[randomIndex].name
      );

      team.push(result);
    }
  } else {
    // Ids are random numbers up to 1017.
    for (let i = 0; i < 6; i++) {
      const randomId = Math.floor(Math.random() * 1017);
      const result = await P.getPokemonSpeciesByName(randomId);
      team.push(result);
    }
  }

  // created a for loop that whilst i is less than 6, it will repeat and generate a random pokemon.

  // this is assigned to the constant of species
  console.log(team);
  res.render('index.ejs', { team });
});

const a = new Array();
Array.from({ length: 6 }, () => Math.floor(Math.random() * 1017));

// app.get('/fire', async (req, res) => {
//   const team = [];

//   try {
//     const response = await axios.get(
//       'https://pokeapi.co/api/v2/pokemon?limit=1017'
//     );

//     const pokedex = P.getPokedexList();

//     const fireTypePokemon = response.data.results.filter((pokemon) =>
//       pokemon.type.includes('Fire')
//     );

//     for (let i = 0; i < 6; i++) {
//       const randomPokemon = Math.floor(Math.random() * fireTypePokemon.length);
//       team.push(randomPokemon);
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   res.render('index.ejs', { team });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
