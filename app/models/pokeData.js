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
      this.type2 = type2()

    function type2() {
      if (data.types[1]) {
        return data.types[1].type.name
      } else return ''
    }
    this.games = data.game_indices.length
    this.gamesExpanded = function () {
      return data.game_indices.map(p => {
        return p.version.name;
      })
    }


  }
  // 
  getTemplate() {
    return `
    <div class="col-10 offset-10">
      <h2><u>${this.name}</u> : <span style="font-size:20px"> ${this.type1} </span><span style="font-size:20px">
          ${this.type2} </span></h2>
      <li>height: ${this.height}</p>
        <ul>
          <div class="card bg-light text-dark">
            <li>base experience: ${this.experience} <progress value="${this.experience}" max="390"></progress> 106</li>
            <li>base health: ${this.hp} <progress value="${this.hp}" max="106"></progress> 106</li>
            <li>base attack: ${this.attack} <progress value="${this.attack}" max="190"></progress> 190</li>
            <li>base defense: ${this.defense} <progress value="${this.defense}" max="70"></progress> 70</li>
            <li>base special-attack: ${this.specialAttack} <progress value="${this.specialAttack}" max="154"></progress> 154
            </li>
            <li>base special-defense: ${this.specialDefense} <progress value="${this.specialDefense}" max="100"></progress>
              100</li>
            <li>base speed: ${this.speed} <progress value="${this.speed}" max="130"></progress> 130</li>
          </div>
        </ul>
        <h3 class="text-center pr-5" id="evoText"><u>Evolution</u></h3>
    </div>
        `
  }
}
