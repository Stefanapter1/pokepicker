import express from 'express';
import Pokedex from 'pokedex-promise-v2';

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

  res.render('index.ejs', { team });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
