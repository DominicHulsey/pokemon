import Pokemon from "../models/pokemon.js";

//private


let _pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Dom/heroes'
})

let _pokemon = '?offset=0&limit=50'

let _state = {
  apiPokemon: [],
  myTeam: []
}

let _subscribers = {
  apiPokemon: [],
  myTeam: []
}


function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn())
}



//public

export default class PokeService {

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiPokemon() {
    return _state.apiPokemon.map(h => new Pokemon(h))
  }

  get MyTeam() {
    return _state.myTeam.map(h => new Pokemon(h))
  }


  //POST DATA
  addToTeam(id) {
    //find hero
    let pokemon = _state.apiPokemon.find(pokemon => pokemon.id == id)
    //find if pokemon is already in list
    let myPokemon = _state.myTeam.find(h => h.name == pokemon.name)
    //prevent adding duplicates
    if (myPokemon) {
      alert('my guy, this dude is already on your team. Choose someone else man...')
      return
    }
    _sandbox.post('', pokemon)
      .then(res => {
        this.getMyTeamData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  //GET DATA
  getMyTeamData() {
    _sandbox.get().then(res => {
      let data = res.results.map(p => new Pokemon(d))
      setState('myTeam', data)
    })
      .catch(err => {
        console.error(err)
      })
  }
  //GET DATA
  getPokemonData() {
    _pokeAPI.get()
      .then(res => {
        let data = res.results.map(p => new Pokemon(d))
        setState('apiPokemon', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //DELETE DATA
  removeFromTeam(id) {
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.getMyTeamData()
      })
      .catch(err => {
        console.error(err)
      })
  }

}