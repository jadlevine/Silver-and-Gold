// console.log('js is running')
////////////////////////////////////
//IMPORTS//
////////////////////////////////////
import { tmDeck } from './js_modules/treasureMapsDeck.js'
import { etDeck } from './js_modules/explorationTilesDeck.js'

let tmTestCard = tmDeck[39]
console.log(`test id: ${tmTestCard.id}`)

////////////////////////////////////
//GLOBAL VARIABLES//
////////////////////////////////////
let roundNum = 0
let startingPlayer = 'p1' //this is only necessary if we want to offer the user to choose first player
let currentPlayer = startingPlayer
let currentET
let shuffledTMDeck
let shuffledETDeck
let etRotationIndex = 0
let etMirrorIndex = 0

////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////

////////////////////////////////
/////////////////////////////////
//Shuffle deck function
//Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/
const shuffle = (deck) => {
  //rewrite this to make it more succinct
  let unshuffledLength = deck.length
  while (unshuffledLength !== 0) {
    let randomIndex = Math.floor(Math.random() * unshuffledLength)
    unshuffledLength--
    let temp = deck[unshuffledLength] //tempory hold for last card
    deck[unshuffledLength] = deck[randomIndex] //move random to end
    deck[randomIndex] = temp //move last card to middle to be shuffled later
  }
  return deck
}

////////////////////////////////
/////////////////////////////////

//dealET function
const dealET = () => {
  currentET = shuffledETDeck.shift()
  renderET()
}

const renderET = () => {
  let etGrid = document.querySelector('#explore-tile-grid')
  etGrid.innerHTML = '' //clears the etGrid
  for (let i = 1; i < 17; i++) {
    let newRegion = document.createElement('div')
    newRegion.id = `et-r-${i}`
    newRegion.classList = 'region'
    let regionPresence =
      currentET.regions[etMirrorIndex][etRotationIndex].includes(i)
    newRegion.classList.add(`region-${regionPresence}`)
    etGrid.appendChild(newRegion)
  }
}

const rotateET = () => {
  if (etRotationIndex === 3) {
    etRotationIndex = 0
  } else {
    etRotationIndex++
  }
  renderET()
}
const mirrorET = () => {
  if (etMirrorIndex === 1) {
    etMirrorIndex = 0
  } else {
    etMirrorIndex++
  }
  renderET()
}

////////////////////////////////
/////////////////////////////////
const convertSuit = (suitVal, bonusValorClass) => {
  let suitClass, bonusValue
  switch (suitVal) {
    case 14:
      suitClass = 'fourteen'
      bonusValue = 2
      break
    case 12:
      suitClass = 'twelve'
      bonusValue = 2
      break
    case 10:
      suitClass = 'ten'
      bonusValue = 1
      break
    case 8:
      suitClass = 'eight'
      bonusValue = 1
      break
    case 0:
      suitClass = ''
      bonusValue = ''
      break
  }
  if (bonusValorClass === 'bonusVal') {
    return bonusValue
  } else {
    return suitClass
  }
}

////////////////////////////////
/////////////////////////////////

//dealTM
const dealTM = (destinationID) => {
  let nextTM = shuffledTMDeck.shift()
  let suitClass = convertSuit(nextTM.suit)
  let bonusClass = convertSuit(nextTM.bonusSuit)
  let bonusValue = convertSuit(nextTM.bonusSuit, 'bonusVal')

  let destination = document.querySelector(`#${destinationID}`)
  destination.title = `${nextTM.id}`

  let newTop = document.createElement('div')
  newTop.id = `${destinationID}-top`
  newTop.classList = 'tm-top'

  let newSuit = document.createElement('div')
  newSuit.id = `${destinationID}-suit`
  newSuit.classList = suitClass
  newSuit.innerText = nextTM.suit
  newTop.appendChild(newSuit)

  let newBonus = document.createElement('div')
  newBonus.id = `${destinationID}-bonus`
  newBonus.classList = bonusClass
  newBonus.innerText = bonusValue
  newTop.appendChild(newBonus)

  destination.appendChild(newTop)

  let newGrid = document.createElement('div')
  newGrid.id = `${destinationID}-grid`
  newGrid.classList = 'tm-grid'
  destination.appendChild(newGrid)

  ////add regions according to nextTM object properties
  let gridElement = document.querySelector(`#${destinationID}-grid`)
  for (let i = 1; i < 17; i++) {
    let newRegion = document.createElement('div')
    newRegion.id = `${destinationID}-r-${i}`
    newRegion.classList = 'region'

    let gridAreaString = i.toString()
    newRegion.classList.add(`r-${gridAreaString}`)

    let regionPresence = nextTM.regions.includes(i)
    newRegion.classList.add(`region-${regionPresence}`)

    let gemPresence = nextTM.gemRegions.includes(i)
    newRegion.classList.add(`gem-${gemPresence}`)

    let bananaPresence = nextTM.bananaRegions.includes(i)
    newRegion.classList.add(`banana-${bananaPresence}`)

    let coconutPresence = nextTM.coconutRegions.includes(i)
    newRegion.classList.add(`coconut-${coconutPresence}`)

    gridElement.appendChild(newRegion)
  }
}

