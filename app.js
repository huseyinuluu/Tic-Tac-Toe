const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startDisplay = document.querySelector("#restart")
const startCells = [
  "", "", "", "", "", "", "", "", ""
]
let go = "O"
infoDisplay.textContent = "O ile başlar"


function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addGo)
    gameBoard.append(cellElement)
  })
}
createBoard()

function addGo(e) {
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === "O" ? "X" : "O"
  if (go==="O"){

    infoDisplay.textContent = go + "'nun sırası"
  }
  else {
    infoDisplay.textContent = go + "'in sırası"
  }
  e.target.removeEventListener("click", addGo)
  checkScore()
}
function checkScore() {
  const allSquares = document.querySelectorAll(".square")
  const winnigCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]


  winnigCombos.forEach(array => {
    const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('O'))
    
    if (circleWins) {
      infoDisplay.textContent = "O Kazandı!"
      startDisplay.textContent = "Tekrar Oynamak için Sayfayı Yenileyin"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  winnigCombos.forEach(array => {
    const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('X'))
    
    if (crossWins) {
      infoDisplay.textContent = "X  Kazandı!"
      startDisplay.textContent = "Tekrar Oynamak için Sayfayı Yenileyin"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

}

