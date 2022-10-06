class Player {
  constructor(
    playerNum,
    totalScore,
    completeMapsScore,
    bonusScore
    // add gems, bananas, and coconuts later
  ) {
    this.playerNum = playerNum
    this.totalScore = totalScore
    this.completeMapsScore = completeMapsScore
    this.bonusScore = bonusScore
  }
}

const playersArr = []
const playerSetup = (num) => {
  if (num > 0) {
    const player1 = new Player(1, 0, 0, 0)
    playersArr.push(player1)
  }
  if (num > 1) {
    const player2 = new Player(2, 0, 0, 0)
    playersArr.push(player2)
  }
  if (num > 2) {
    const player3 = new Player(3, 0, 0, 0)
    playersArr.push(player3)
  }
  if (num > 3) {
    const player4 = new Player(4, 0, 0, 0)
    playersArr.push(player4)
  }
}

export { playerSetup, playersArr }
