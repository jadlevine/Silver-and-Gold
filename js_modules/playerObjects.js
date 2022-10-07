class Player {
  constructor(
    playerNum,
    totalScore,
    completedMapsScore,
    bonusScore,
    bonusesEarned,
    completed14s,
    completed12s,
    completed10s,
    completed8s
    // add gems, bananas, and coconuts later
  ) {
    this.num = playerNum
    this.id = `player-${playerNum}`
    this.totalScore = totalScore
    this.completedMapsScore = completedMapsScore
    this.bonusScore = bonusScore
    this.bonusesEarned = bonusesEarned
    this.completed14s = completed14s
    this.completed12s = completed12s
    this.completed10s = completed10s
    this.completed8s = completed8s
  }
}

const playersArr = []
const playerSetup = (num) => {
  if (num > 0) {
    const player1 = new Player(1, 0, 0, 0, [], [], [], [], [])
    playersArr.push(player1)
    renderPlayerHTML(player1)
  }
  if (num > 1) {
    const player2 = new Player(2, 0, 0, 0, [], [], [], [], [])
    playersArr.push(player2)
    renderPlayerHTML(player2)
  }
  if (num > 2) {
    const player3 = new Player(3, 0, 0, 0, [], [], [], [], [])
    playersArr.push(player3)
    renderPlayerHTML(player3)
  }
  if (num > 3) {
    const player4 = new Player(4, 0, 0, 0, [], [], [], [], [])
    playersArr.push(player4)
    renderPlayerHTML(player4)
  }
}

