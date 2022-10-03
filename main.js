console.log('js is running')
////////////////////////////////////
//IMPORTS//
////////////////////////////////////
import { tMapsDeck } from './js_modules/treasureMapsDeck.js'
import { eTilesDeck } from './js_modules/explorationTilesDeck.js'

// console.log(tMapsDeck)
// console.log(eTilesDeck)

////////////////////////////////////
//GLOBAL VARIABLES//
////////////////////////////////////
// let roundNum, startPlayer, currentPlayer

////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////
//Shuffle deck
//lesson & visualization: https://bost.ocks.org/mike/shuffle/
//punchline: shuffle by picking a random index, swapping it with the last index, then pick another random from the unshuffled ones, build new array from back to front
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

//calling the shuffle function
//rewrite this to make it more succinct
const shuffledTMapsDeck = shuffle(tMapsDeck)
const shuffledETilesDeck = shuffle(eTilesDeck)
// console.log(shuffledTMapsDeck[shuffledTMapsDeck.length - 1].id)
// // console.log(shuffledETilesDeck)
// shuffledETilesDeck.forEach((element) => {
//   // console.log(element.id)
// })
// shuffledTMapsDeck.forEach((element) => {
//   console.log(element.id)
// })

//deal the whole deck out
let last
while (shuffledTMapsDeck.length !== 0) {
  last = shuffledTMapsDeck.pop()
  console.log(last.id)
  console.log(shuffledTMapsDeck.length)
  shuffle(shuffledTMapsDeck)
}

////////////////////////////////////
//EVENT LISTENERS//
////////////////////////////////////

////////////////////////////////////
//CLASSES//
////////////////////////////////////
