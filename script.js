function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Square());
        }
    }

    const getBoard = () => board;

    const markSquare = (column, player) => {
        const availableSquares = board.filter((row) => 
        row[column].getValue() === 0).map(row => row[column]);

        if(!availableSquares.length) return;

        const lowestRow = availableSquares.length - 1;
        board[lowestRow][column].addMark(player);
    };

    const renderBoard = () => {
        const boardWithMarks = board.map((row) =>
        row.map((square) = square.getValue()))
        console.log(boardWithMarks);
    };

    return {getBoard, markSquare, renderBoard};
}

function Square() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 1
        },
        {
            name: playerTwoName,
            mark: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : player[0];
    };
    const getActivePlayer = () => activePlayer;

    const renderNewRound = () => {
        board.renderBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(
            `Adding ${getActivePlayer().name}'s mark to row ${row} column ${column}`
        );
        board.markSquare(column, getActivePlayer().mark);

        // ADD WIN LOGIC HERE

        switchPlayerTurn();
        renderNewRound();
    };

    renderNewRound();

    return {
        playRound, getActivePlayer, getBoard: board.getBoard
    };
}