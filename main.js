// console.log('js is running')
////////////////////////////////////
//IMPORTS//
////////////////////////////////////
import { tMapsDeck } from './js_modules/treasureMapsDeck.js'
import { eTilesDeck } from './js_modules/explorationTilesDeck.js'

let testTM = tMapsDeck[39]
console.log(`test id: ${testTM.id}`)

////////////////////////////////////
//GLOBAL VARIABLES//
////////////////////////////////////
// let roundNum, startPlayer, currentPlayer

////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////
//Shuffle deck
//lesson & visualization: https://bost.ocks.org/mike/shuffle/
//Fisher-Yates Shuffle
//imow: build shuflled array backwards: pick random index, switch with last, new range = last--
const shuffle = (deck) => {
  //rewrite this to make it more succinct
  let unshuffledLength = deck.length
  while (unshuffledLength !== 0) {
    let randomIndex = Math.floor(Math.random() * unshuffledLength)
    unshuffledLength--
    let lastUnshuffled = deck[unshuffledLength]
    deck[unshuffledLength] = deck[randomIndex] //move a random to the end
    deck[randomIndex] = lastUnshuffled //move the end to the middle to be shuffled later
  }
  return deck
}
////////////////////////////////
// //calling the shuffle function
// //rewrite this to make it more succinct
const shuffledTMapsDeck = shuffle(tMapsDeck)
const shuffledETilesDeck = shuffle(eTilesDeck)
/////////////////////////////////

//dealET
const dealET = () => {
  let nextET = shuffledETilesDeck.shift()
  console.log(nextET.id)
  console.log(nextET.regions)

  document.querySelector('#explore-tile-grid').innerHTML = ''
  for (let i = 1; i < 7; i++) {
    let newRegion = document.createElement('div')
    newRegion.innerHTML = `<div class="et region r${i} ${nextET.regions.includes(
      i
    )}"</div>`
    let newETile = document.querySelector('#explore-tile-grid')
    newETile.appendChild(newRegion)
  }
}
const dealnewET = setTimeout(dealET(), 1000)
dealnewET
dealnewET
dealnewET
dealnewET

