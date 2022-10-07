// console.log('js is running')
////////////////////////////////////
//IMPORTS//
////////////////////////////////////
import { tmDeck } from './js_modules/treasureMapsDeck.js'
import { etDeck } from './js_modules/explorationTilesDeck.js'
import { playersArr, playerSetup } from './js_modules/playerObjects.js'
// console.log(playersArr.length)
let tmTestCard = tmDeck[39]
console.log(`test id: ${tmTestCard.id}`)

////////////////////////////////////
//GLOBAL VARIABLES//
////////////////////////////////////
let roundNum = 0
let playerCount
let startingPlayer = 'p1' //this is only necessary if we want to offer the user to choose first player
let currentPlayer = startingPlayer
let currentET
let shuffledTMDeck
let shuffledETDeck
let etRotationIndex = 0
let etMirrorIndex = 0
let statusMessage = document.querySelector('#status-message')
let tmDeckRendering = document.querySelector('#global-tm-deck')
let etDeckRendering = document.querySelector('#explore-deck')

//make a copy of tmDeck for reference
let tmDeckCopy = []
for (let i = 0; i < tmDeck.length; i++) {
  tmDeckCopy.push(tmDeck[i])
}

////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////

//Shuffle deck function
//Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/
const shuffle = (deck) => {
  let shuffledDeck = deck
  //rewrite this to make it more succinct
  let unshuffledLength = shuffledDeck.length
  while (unshuffledLength !== 0) {
    let randomIndex = Math.floor(Math.random() * unshuffledLength)
    unshuffledLength--
    let temp = shuffledDeck[unshuffledLength] //tempory hold for last card
    shuffledDeck[unshuffledLength] = shuffledDeck[randomIndex] //move random to end
    shuffledDeck[randomIndex] = temp //move last card to middle to be shuffled later
  }
  return shuffledDeck
}

