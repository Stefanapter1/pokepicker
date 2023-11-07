import express from "express";
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const app = express();
const port = 4000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  // created an empty array called team.
  const team = [];
// created a for loop that whilst i is less than 6, it will repeat and generate a random pokemon.
  for (let i = 0; i < 6; i++) {
// this is assigned to the constant of species
    const species = await P.getPokemonSpeciesByName(
      Math.round(Math.random() * 1017)
    );
// this generated team memeber is then pushed into the array after one another - giving a team of six pokemeon.
    team.push(species);
  }

  res.render('index.ejs', { team });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});