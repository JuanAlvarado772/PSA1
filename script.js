const inputEl = document.getElementById('search-input');
const button = document.getElementById('search-button');
const results = document.getElementById('result');
const pokemonname = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const img = document.getElementById('img');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const pokeData = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pika = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu";
const wei = document.getElementById('wei');
const hei = document.getElementById('hei');
const pn = document.getElementById('pn');
let pokemonDataArr = [];
let pokemonUrl;


async function getdata () {
  const response = await fetch(pokeData);
  const data = await response.json();
  pokemonDataArr = data.results
}

function reset () {
  inputEl.value = ''
}

async function convert (input) {
  await getdata();
  let found = false;
  const inputAsNumber = isNaN(input) ? null : Number(input);
    for (let i = 0; i < pokemonDataArr.length; i++) {
    if (inputAsNumber === pokemonDataArr[i].id || input === pokemonDataArr[i].name) {
        console.log(`ID and Name found: ${pokemonDataArr[i].id} and ${pokemonDataArr[i].name}`)
        console.log(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonDataArr[i].name}`)
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonDataArr[i].name}`);
        const pokemonDetails = await response.json();
        console.log(pokemonDetails);
        hp.innerHTML = pokemonDetails.stats[0]["base_stat"];
        attack.innerHTML = pokemonDetails.stats[1]["base_stat"];
        defense.innerHTML = pokemonDetails.stats[2]["base_stat"];
        spAttack.innerHTML = pokemonDetails.stats[3]["base_stat"];
        spDefense.innerHTML = pokemonDetails.stats[4]["base_stat"];
        speed.innerHTML = pokemonDetails.stats[5]["base_stat"];
        pokemonname.textContent = pokemonDetails.name.toUpperCase();
        pokemonId.textContent = `#${pokemonDetails.id}`;
        weight.textContent = `Weight: ${pokemonDetails.weight}`;
        height.textContent = `Height: ${pokemonDetails.height}`;
        types.innerHTML = '';
      
        pokemonDetails.types.forEach((type) => {
         types.insertAdjacentHTML("beforeend", ` <span id="${type.type.name}">${type.type.name.toUpperCase()}</span>`)
        });
      
      img.innerHTML = `<img src="${pokemonDetails.sprites["front_default"]}" alt="${pokemonDetails.name}" id="sprite"></img>`
        found = true;
        break;
    } 
  }
  if (!found) {
    alert('Pokémon not found');
  }
  reset();
  return;
}

button.addEventListener("click", function() {
    convert(inputEl.value.toLowerCase());
});