//dealTM
/// eventually set this to accept arguments to target elements by class///
const dealTM = (destinationID) => {
  let nextTM = shuffledTMapsDeck.shift()
  // let nextTM = testTM
  let suitClass
  switch (nextTM.suit) {
    case 14:
      suitClass = 'fourteen'
      break
    case 12:
      suitClass = 'twelve'
      break
    case 10:
      suitClass = 'ten'
      break
    case 8:
      suitClass = 'eight'
      break
  }
  let bonusClass, bonusValue
  switch (nextTM.bonusSuit) {
    case 14:
      bonusClass = 'fourteen'
      bonusValue = 2
      break
    case 12:
      bonusClass = 'twelve'
      bonusValue = 2
      break
    case 10:
      bonusClass = 'ten'
      bonusValue = 1
      break
    case 8:
      bonusClass = 'eight'
      bonusValue = 1
      break
    default:
      bonusClass = ''
      bonusValue = ''
  }

  let destination = document.querySelector(`#${destinationID}`)
  destination.innerHTML = `
  <div class="tm top p2 active1">
          <div class="tm suit ${suitClass}">${nextTM.suit} ${nextTM.id}</div>
          <div class="tm bonus ${bonusClass}">${bonusValue}</div>
        </div>
        <div class="tm grid">
          <div class="tm region r1 ${nextTM.regions.includes(
            1
          )} banana-${nextTM.bananaRegions.includes(
    1
  )} gem-${nextTM.gemRegions.includes(
    1
  )} coconut-${nextTM.coconutRegions.includes(1)}"></div>
          <div class="tm region r2 ${nextTM.regions.includes(
            2
          )} banana-${nextTM.bananaRegions.includes(
    2
  )} gem-${nextTM.gemRegions.includes(
    2
  )} coconut-${nextTM.coconutRegions.includes(2)}"></div>
          <div class="tm region r3 ${nextTM.regions.includes(
            3
          )} banana-${nextTM.bananaRegions.includes(
    3
  )} gem-${nextTM.gemRegions.includes(
    3
  )} coconut-${nextTM.coconutRegions.includes(3)}"></div>
          <div class="tm region r4 ${nextTM.regions.includes(
            4
          )} banana-${nextTM.bananaRegions.includes(
    4
  )} gem-${nextTM.gemRegions.includes(
    4
  )} coconut-${nextTM.coconutRegions.includes(4)}"></div>
          <div class="tm region r5 ${nextTM.regions.includes(
            5
          )} banana-${nextTM.bananaRegions.includes(
    5
  )} gem-${nextTM.gemRegions.includes(
    5
  )} coconut-${nextTM.coconutRegions.includes(5)}"></div>
          <div class="tm region r6 ${nextTM.regions.includes(
            6
          )} banana-${nextTM.bananaRegions.includes(
    6
  )} gem-${nextTM.gemRegions.includes(
    6
  )} coconut-${nextTM.coconutRegions.includes(6)}"></div>
          <div class="tm region r7 ${nextTM.regions.includes(
            7
          )} banana-${nextTM.bananaRegions.includes(
    7
  )} gem-${nextTM.gemRegions.includes(
    7
  )} coconut-${nextTM.coconutRegions.includes(7)}"></div>
          <div class="tm region r8 ${nextTM.regions.includes(
            8
          )} banana-${nextTM.bananaRegions.includes(
    8
  )} gem-${nextTM.gemRegions.includes(
    8
  )} coconut-${nextTM.coconutRegions.includes(8)}"></div>
          <div class="tm region r9 ${nextTM.regions.includes(
            9
          )} banana-${nextTM.bananaRegions.includes(
    9
  )} gem-${nextTM.gemRegions.includes(
    9
  )} coconut-${nextTM.coconutRegions.includes(9)}"></div>
          <div class="tm region r10 ${nextTM.regions.includes(
            10
          )} banana-${nextTM.bananaRegions.includes(
    10
  )} gem-${nextTM.gemRegions.includes(
    10
  )} coconut-${nextTM.coconutRegions.includes(10)}"></div>
          <div class="tm region r11 ${nextTM.regions.includes(
            11
          )} banana-${nextTM.bananaRegions.includes(
    11
  )} gem-${nextTM.gemRegions.includes(
    11
  )} coconut-${nextTM.coconutRegions.includes(11)}"></div>
          <div class="tm region r12 ${nextTM.regions.includes(
            12
          )} banana-${nextTM.bananaRegions.includes(
    12
  )} gem-${nextTM.gemRegions.includes(
    12
  )} coconut-${nextTM.coconutRegions.includes(12)}"></div>
          <div class="tm region r13 ${nextTM.regions.includes(
            13
          )} banana-${nextTM.bananaRegions.includes(
    13
  )} gem-${nextTM.gemRegions.includes(
    13
  )} coconut-${nextTM.coconutRegions.includes(13)}"></div>
          <div class="tm region r14 ${nextTM.regions.includes(
            14
          )} banana-${nextTM.bananaRegions.includes(
    14
  )} gem-${nextTM.gemRegions.includes(
    14
  )} coconut-${nextTM.coconutRegions.includes(14)}"></div>
          <div class="tm region r15 ${nextTM.regions.includes(
            15
          )} banana-${nextTM.bananaRegions.includes(
    15
  )} gem-${nextTM.gemRegions.includes(
    15
  )} coconut-${nextTM.coconutRegions.includes(15)}"></div>
          <div class="tm region r16 ${nextTM.regions.includes(
            16
          )} banana-${nextTM.bananaRegions.includes(
    16
  )} gem-${nextTM.gemRegions.includes(
    16
  )} coconut-${nextTM.coconutRegions.includes(16)}"></div>
        </div>
        `
}
dealTM('p1-tm1')
dealTM('p1-tm2')
dealTM('p1-tm3')
dealTM('p1-tm4')
dealTM('tm1-avail')
dealTM('tm2-avail')
dealTM('tm3-avail')
dealTM('tm4-avail')
// console.log('js')

//deal the whole deck out
// let last
// while (shuffledTMapsDeck.length !== 0) {
//   last = shuffledTMapsDeck.pop()
//   // console.log(last.id)
//   // console.log(shuffledTMapsDeck.length)
//   shuffle(shuffledTMapsDeck)
// }

////////////////////////////////////
//EVENT LISTENERS//
////////////////////////////////////

////////////////////////////////////
//CLASSES//
////////////////////////////////////
