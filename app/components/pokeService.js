import Pokemon from "../models/pokemon.js";
import PokeData from "../models/pokeData.js";
// @ts-ignore
import Card from "../models/cards.js";

//private


// @ts-ignore
let _pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

// @ts-ignore
let _cardAPI = axios.create({
  baseURL: "https://api.pokemontcg.io/v1/"
})

// @ts-ignore
let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Dom/heroes'
})

let _limit = 20
let _offset = 0
// @ts-ignore
let _pokemon = `?offset=${_offset}&limit=${_limit}`


let _state = {
  apiPokemon: [],
  myTeam: [],
  data: [],
  evos: []
}

let _subscribers = {
  apiPokemon: [],
  myTeam: [],
  evos: []
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
    return _state.apiPokemon
  }

  get MyTeam() {
    return _state.myTeam.map(h => new Pokemon(h))
  }

  get evos() {
    return _state.evos
  }


  getPokemonData() {
    let endpoints = []
    for (let i = 1; i < 80; i++) {
      endpoints.push("pokemon/" + i)
    }
    let promises = endpoints.map(endPoint => {
      return _pokeAPI.get(endPoint)
        .then(res => {
          return res.data
        })
    })
    Promise.all(promises)
      .then(res => {
        let pokemon = res.map(p => new Pokemon(p))
        setState('apiPokemon', pokemon)
      })
  }


  getEvos(id) {
    _pokeAPI.get(`pokemon-species/${id}`)
      .then(res => {
        _pokeAPI.get(res.data.evolution_chain.url.split('').splice(26).join(''))
          .then(res => {
            if (res.data.chain.species) {
              let evo1 = res.data.chain.species.name
              let pokeObject = _state.apiPokemon.find(e => e.name == evo1)
              document.getElementById('evos').innerHTML += `${pokeObject.getTemplate()} <i class="fas fa-arrow-right text-white topMargin"></i> `
            }
            if (res.data.chain.evolves_to[0]) {
              let evo2 = res.data.chain.evolves_to[0].species.name
              let pokeObject = _state.apiPokemon.find(e => e.name == evo2)
              document.getElementById('evos').innerHTML += pokeObject.getTemplate()
              if (res.data.chain.evolves_to[0].evolves_to.length > 0) {
                document.getElementById('evos').innerHTML += `<i class="fas fa-arrow-right text-white topMargin"></i>`
              }
              else {
                document.getElementById('evoText').classList.remove('pr-5')
              }
            }
            if (res.data.chain.evolves_to[0].evolves_to.length > 0) {
              let evo3 = res.data.chain.evolves_to[0].evolves_to[0].species.name
              let pokeObject = _state.apiPokemon.find(e => e.name == evo3)
              document.getElementById('evos').innerHTML += pokeObject.getTemplate()
            }
          })
      })
  }

  myCard(name) {
    document.getElementById('evos').innerHTML = ''
    _pokeAPI.get("pokemon/" + name)
      .then(res => {
        let data = new PokeData(res.data)
        document.getElementById('moreData').innerHTML = data.getTemplate()
      })
    document.getElementById('card1').innerHTML = ''
    let template = ''
    _cardAPI.get("cards?name=" + name)
      .then(res => {
        let data = res.data.cards
        let newCard = data.filter(c => c.name.toLowerCase() == name)
        let imageArray = []
        newCard.forEach(p => {
          imageArray.push(p.imageUrl)
        })
        for (let i = 0; i < imageArray.length; i++) {
          if (i == 0) {
            template += this.cardTemplate(imageArray)
          }
          else {
            template += `<div class="carousel-item">
            <img class="pokeCard" src="${imageArray[i]}" alt="Second slide">
          </div>`
          }
        } template += `</div> 
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
              </div>
              `
        document.getElementById('card-container').innerHTML = template
        document.getElementById('main-container').classList.add('overlay')
        document.getElementById('main-container').onclick = function () {
          document.getElementById('main-container').classList.remove('overlay')
          document.getElementById('card-container').classList.remove('background1')
          document.getElementById('card-container').innerHTML = ''
          document.getElementById('moreData').innerHTML = ''
          document.getElementById('evos').innerHTML = ''
        }
      });

  }

  cardTemplate(arr) {
    return `
    <button class="btn btn-primary" onclick="app.controllers.pokeController.remCard()"
        id="backButton"><i class="fas fa-chevron-left"></i> Back </button>
    <div class=" bg-transparent">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="pokeCard" src="${arr[0]}" alt="First slide">
          </div>
`
  }
}

//POST DATA

/*
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
}
*/
/* _sandbox.post('', pokemon)
   .then(res => {
     this.getMyTeamData()
   })
   .catch(err => {
     console.log(err)
   })
}
*/

  //GET DATA
/*
getMyTeamData() {
  _sandbox.get().then(res => {
    let data = res.data.results.map(p => new Pokemon(p))
    setState('myTeam', data)
  })
}
*/
  //GET DATA
/*
//DELETE DATA
removeFromTeam(id) {
  _sandbox.delete(id)
    .then(res => {
      //this.getMyTeamData()
    }
  })*/