const renderPlayerHTML = (player) => {
  //Player 1 area
  let newPlayerArea = document.createElement('div')
  newPlayerArea.id = `${player.id}-area`
  newPlayerArea.classList = 'player-area'

  //player 1 score area
  let playerScoreArea = document.createElement('div')
  playerScoreArea.id = `${player.id}-score-area`
  playerScoreArea.classList = 'player-score-area'

  //player 1 active tm area
  let playerTMsArea = document.createElement('div')
  playerTMsArea.id = `${player.id}-tms-area`
  playerTMsArea.classList = 'player-tms-area'

  //player 1 completed tm area
  let playerCompletedTMsArea = document.createElement('div')
  playerCompletedTMsArea.id = `${player.id}-completed-tms-area`
  playerCompletedTMsArea.classList = 'player-completed-tms-area'

  //player 1 score area items

  //Player Header
  let playerHeader = document.createElement('h3')
  playerHeader.id = `${player.id}-header`
  playerHeader.classList = 'player-header'
  playerHeader.innerText = `Player\n${player.num}`
  playerScoreArea.appendChild(playerHeader)

  //Total Score Area
  let playerTotalScoreArea = document.createElement('div')
  playerTotalScoreArea.id = `${player.id}-score-item-total`
  playerTotalScoreArea.classList = 'player-score-item total'
  ////Total Score Title
  let playerTotalScoreTitle = document.createElement('div')
  playerTotalScoreTitle.id = `${player.id}-score-total-title`
  playerTotalScoreTitle.classList = 'player-score total title'
  playerTotalScoreTitle.innerText = 'Total Score'
  playerTotalScoreArea.appendChild(playerTotalScoreTitle)
  ////Total Score
  let playerTotalScore = document.createElement('div')
  playerTotalScore.id = `${player.id}-score-total`
  playerTotalScore.classList = 'player-score total'
  playerTotalScore.innerText = `${player.totalScore}`
  playerTotalScoreArea.appendChild(playerTotalScore)
  //Total Score
  playerScoreArea.appendChild(playerTotalScoreArea)

  //Completed TMs Score Area
  let playerCompletedTMsScoreArea = document.createElement('div')
  playerCompletedTMsScoreArea.id = `${player.id}-score-item-completedTMs`
  playerCompletedTMsScoreArea.classList = 'player-score-item completedTMs'
  ////Completed TMs Score Title
  let playerCompletedTMsScoreTitle = document.createElement('div')
  playerCompletedTMsScoreTitle.id = `${player.id}-score-completedTMs-title`
  playerCompletedTMsScoreTitle.classList = 'player-score completedTMs title'
  playerCompletedTMsScoreTitle.innerText = 'Completed Maps Score'
  playerCompletedTMsScoreArea.appendChild(playerCompletedTMsScoreTitle)
  ////Completed TMs Score
  let playerCompletedTMsScore = document.createElement('div')
  playerCompletedTMsScore.id = `${player.id}-score-completedTMs`
  playerCompletedTMsScore.classList = 'player-score total CompletedTMs'
  playerCompletedTMsScore.innerText = `${player.completedMapsScore}`
  playerCompletedTMsScoreArea.appendChild(playerCompletedTMsScore)
  //Completed TMs Score Area
  playerScoreArea.appendChild(playerCompletedTMsScoreArea)

  //Bonus Score Area
  let playerBonusScoreArea = document.createElement('div')
  playerBonusScoreArea.id = `${player.id}-score-item-Bonus`
  playerBonusScoreArea.classList = 'player-score-item Bonus'
  ////Bonus Score Title
  let playerBonusScoreTitle = document.createElement('div')
  playerBonusScoreTitle.id = `${player.id}-score-Bonus-title`
  playerBonusScoreTitle.classList = 'player-score Bonus title'
  playerBonusScoreTitle.innerText = 'Bonus Score'
  playerBonusScoreArea.appendChild(playerBonusScoreTitle)
  ////Bonus Score
  let playerBonusScore = document.createElement('div')
  playerBonusScore.id = `${player.id}-score-Bonus`
  playerBonusScore.classList = 'player-score total Bonus'
  playerBonusScore.innerText = `${player.bonusScore}`
  playerBonusScoreArea.appendChild(playerBonusScore)
  ////Bonus Score Area
  playerScoreArea.appendChild(playerBonusScoreArea)

  //player 1 tms area items
  //Active Maps Header
  let activeMapsHeader = document.createElement('h5')
  activeMapsHeader.id = `${player.id}-activemaps-header`
  activeMapsHeader.classList = 'player-header activeTM'
  activeMapsHeader.innerText = `Active\nTreasure\nMaps`
  playerTMsArea.appendChild(activeMapsHeader)
  //player 1 tm1
  let playerTM1 = document.createElement('div')
  playerTM1.id = `${player.id}-tm1`
  playerTM1.classList = 'card activeTM'
  playerTMsArea.appendChild(playerTM1)
  //player 1 tm2
  let playerTM2 = document.createElement('div')
  playerTM2.id = `${player.id}-tm2`
  playerTM2.classList = 'card activeTM'
  playerTMsArea.appendChild(playerTM2)
  //player 1 tm3
  let playerTM3 = document.createElement('div')
  playerTM3.id = `${player.id}-tm3`
  playerTM3.classList = 'card activeTM'
  playerTMsArea.appendChild(playerTM3)
  //player 1 tm4
  let playerTM4 = document.createElement('div')
  playerTM4.id = `${player.id}-tm4`
  playerTM4.classList = 'card activeTM'
  playerTMsArea.appendChild(playerTM4)

  //player 1 completed tms items
  //Completed Maps Header
  let completedMapsHeader = document.createElement('h6')
  completedMapsHeader.id = `${player.id}-completedmaps-header`
  completedMapsHeader.classList = 'player-header completedTM'
  completedMapsHeader.innerText = `Completed\nTreasure\nMaps`
  playerCompletedTMsArea.appendChild(completedMapsHeader)
  //player 1 completed tm8s
  let playerCompletedTM8 = document.createElement('div')
  playerCompletedTM8.id = `${player.id}-completed-tm8s`
  playerCompletedTM8.classList = 'card tm completedTM'
  playerCompletedTMsArea.appendChild(playerCompletedTM8)
  //player 1 completed tm10s
  let playerCompletedTM10 = document.createElement('div')
  playerCompletedTM10.id = `${player.id}-completed-tm10s`
  playerCompletedTM10.classList = 'card tm completedTM'
  playerCompletedTMsArea.appendChild(playerCompletedTM10)
  //player 1 completed tm12s
  let playerCompletedTM12 = document.createElement('div')
  playerCompletedTM12.id = `${player.id}-completed-tm12s`
  playerCompletedTM12.classList = 'card tm completedTM'
  playerCompletedTMsArea.appendChild(playerCompletedTM12)
  //player 1 completed tm14s
  let playerCompletedTM14 = document.createElement('div')
  playerCompletedTM14.id = `${player.id}-completed-tm14s`
  playerCompletedTM14.classList = 'card tm completedTM'
  playerCompletedTMsArea.appendChild(playerCompletedTM14)

  //build the player area
  newPlayerArea.appendChild(playerScoreArea)
  newPlayerArea.appendChild(playerTMsArea)
  newPlayerArea.appendChild(playerCompletedTMsArea)

  //append player area to hard coded HTML - '#players-area'
  let playersArea = document.querySelector('#players-area')
  playersArea.appendChild(newPlayerArea)
}

export { playerSetup, playersArr }
