console.log('js is running')

////Exploration Tiles////
class Exploration {
  constructor(id, regions) {
    this.id = id
    this.regions = regions
  }
}

const e1 = new Exploration('e1', [1, 3])
const e2 = new Exploration('e2', [1, 3, 5])
const e3 = new Exploration('e3', [1, 3, 5])
const e4 = new Exploration('e4', [1, 3, 4])
const e5 = new Exploration('e5', [1, 3, 4])
const e6 = new Exploration('e6', [1, 3, 4, 5])
const e7 = new Exploration('e7', [1, 3, 5, 6])
const e8 = new Exploration('e8', [1, 2, 3, 4])

const eTilesDeck = [e1, e2, e3, e4, e5, e6, e7, e8]
export { eTilesDeck }
