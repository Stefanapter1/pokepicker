import express from "express";
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const app = express();
const port = 4000;

app.use(express.static("public"));
const whoseThat = "https://e7.pngegg.com/pngimages/794/778/png-clipart-pokemon-quest-pokemon-sun-and-moon-pokemon-go-hitmonchan-hitmonchan-hand-monochrome-thumbnail.png"
app.get("/", (req, res) => {
    res.render("index.ejs", {name: "?" , sprite: whoseThat});
});

app.post("/pokemonOne", async (req, res) => {
    try {
        var randomNum = Math.floor(Math.random() * (1210 - 1) + 1);
        var pokemonSpecies = await P.getPokemonSpeciesByName(randomNum)
        var randomimage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNum + ".png"
    res.render("index.ejs", { 
                 name: JSON.stringify(pokemonSpecies.name),
                 sprite: randomimage
            });
    } 
    catch (error) {
        console.log(error);
        }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});