////Exploration Tiles////
class Exploration {
  constructor(id, regions) {
    this.id = id
    this.regions = regions
  }
}

//conformations notation: [[[region],[regionsRotations]], [[mirror],[mirrorRotations]]
const e1 = new Exploration('e1', [
  [
    [2, 6],
    [2, 3],
    [2, 6],
    [2, 3]
  ],
  [
    [2, 6],
    [2, 3],
    [2, 6],
    [2, 3]
  ]
])
const e2 = new Exploration('e2', [
  [
    [2, 6, 10],
    [2, 3, 4],
    [2, 6, 10],
    [2, 3, 4]
  ],

  [
    [2, 6, 10],
    [2, 3, 4],
    [2, 6, 10],
    [2, 3, 4]
  ]
])
const e3 = new Exploration('e3', [
  [
    [2, 6, 10],
    [2, 3, 4],
    [2, 6, 10],
    [2, 3, 4]
  ],
  [
    [2, 6, 10],
    [2, 3, 4],
    [2, 6, 10],
    [2, 3, 4]
  ]
])
const e4 = new Exploration('e4', [
  [
    [2, 6, 7],
    [2, 3, 6],
    [2, 3, 7],
    [3, 6, 7]
  ],
  [
    [2, 6, 7],
    [2, 3, 6],
    [2, 3, 7],
    [3, 6, 7]
  ]
])
const e5 = new Exploration('e5', [
  [
    [2, 6, 7],
    [2, 3, 6],
    [2, 3, 7],
    [3, 6, 7]
  ],
  [
    [2, 6, 7],
    [2, 3, 6],
    [2, 3, 7],
    [3, 6, 7]
  ]
])
const e6 = new Exploration('e6', [
  [
    [2, 6, 7, 10],
    [2, 3, 4, 7],
    [3, 6, 7, 11],
    [3, 6, 7, 8]
  ],
  [
    [2, 6, 7, 10],
    [2, 3, 4, 7],
    [3, 6, 7, 11],
    [3, 6, 7, 8]
  ]
])
const e7 = new Exploration('e7', [
  [
    [2, 6, 10, 11],
    [2, 3, 4, 6],
    [2, 3, 7, 11],
    [4, 6, 7, 8]
  ],
  [
    [3, 7, 10, 11],
    [2, 3, 4, 8],
    [2, 3, 6, 10],
    [2, 6, 7, 8]
  ]
])
const e8 = new Exploration('e8', [
  [
    [2, 3, 6, 7],
    [2, 3, 6, 7],
    [2, 3, 6, 7],
    [2, 3, 6, 7]
  ],
  [
    [2, 3, 6, 7],
    [2, 3, 6, 7],
    [2, 3, 6, 7],
    [2, 3, 6, 7]
  ]
])

const etDeck = [e1, e2, e3, e4, e5, e6, e7, e8]
export { etDeck }
