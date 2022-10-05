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

  // document.querySelector
}
const clearHovers = () => {
  let previousHovers = document.querySelectorAll('.hover')
  previousHovers.forEach((previousHover) => {
    previousHover.remove()
  })
}

const regionClicked = (event) => {
  console.log(`${event.target.id}`)
  // YOU ARE HERE//
  ////are they still?...the explore tile clicks are weird... need to debug... if we even want to be able to click on it...
  //****--THIS-> */...maybe clicking and dragging from the explore tile is a stretch goal, and I should just turn off ANY clicking on the explore tile, for now

  //transform the explore tile to the click location
  //check if tile can be legally placed there (compare tile region array to card region array?)
  //if above is true - place tile?
  //place tile function?
  //if not legal, flash alert, suggest rotating or mirroring

  //////////////////////
  ///YOU ARE HERE--go check out line 214 above for transform
  //transpose explore tile to event target location
  let baseETRegions = currentET.regions[etMirrorIndex][etRotationIndex]
  let eventTargetArrWtf = event.target.id.split('-')
  let eventTargetNumStringWtf = eventTargetArrWtf[eventTargetArrWtf.length - 1]
  let eventTargetNumNumWtf = parseInt(eventTargetNumStringWtf)

  //map baseETRegions to baseETRegionsRelativeToTargets
  const baseETRegionsRelativeToTargets = baseETRegions.map((bETRegion) => {
    const bETRegionRelativetoTarget = bETRegion + eventTargetNumNumWtf - 2
    return bETRegionRelativetoTarget
  })

  console.log(eventTargetArrWtf)
  console.log(baseETRegions)
  console.log(baseETRegionsRelativeToTargets)
  //transpose etRegion to eRegionTarget (on tm Grid)
  ///this might need some clean up
  // let eRegionTargetNum = i + gridTargetNum - 2

  //check if legal
  let currentExploreRegions = currentET.regions[etMirrorIndex][etRotationIndex]
  let parentGrid = document.querySelector(`#${event.target.parentNode.id}`)
  let tmRegions = parentGrid.children
  let tmRegionTrueArr = []

  ///this is a little nuts
  for (let i = 0; i < tmRegions.length; i++) {
    if (tmRegions[i].classList[2] === 'region-true') {
      let activeRegionIDSplitArr = tmRegions[i].id.split('-')
      let wtf = activeRegionIDSplitArr[activeRegionIDSplitArr.length - 1]
      let wtfNum = parseInt(wtf)
      tmRegionTrueArr.push(wtfNum)
    }
  }
  currentExploreRegions.forEach((element) => {
    let legal = true
    let legalRegion = tmRegionTrueArr.some((num) => {
      return num === element
    })
    console.log(`${element} is legal?: ${legalRegion}`)
  })
  console.log(tmRegionTrueArr)
  {
    /* <div id="p1-tm1-grid" class="tm-grid"><div id="p1-tm1-r-1" class="region r-1 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-2" class="region r-2 region-false gem-false banana-false coconut-false"></div><div id="p1-tm1-r-3" class="region r-3 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-4" class="region r-4 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-5" class="region r-5 region-true gem-false banana-false coconut-true"></div><div id="p1-tm1-r-6" class="region r-6 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-7" class="region r-7 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-8" class="region r-8 region-true gem-false banana-true coconut-false"></div><div id="p1-tm1-r-9" class="region r-9 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-10" class="region r-10 region-false gem-false banana-false coconut-false"></div><div id="p1-tm1-r-11" class="region r-11 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-12" class="region r-12 region-true gem-false banana-false coconut-false"></div><div id="p1-tm1-r-13" class="region r-13 region-false gem-false banana-false coconut-false"></div><div id="p1-tm1-r-14" class="region r-14 region-false gem-false banana-false coconut-false"></div><div id="p1-tm1-r-15" class="region r-15 region-false gem-false banana-false coconut-false"></div><div id="p1-tm1-r-16" class="region r-16 region-false gem-false banana-false coconut-false"></div></div> */
  }
  // let currentExploreRegions = currentET.regions[etMirrorIndex][etRotationIndex].includes(i)
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