//titleParser Function - takes a title that ends in a number (e.g., p1-tm1-r-1) and returns the ending number as integer
const titleParser = (title) => {
  let titleArr = title.split('-')
  let titleNumString = titleArr[titleArr.length - 1]
  let titleNum = parseInt(titleNumString)
  return titleNum
}

const transposeETCoordinates = (targetID) => {
  let targetIDParseArr = targetID.split('-')
  let targetCoordinate = parseInt(targetIDParseArr[targetIDParseArr.length - 1])
  let initETCoordinates = currentET.regions[etMirrorIndex][etRotationIndex]
  //map initial ET coordinates to transposed
  const transposedETCoordinates = initETCoordinates.map((etCoordinate) => {
    const transposed = etCoordinate + targetCoordinate - 2
    return transposed
  })
  //check for legal transform (no partial tile row jumping)
  let rowCompArr = []
  for (let i = 0; i < initETCoordinates.length; i++) {
    let initRow
    let transRow
    if (initETCoordinates[i] < 5) {
      initRow = 1
    } else if (initETCoordinates[i] < 9) {
      initRow = 2
    } else if (initETCoordinates[i] < 13) {
      initRow = 3
    } else {
      initRow = 4
    }
    if (transposedETCoordinates[i] < 5) {
      transRow = 1
    } else if (transposedETCoordinates[i] < 9) {
      transRow = 2
    } else if (transposedETCoordinates[i] < 13) {
      transRow = 3
    } else {
      transRow = 4
    }
    rowCompArr.push(transRow - initRow)
  }
  const rowDiffsSame = rowCompArr.every((num) => {
    return num === rowCompArr[0]
  })
  if (rowDiffsSame) {
    return transposedETCoordinates
  } else {
    return false
  }
  // console.log(rowCompArr)
}

// //illegalPlacement alerts user when tiles won't fit
// const illegalPlacement = () => {
//   let newHoverRegion = document.createElement('div')
// }

const regionHovered = (event) => {
  // console.log(`${event.target.id}`)
  // console.log(`${event.target.parentNode.id}`)

  //clear any previous hovers ... remove elements with class hover?
  clearHovers()

  //parse the event target id
  let targetRegion = event.target.id
  // console.log(targetRegion)
  //three lines below could probably be combined into one with method chaining
  let gridTargetArr = targetRegion.split('-')
  let gridTarget = gridTargetArr[gridTargetArr.length - 1]
  let gridTargetNum = parseInt(gridTarget)
  // console.log(`${gridTargetNum} is a ${typeof gridTargetNum}`)

  //select the parent grid
  let parentGrid = document.querySelector(`#${event.target.parentNode.id}`)
  // console.log(parentGrid.id)
  //read through the currentET for regions and place them onto the tmap at target
  for (let i = 1; i < 17; i++) {
    let newHoverRegion = document.createElement('div')
    // newHoverRegion.id = `et-r${i}`
    newHoverRegion.classList = 'region'
    newHoverRegion.classList.add(`hover`)
    // console.log(currentET.regions)
    let regionPresence = currentET.regions.includes(i)
    newHoverRegion.classList.add(`region-${regionPresence}`)
    newHoverRegion.style.zIndex = -1
    if (regionPresence === true) {
      newHoverRegion.style.backgroundColor = 'rgba(0, 255, 0, 0.4)'
    }

    //transpose etRegion to eRegionTarget (on tm Grid)
    ///this might need some clean up
    let eRegionTargetNum = i + gridTargetNum - 2
    if (eRegionTargetNum > 16) {
      clearHovers()
      return console.log(`Illegal placement`)
    }
    let eRegionTarget = eRegionTargetNum.toString()
    newHoverRegion.classList.add(`r-${eRegionTarget}`)

    parentGrid.appendChild(newHoverRegion)
  }

  //check if hover is legal
  // let allHoverTrue = document.querySelectorAll('.hover.region-true')
  // if (allHoverTrue.length !== currentET.regions.length) {
  //   console.log('Illegal tile placement')
  //   clearHovers()
  // }

  //build the currentET active region grid
  //place(?)the (opacity=0.5?) etGrid OVER (z-index=1?) the tm-grid starting at the mouse hover region
  //give the new element class "hover" so it can be cleared when the mouse moves
}

