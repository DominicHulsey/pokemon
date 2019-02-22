export default class MoreData {
  constructor(data) {
    //get real info from api
    this.image = data.sprites.front_default
    this.type = data.types[0].type.name
    this.type2 = data.types[1] ? data.types[1].type.name : 'n/a'
    this.name = data.name
  }


}

