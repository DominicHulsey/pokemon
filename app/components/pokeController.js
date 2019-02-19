import PokeService from "./pokeService.js";

//private

let _pokeService = new PokeService

function drawApiPokemon() {
  let template = ''
  let pokemon = _pokeService.ApiPokemon
  pokemon.forEach(p => {
    let button = `<button class="btn btn-primary onclick="app.controllers.pokeController.addToTeam('${p.id}')">ADD TO TEAM</button>`
    template += p.getCard(button)
  })
  document.querySelector('.pokemon').innerHTML = template
}



//public
export default class PokeController {
  constructor() {
    _pokeService.addSubscriber('apiPokemon', drawApiPokemon)

    //Initialize Data
    _pokeService.getPokemonData()
    _pokeService.getMyTeamData()
  }
  addtoTeam(id) {
    _pokeService.addToTeam(id)
  }
  removeFromTeam(id) {
    _pokeService.removeFromTeam(id)
  }




}