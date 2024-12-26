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