const clearHovers = () => {
  let previousHovers = document.querySelectorAll('.hover')
  previousHovers.forEach((previousHover) => {
    previousHover.remove()
  })
}

const regionClicked = (event) => {
  let isLegal = true
  console.log(`${event.target.id}`)
  //transform the explore tile to the click location
  //check if transform was legal
  //check if transformed coordinates are region-true
  //you still can't click on a false spot if it would be the top left coordinate of tile
  ///e.g., e6 (little t) rotated to pointing up, if TM grid r1-false, can't click there to place tile on grid at 2,5,6,7

  //if above is true - place tile
  //place tile function?
  //if not legal, flash alert, suggest rotating or mirroring

  //useful bit of code to grab card number if needed to be referenced from original tm deck
  let targetCard = event.target.closest('.card').title
  let targetCardNum = titleParser(targetCard)

  //check if legal - grab tmcard object.regions array
  ////comment out??
  let parentGrid = document.querySelector(`#${event.target.parentNode.id}`)
  let tmRegions = parentGrid.children
  let tmRegionTrueArr = []
  ////comment out??

  //this works to build array of grid regions that are available ('.region-true')
  let targetAvailArr = []
  let targetGridRegions = document.querySelector(
    `#${event.target.parentNode.id}`
  ).children
  for (let i = 0; i < 16; i++) {
    if (targetGridRegions[i].classList.value.includes('region-true')) {
      targetAvailArr.push(titleParser(targetGridRegions[i].id))
    }
  }
  // console.log(targetAvailArr)

  ///this is a little nuts
  ////comment out??
  for (let i = 0; i < tmRegions.length; i++) {
    if (tmRegions[i].classList[2] === 'region-true') {
      let activeRegionIDSplitArr = tmRegions[i].id.split('-')
      let wtf = activeRegionIDSplitArr[activeRegionIDSplitArr.length - 1]
      let wtfNum = parseInt(wtf)
      tmRegionTrueArr.push(wtfNum)
    }
  }
  ////comment out

  //transpose etCoordinates wrt target
  //alert if trasponse returns false (partial row jumping)
  let transposedETCoordinates = transposeETCoordinates(event.target.id)
  if (!transposedETCoordinates) {
    isLegal = false
    alert('Illegal placement! Try rotating or mirroring the tile!')
    return
  }

  //check transposed against targetAvailArr
  transposedETCoordinates.forEach((coordinate) => {
    if (!targetAvailArr.includes(coordinate)) {
      isLegal = false
      alert('Illegal placement! Try rotating or mirroring the tile!')
      // illegalPlacement()
      // return
      // break
    }
  })
  //you still can't click on a false spot if it would be the top left coordinate of tile
  ///e.g., e6 (little t) rotated to pointing up, if TM grid r1-false, can't click there to place tile on grid at 2,5,6,7
  if (isLegal) {
    console.log('that placement works!')
  }
}

const gameSetup = () => {
  shuffledTMDeck = shuffle(tmDeck)
  shuffledETDeck = shuffle(etDeck)

  dealET()
  dealTM('p1-tm1')
  dealTM('p1-tm2')
  dealTM('p1-tm3')
  dealTM('p1-tm4')
  dealTM('p2-tm1')
  dealTM('global-tm1')
  dealTM('global-tm2')
  dealTM('global-tm3')
  dealTM('global-tm4')
}

////////////////////////////////////
//Function Calls
////////////////////////////////////
gameSetup()

////////////////////////////////////
//EVENT LISTENERS//
////////////////////////////////////

//isolate avtive regions ('.region-true') of current player tms area (e.g., 'p1-tms-area')
const currentPlayerTMareaID = `${currentPlayer}-tms-area`
const allActiveRegions = document.querySelectorAll(
  `#${currentPlayerTMareaID} .region-true`
)
allActiveRegions.forEach((region) => {
  //listen for clicks
  region.addEventListener('click', regionClicked)
  //listen for mouseovers
  ////THIS NEED TO COME BACK FOR MOUSEOVER TO WORK///
  // region.addEventListener('mouseover', regionHovered)
})

const rotateButton = document.querySelector('#rotate-button')
const mirrorButton = document.querySelector('#mirror-button')
rotateButton.addEventListener('click', rotateET)
mirrorButton.addEventListener('click', mirrorET)

//for testing only, will eventually be automatic when a round is over, or after a confirm on "ready to go onto next exploration?
//deals an ET tile when e-deck is clicked
document.querySelector('#explore-deck').addEventListener('click', dealET)
