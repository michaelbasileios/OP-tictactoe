//GAMEBOARD
const Gameboard = (() => {
    const gameBoard = document.querySelector('#gameboard');

    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;

    const renderBoard = () => {
        let boardHTML = ''; //This variable is important because otherwise we end up creating more squares than there are elements in the array on subsequent calls of the render function.
        board.forEach((square, index) => { 
            boardHTML += `<div class="board-square" data-index=${index}>${square}</div>`;
        })
        gameBoard.innerHTML = boardHTML;
        const squares = document.querySelectorAll(".board-square");
        squares.forEach((square) => {
            square.addEventListener("click", () => {
                GameController.clickHandle(square);
            })
        })
    };

    return {getBoard, renderBoard};
})();

//GAME CONTROLLER
const GameController = (() => {
    const createPlayer = (name, mark) => {
        return {name, mark};
    }
    let board = Gameboard.getBoard();
    let activePlayer; 
    let activePlayerIndex;
    let gameOver;
    let players = [];
    let rounds = 0;
    let wins = [0, 0];

    const getActivePlayer = () => activePlayer;
    const getRounds = () => rounds;
    const getWins = () => wins;
    
    
    const gameStart = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ];
        activePlayer = players[0];
        gameOver = false;
        Gameboard.renderBoard();
        ScreenController.displayActivePlayer();
        ScreenController.displayScore();
    }

    const gameRestart = () => {
        for (i = 0; i < board.length; i++) {
            board[i] = "";
        }
        players = [];
        gameStart();
        Gameboard.renderBoard();
    }

    const switchPlayerTurn = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
        activePlayerIndex = activePlayer === players[0] ? 0 : 1;
    }

    const clickHandle = (square) => {
        let arrayIndex = square.dataset.index;
        if(board[arrayIndex] === "") {
            board.splice(arrayIndex, 1, activePlayer.mark);
        } else return;
        Gameboard.renderBoard();
        if(tieCheck(board)) {
            gameOver = true;
            rounds++;
            setTimeout(() => {
                alert("It's a tie!");
                gameRestart();
            }, 0);
        } else if(winCheck(board)) {
            gameOver = true;
            rounds++;
            wins[activePlayerIndex]++;
            setTimeout(() => {
                alert(`${activePlayer.name} won!`);
                gameRestart();
            }, 0)
        } 
        else 
        switchPlayerTurn();
        ScreenController.displayActivePlayer();
    }

    const winCheck = (board) => {
        const winCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];
        for (let i = 0; i < winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        } return false;
    }

    const tieCheck = (board) => {
       return board.every(mark => mark) && !winCheck(board);
    }
    return {gameStart, gameRestart, clickHandle, getActivePlayer, getRounds, getWins};
})();


//SCREEN CONTROLLER
const ScreenController = (() => {
    const startBtn = document.querySelector("#start-button");
    const restartBtn = document.querySelector("#restart-button");
    const messageDiv = document.querySelector("#message");
    const resultDisplay = document.querySelector("#result-display");
    startBtn.addEventListener("click", () => GameController.gameStart());
    restartBtn.addEventListener("click", () => GameController.gameRestart());

    const displayActivePlayer = () => {
        messageDiv.innerHTML = `${GameController.getActivePlayer().name}'s turn`;
    }

    const displayScore = () => {
        scoreDiv = `<h2>Player 1 score: ${GameController.getWins()[0]}</h2>
                    <h2>Player 2 score: ${GameController.getWins()[1]}</h2>
                    <h2>Round: </h2>`;
        resultDisplay.innerHTML = scoreDiv;
    }

    return {displayActivePlayer, displayScore};
})();


// function Square() {
//     let value = 0;

//     const addMark = (player) => {
//         value = player;
//     };

//     const getValue = () => value;

//     return {
//         addMark,
//         getValue
//     };
// }

// function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
//     const board = Gameboard();

//     const players = [
//         {
//             name: playerOneName,
//             mark: 1
//         },
//         {
//             name: playerTwoName,
//             mark: 2
//         }
//     ];

//     let activePlayer = players[0];

//     const switchPlayerTurn = () => {
//         activePlayer = activePlayer === players[0] ? players[1] : player[0];
//     };
//     const getActivePlayer = () => activePlayer;

//     const renderNewRound = () => {
//         board.renderBoard();
//         console.log(`${getActivePlayer().name}'s turn.`);
//     };

//     const playRound = (row, column) => {
//         console.log(
//             `Adding ${getActivePlayer().name}'s mark to row ${row} column ${column}`
//         );
//         board.markSquare(column, getActivePlayer().mark);

//         // ADD WIN LOGIC HERE

//         switchPlayerTurn();
//         renderNewRound();
//     };

//     renderNewRound();

//     return {
//         playRound, getActivePlayer, getBoard: board.getBoard
//     };
// }