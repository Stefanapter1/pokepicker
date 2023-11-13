import express from "express";
import Pokedex from 'pokedex-promise-v2';
import axios from "axios";
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

app.get('/firepokemon', async (req,res) => {
  const team = [];
  const fetchPokemonData = async () => {
  try {
     const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1017');
     const fireTypePokemon = response.data.results.filter(pokemon => pokemon.type.includes('Fire'));
     console.log(fireTypePokemon);
  } catch (error) {
     console.error(error);
  }
  if (fireTypePokemon === true) {
    for (let i = 0; i < 6; i++) {
    const fireData = await fetchPokemonData();
    (
      Math.round(Math.random() * 1017)
   );
   team.push(fireData);
  }
  } else {
    fetchPokemonData();
  }
 };
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});