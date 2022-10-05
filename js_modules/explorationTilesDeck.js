////Exploration Tiles////
class Exploration {
  constructor(id, regions) {
    this.id = id
    this.regions = regions
  }
}

const e1 = new Exploration('e1', [2, 6])
const e2 = new Exploration('e2', [2, 6, 10])
const e3 = new Exploration('e3', [2, 6, 10])
const e4 = new Exploration('e4', [2, 6, 7])
const e5 = new Exploration('e5', [2, 6, 7])
const e6 = new Exploration('e6', [2, 6, 7, 10])
const e7 = new Exploration('e7', [2, 6, 10, 11])
const e8 = new Exploration('e8', [2, 3, 6, 7])

const etDeck = [e1, e2, e3, e4, e5, e6, e7, e8]
export { etDeck }
