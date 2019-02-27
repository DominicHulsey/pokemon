export default class PokeData {
  constructor(data) {
    this.name = data.name,
      this.experience = data.base_experience,
      this.height = data.height,
      this.speed = data.stats[0].base_stat,
      this.specialDefense = data.stats[1].base_stat,
      this.specialAttack = data.stats[2].base_stat,
      this.defense = data.stats[3].base_stat,
      this.attack = data.stats[4].base_stat,
      this.hp = data.stats[5].base_stat,
      this.type1 = data.types[0].type.name,
      this.games = data.game_indices.length
    this.gamesExpanded = function () {
      return data.game_indices.map(p => {
        return p.version.name;
      })
    }


  }

  getTemplate() {
    return `
    <div class="col-8">
  <h2><u>${this.name}</u></h2>
  <ul>
    <li>height: ${this.height}</li>
    <li>base experience: ${this.experience}</li>
    <li>base health: ${this.hp}</li>
    <li>type 1: ${this.type1}</li>
    <li>type 2: ${this.type2}</li>
    <li>base speed: ${this.speed}</li>
    <li>base attack: ${this.attack}</li>
    <li>base defense: ${this.defense}</li>
    <li>base special-defense: ${this.specialDefense}</li>
    <li>base special-attack: ${this.specialAttack}</li>
    <li>games (click for list): ${this.games}</li>
  </ul>
</div>
        `
  }
}
