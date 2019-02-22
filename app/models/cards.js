export default class Card {
  constructor(data) {
    //get real info from api
    this.name = data.name
    this.img = data.img

  }

  getCard() {
    return `<img src="${this.name} />
        `
  }
}
