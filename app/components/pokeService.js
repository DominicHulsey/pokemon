import Pokemon from "../models/pokemon.js";
// @ts-ignore
import Card from "../models/cards.js";

//private


// @ts-ignore
let _pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/'
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
  card: []
}

let _subscribers = {
  apiPokemon: [],
  myTeam: [],
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

  getPokemonData() {
    let endpoints = []
    for (let i = 1; i < 20; i++) {
      endpoints.push("" + i)
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
  myCard(name) {
    document.getElementById('card1').innerHTML = ''
    // @ts-ignore
    let template = ''
    _cardAPI.get("cards?name=" + name)
      .then(res => {
        let data = res.data.cards
        let newCard = data.filter(c => c.name.toLowerCase() == name)
        let imageArray = []
        newCard.forEach(p => {
          imageArray.push(p.imageUrlHiRes)
        })
        for (let i = 0; i < imageArray.length; i++) {
          if (i == 0) {
            template += this.cardTemplate(imageArray)
          }
          else {
            template += `<div class="carousel-item">
            <img class="d-block pokeCard" src="${imageArray[i]}" alt="Second slide">
          </div>`
          }
        } template += `</div> 
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon pokeCard" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon pokeCard" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
              </div>`
        document.getElementById('card1').innerHTML += template
        console.log(template)
      })

  }

  cardTemplate(arr) {
    return `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner pokeCard">
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