export default class Pokemon {
  constructor(data) {
    //get real info from api
    this.name = data.name
    this.url = data.url
    this.id = data.id
    this.img = data.sprites.front_default;
  }

  getTemplate() {
    return `<div class="col-2" id="pokemonCard">
    <div class="card my-2 shadow rounded" onclick="app.controllers.pokeController.getCard('${this.name}')">
    <div class="card-text"><h5 class="text-center">#${this.id}</h5></div>
<img id="cardImg" src="${this.img}" />
<div class="card-title"><h6 class="text-center">${this.name}</h6></div>
</div>
</div>
        `
  }
}
