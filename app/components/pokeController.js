import PokeService from "./pokeService.js";

//private

let _pokeService = new PokeService

function drawApiPokemon() {
  let template = ''
  let pokemon = _pokeService.ApiPokemon
  pokemon.forEach(p => {
    // let button = `<button class="btn btn-primary onclick="app.controllers.pokeController.addToTeam('${p.id}')">ADD TO TEAM</button>`
    //template += p.getCard(button)
    template += p.getTemplate()
  })
  document.getElementById('pokemon').innerHTML = template
  document.getElementById('pokemon').classList.remove('flex-column', 'h-100')
  document.getElementById('pokemon').classList.add('w-100', 'd-flex', 'flex-row', 'flex-wrap', 'justify-content-center')
}

//public
export default class PokeController {
  constructor() {
    _pokeService.addSubscriber('apiPokemon', drawApiPokemon)
    _pokeService.getPokemonData()
  }
  /*addtoTeam(id) {
    _pokeService.addToTeam(id)
  }
  removeFromTeam(id) {
    _pokeService.removeFromTeam(id)
  }
*/
  remCard() {
    document.getElementById('main-container').classList.remove('overlay')
    document.getElementById('card-container').innerHTML = ''
    document.getElementById('card-container').classList.remove('card')
  }
  getCard(name) {
    _pokeService.myCard(name)
  }
}