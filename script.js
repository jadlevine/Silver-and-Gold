console.log('js is running')

class Treasure {
  constructor(
    id,
    suit,
    hasSeal,
    sealValue,
    sealSuit,
    grid,
    coinGrid,
    palmGrid,
    palmTotal,
    xGrid
  ) {
    this.id = id
    this.suit = suit
    this.hasSeal = hasSeal
    this.sealValue = sealValue
    this.sealSuit = sealSuit
    this.grid = grid
    this.coinGrid = coinGrid
    this.palmGrid = palmGrid
    this.palmTotal = palmTotal
    this.xGrid = xGrid
  }
}

const t1 = new Treasure(
  't1',
  14,
  false,
  0,
  0,
  [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [2, 13],
  [5],
  1,
  [16]
)
const t2 = new Treasure(
  't2',
  14,
  true,
  2,
  12,
  [1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16],
  [],
  [],
  0,
  [1, 9, 12]
)
const t3 = new Treasure(
  't3',
  8,
  false,
  0,
  0,
  [2, 3, 5, 6, 7, 8, 9, 12],
  [5],
  [],
  0,
  [8]
)

let freshTDeck = [t1, t2, t3]
console.log(freshTDeck)