//dealET function
const dealET = () => {
  currentET = shuffledETDeck.shift()
  etDeckRendering.innerText = `ET Cards Left: ${shuffledETDeck.length}`
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

//dealTM
const dealTM = (destinationID) => {
  let nextTM = shuffledTMDeck.shift()
  let suitClass = convertSuit(nextTM.suit)
  let bonusClass = convertSuit(nextTM.bonusSuit)
  let bonusValue = convertSuit(nextTM.bonusSuit, 'bonusVal')

  //update TM Cards Left
  tmDeckRendering.innerText = `TM Cards Left: ${shuffledTMDeck.length}`

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

//add hovers as stretch goal?
// const regionHovered = (event) => {
//   // console.log(`${event.target.id}`)
//   // console.log(`${event.target.parentNode.id}`)

//   //clear any previous hovers ... remove elements with class hover?
//   clearHovers()

//   //parse the event target id
//   let targetRegion = event.target.id
//   // console.log(targetRegion)
//   //three lines below could probably be combined into one with method chaining
//   let gridTargetArr = targetRegion.split('-')
//   let gridTarget = gridTargetArr[gridTargetArr.length - 1]
//   let gridTargetNum = parseInt(gridTarget)
//   // console.log(`${gridTargetNum} is a ${typeof gridTargetNum}`)

//   //select the parent grid
//   let parentGrid = document.querySelector(`#${event.target.parentNode.id}`)
//   // console.log(parentGrid.id)
//   //read through the currentET for regions and place them onto the tmap at target
//   for (let i = 1; i < 17; i++) {
//     let newHoverRegion = document.createElement('div')
//     // newHoverRegion.id = `et-r${i}`
//     newHoverRegion.classList = 'region'
//     newHoverRegion.classList.add(`hover`)
//     // console.log(currentET.regions)
//     let regionPresence = currentET.regions.includes(i)
//     newHoverRegion.classList.add(`region-${regionPresence}`)
//     newHoverRegion.style.zIndex = -1
//     if (regionPresence === true) {
//       newHoverRegion.style.backgroundColor = 'rgba(0, 255, 0, 0.4)'
//     }

//     //transpose etRegion to eRegionTarget (on tm Grid)
//     ///this might need some clean up
//     let eRegionTargetNum = i + gridTargetNum - 2
//     if (eRegionTargetNum > 16) {
//       clearHovers()
//       return console.log(`Illegal placement`)
//     }
//     let eRegionTarget = eRegionTargetNum.toString()
//     newHoverRegion.classList.add(`r-${eRegionTarget}`)

//     parentGrid.appendChild(newHoverRegion)
//   }

//   //check if hover is legal
//   // let allHoverTrue = document.querySelectorAll('.hover.region-true')
//   // if (allHoverTrue.length !== currentET.regions.length) {
//   //   console.log('Illegal tile placement')
//   //   clearHovers()
//   // }

//   //build the currentET active region grid
//   //place(?)the (opacity=0.5?) etGrid OVER (z-index=1?) the tm-grid starting at the mouse hover region
//   //give the new element class "hover" so it can be cleared when the mouse moves
// }

// const clearHovers = () => {
//   let previousHovers = document.querySelectorAll('.hover')
//   previousHovers.forEach((previousHover) => {
//     previousHover.remove()
//   })
// }

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
  let targetCard1 = event.target.closest('.card').title
  let targetCardNum = titleParser(targetCard1)

  //check if legal - grab tmcard object.regions array

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
  ////////////NOW YOU CAN///////////////////
  ///b/c event listener only listens for active player .region (rather than .region-true)
  ////but, the hover/mouseover/highlight will help the above be less confusing to the user
  if (isLegal) {
    console.log('that placement works!')
    //grab the target card, update each of it's regions in the transposedETCoordinates array
    let targetCardID = event.target.closest('.card').id
    transposedETCoordinates.forEach((coordinate) => {
      let updateRegion = document.querySelector(
        `#${targetCardID}-r-${coordinate}`
      )

      updateRegion.classList.remove('region-true')
      updateRegion.classList.add('region-marked')
      updateRegion.innerText = 'X'
    })

    //check for tm completetion
    let regionsMarked = 0
    let regionsFalse = 0
    for (let i = 0; i < 16; i++) {
      if (targetGridRegions[i].classList.value.includes('region-marked')) {
        regionsMarked++
      } else if (
        targetGridRegions[i].classList.value.includes('region-false')
      ) {
        regionsFalse++
      }
    }
    if (regionsMarked + regionsFalse === 16) {
      console.log(`card complete worth ${regionsMarked}`)
    }
    //--if yes - score card, move to complete area, offer player to select a global-avail tm card
    //then check for et/round(?) complettion... if last player has gone, flip new explore tile and start new round
    //--then pass turn - current player=next player, (alert/highlight?)
  }
}

const gameSetup = () => {
  shuffledTMDeck = shuffle(tmDeck)
  shuffledETDeck = shuffle(etDeck)

  //deal starting cards to players
  let startingCards = document.querySelectorAll('.activeTM.card')
  for (let i = 0; i < startingCards.length; i++) {
    dealTM(startingCards[i].id)
  }

  //ensure that only 2 cards are clicked for return
  let numReturned = 0
  const returnToTMDeck = (event) => {
    // console.log(event.currentTarget.id)
    //remove card rendering from card area
    event.currentTarget.title = ''
    event.currentTarget.innerHTML = ''

    //put card back in shuffledTMDeck
    let targetNum = titleParser(event.currentTarget.title)
    let returnCard = tmDeckCopy[targetNum - 1]
    shuffledTMDeck.push(returnCard)
    shuffledTMDeck = shuffle(shuffledTMDeck)

    //update TM Cards Left
    tmDeckRendering.innerText = `TM Cards Left: ${shuffledTMDeck.length}`

    //check if that was the second discard
    numReturned++
    if (numReturned === 2) {
      //remove other event listeners
      card1.removeEventListener('click', returnToTMDeck)
      card2.removeEventListener('click', returnToTMDeck)
      card3.removeEventListener('click', returnToTMDeck)
      card4.removeEventListener('click', returnToTMDeck)

      //cleanup tm area
      if (card1.title === '' && card2.title === '') {
        card2.title = card3.title
        card2.innerHTML = card3.innerHTML
        card3.title = card4.title
        card3.innerHTML = card4.innerHTML
        card4.title = ''
        card4.innerHTML = ''
      } else if (card1.title === '' && card3.title === '') {
        card3.title = card4.title
        card3.innerHTML = card4.innerHTML
        card4.title = ''
        card4.innerHTML = ''
      } else if (card2.title === '' && card3.title === '') {
        card2.title = card1.title
        card2.innerHTML = card1.innerHTML
        card1.title = ''
        card1.innerHTML = ''
        card3.title = card4.title
        card3.innerHTML = card4.innerHTML
        card4.title = ''
        card4.innerHTML = ''
      } else if (card2.title === '' && card4.title === '') {
        card2.title = card1.title
        card2.innerHTML = card1.innerHTML
        card1.title = ''
        card1.innerHTML = ''
      } else if (card3.title === '' && card4.title === '') {
        card3.title = card2.title
        card3.innerHTML = card2.innerHTML
        card2.title = card1.title
        card2.innerHTML = card1.innerHTML
        card1.title = ''
        card1.innerHTML = ''
      }
      //remove rendering of card 1 & 4
      card1.classList.add('inactive-card')
      card1.classList.remove('card')
      card4.classList.add('inactive-card')
      card4.classList.remove('card')
      //change status message
      statusMessage.innerText = `Player set up complete`
      //pass current player to next player
      //if all players have set up
      if (statusMessage) {
        //change this if you add 2 players
        //deal avail tm cards
        dealTM('global-tm1')
        dealTM('global-tm2')
        dealTM('global-tm3')
        dealTM('global-tm4')
        //initiate player turn round 1
        playerTurn()
      }
    }
  }

  //Prompt players to click two cards to discard
  // for (let i = 1; i <= playerCount; i++) {
  // statusMessage.innerText = `Player ${i}: Click TWO Treasure Maps from your "Active Treasure Maps" area to discard`
  statusMessage.innerText = `Player: Click TWO Treasure Maps from your "Active Treasure Maps" area to discard`
  // let card1 = document.querySelector(`#player-${i}-tm1`)

  //event listeners for each card during discard - can only be clicked once
  let card1 = document.querySelector(`#player-1-tm1`)
  card1.addEventListener('click', returnToTMDeck, { once: true })
  let card2 = document.querySelector(`#player-1-tm2`)
  card2.addEventListener('click', returnToTMDeck, { once: true })
  let card3 = document.querySelector(`#player-1-tm3`)
  card3.addEventListener('click', returnToTMDeck, { once: true })
  let card4 = document.querySelector(`#player-1-tm4`)
  card4.addEventListener('click', returnToTMDeck, { once: true })
}

const playerTurn = () => {
  statusMessage.innerText =
    'Player turn: place explore tile on an Active Treasure Map to explore'
  dealET()
  //at some point... early... maybe just another button in the html that goes in the global-explore area
  //////MUST offer to explore a single region (rather than use the avail tile)
  ////as per game rules, this should always be available
}

const getPlayerCount = () => {
  let playerCountInput = prompt(
    'This game is meant for 2-4 players, but can be played with 1. How many players should I set up?'
  ).toLowerCase()
  switch (playerCountInput) {
    case 'one':
    case '1':
      playerCount = 1
      break
    case 'two':
    case '2':
      playerCount = 2
      break
    case 'three':
    case '3':
      playerCount = 3
      break
    case 'four':
    case '4':
      playerCount = 4
      break
    default:
      confirm(
        'that is not a valid input, please specify the number of players from 1-4'
      )
      gameControl()
  }
}

////////////////////////////////////
//Game Control
////////////////////////////////////
const gameControl = () => {
  // //put this back in for final version
  // getPlayerCount()
  //at playerCount 3, the css can't handle the space and pushes things off the ends of the windows
  //if we REALLY want to have players 3 & 4, maybe need to put them on a new row in body flexbox
  playerCount = 1
  playerSetup(playerCount)
  // playerCount
  gameSetup()
  //playerTurn only called at end of game setup, after global tms are dealt
}

////////////////////////////////////
//EVENT LISTENERS//
////////////////////////////////////

//run game control function when document loads
// window.addEventListener('load', gameControl)
gameControl()
//isolate avtive regions ('.region-true') of current player tms area (e.g., 'p1-tms-area')
const currentPlayerTMareaID = `${currentPlayer}-tms-area`
const allActiveRegions = document.querySelectorAll(
  `#${currentPlayerTMareaID} .region`
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
