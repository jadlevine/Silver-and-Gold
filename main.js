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
  let etGrid = document.querySelector('#explore-tile-grid')
  etGrid.innerHTML = '' //clears the etGrid
  for (let i = 1; i < 17; i++) {
    let newRegion = document.createElement('div')
    newRegion.id = `et-r-${i}`
    newRegion.classList = 'region'
    let regionPresence = currentET.regions.includes(i)
    newRegion.classList.add(`region-${regionPresence}`)
    etGrid.appendChild(newRegion)
  }
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

//player turn function
// const playerTurn = () => {}
// playerTurn()

const regionHovered = (event) => {
  // console.log(`${event.target.id}`)
  // console.log(`${event.target.parentNode.id}`)

  //clear any previous hovers ... remove elements with class hover?

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
  //read through the currentET for regions
  for (let i = 1; i < 17; i++) {
    let newHoverRegion = document.createElement('div')
    // newHoverRegion.id = `et-r${i}`
    newHoverRegion.classList = 'region'
    newHoverRegion.classList.add(`hover`)
    // console.log(currentET.regions)
    let regionPresence = currentET.regions.includes(i)
    newHoverRegion.classList.add(`region-${regionPresence}`)

    //transpose etRegion to eRegionTarget (on tm Grid)
    ///this might need some clean up
    let eRegionTargetNum = i + gridTargetNum - 2
    let eRegionTarget = eRegionTargetNum.toString()
    newHoverRegion.classList.add(`r-${eRegionTarget}`)

    newHoverRegion.style.backgroundColor = 'rgba(0, 255, 0, 0.4)'
    parentGrid.appendChild(newHoverRegion)
  }
  //merge the currentET grid with the tmGrid using .map?

  //build the currentET active region grid
  //place(?)the (opacity=0.5?) etGrid OVER (z-index=1?) the tm-grid starting at the mouse hover region
  //give the new element class "hover" so it can be cleared when the mouse moves

  document.querySelector
}

const regionClicked = (event) => {
  // YOU ARE HERE//
  //this line logs the id of any active region clicked
  //the explore tile clicks are weird... need to debug... if we even want to be able to click on it...
  //****--THIS-> */...maybe clicking and dragging from the explore tile is a stretch goal, and I should just turn off ANY clicking on the explore tile, for now
  console.log(`${event.target.id}`)
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
  region.addEventListener('mouseover', regionHovered)
})

//deals an ET tile when e-deck is clicked
document.querySelector('#explore-deck').addEventListener('click', dealET)
