export default class PokeData {
  constructor(data) {
    this.name = data.name,
      this.experience = data.base_experience,
      this.speed = data.stats[0].base_stat,
      this.specialDefense = data.stats[1].base_stat,
      this.specialAttack = data.stats[2].base_stat,
      this.defense = data.stats[3].base_stat,
      this.attack = data.stats[4].base_stat,
      this.hp = data.stats[5].base_stat,
      this.type1 = data.types[0].type.name,
      this.type2 = type2(),
      this.typeColor = color(data.types[0].type.name),
      this.typeColor2 = color(type2())

    function type2() {
      if (data.types[1]) {
        return data.types[1].type.name
      } else return ''
    }
    function color(type) {
      switch (type) {
        case 'normal': return '#a8a975';
          break;
        case 'fire': return '#f28020';
          break;
        case 'fighting': return '#c22e20';
          break;
        case 'water': return '#668df3';
          break;
        case 'flying': return '#a88df3';
          break;
        case 'grass': return '#76c948';
          break;
        case 'poison': return '#a13ca2';
          break;
        case 'electric': return '#f9d104';
          break;
        case 'ground': return '#e1c161';
          break;
        case 'psychic': return '#fa5587';
          break;
        case 'rock': return '#b9a12c';
          break;
        case 'ice': return '#96d8d8';
          break;
        case 'bug': return '#a8b900';
          break;
        case 'dragon': return '#70569a';
          break;
        case 'ghost': return '#715847';
          break;
        case 'dark': return '#715847';
          break;
        case 'steel': return '#b8b7d1';
          break;
        case 'fairy': return '#f098aa';
          break;
      }
    }



  }
  getTemplate() {
    return `
      <button class="btn text-white mx-2 ml-5 my-2" style="background-color: ${this.typeColor}"> ${this.type1}</button>    
      <button class="btn text-white mx-2 my-2" style="background-color: ${this.typeColor2}"> ${this.type2}</button>
        <ul>
          <div class="card bg-dark text-white">
            <li class="ml-2 mt-3">experience: ${this.experience} <progress value="${this.experience}" max="390"></progress></li>
            <hr>
            <li class="ml-2">health: ${this.hp} <progress value="${this.hp}" max="106"></progress></li>
            <hr>
            <li class="ml-2">attack: ${this.attack} <progress value="${this.attack}" max="190"></progress></li>
            <hr>
            <li class="ml-2">defense: ${this.defense} <progress value="${this.defense}" max="70"></progress></li>
            <hr>
            <li class="ml-2">special-attack: ${this.specialAttack} <progress value="${this.specialAttack}" max="154"></progress>
            </li>
            <hr>
            <li class="ml-2">special-defense: ${this.specialDefense} <progress value="${this.specialDefense}" max="100"></progress></li>
              <hr>
            <li class="ml-2 mb-3">speed: ${this.speed} <progress value="${this.speed}" max="130"></progress></li>
          </div>
        </ul>
        `
  }
}
