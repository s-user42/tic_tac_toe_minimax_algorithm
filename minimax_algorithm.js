

const isNoMoves = (board, ) => {
    for (var cell of board) 
        if (typeof cell == 'number') return false

    return true;
}

const evaluateBoard = (board, player = 'X', comp = 'O') => {
    let row = 0;
    let col = 0;

    while (row < 9) {
        if (board[row] === board[row + 1] && board[row] === board[row + 2]) {
            if (board[row] === comp) {
                return 10;
            }
            else if (board[row] === player) {
                return -10;
            }
        }
            
        row += 3;
    }

    while (col < 3) { 
        if (board[col] === board[col + 3] && board[col] === board[col + 6]) {
            if (board[col] === comp) {
                return 10;
            }
            else if (board[col] === player) {
                return -10;
            }
            
        }
        col += 1;
    }

    if ((board[4] === board[0] && board[4]=== board[8]) ||
    (board[4] === board[2] && board[4] === board[6])) {
        if (board[4] === comp) {
            return 10;
        }
        else if (board[4] === player) {
            return -10;
        }
    }

    return 0;
}



function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}


const minimax = (board, player, comp, depth, isComp) => {
    
    var availSpots = emptySquares();

    if (checkWin(board, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(board, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    var moves = [];

    for (var i = 0; i < 9; i++) {
        if (typeof board[i] == 'number') {
            var move = {};
            move.index = i;
            board[i] = player;
            if (isComp) {
                var res = minimax(board, 'X', 'O', depth + 1, !isComp);
                move.score = res.score;
            }
            else {
                var res = minimax(board, 'X', 'O', depth + 1, !isComp);
                move.score = res.score;
            }

            board[i] = move.index;
            moves.push(move);
        }
    }

    var bestMove;
    if (isComp) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];

    // if (isComp) {
    //     for (let i = 0; i < 9; i++) 
    //         if (board[i] === '' || board[i] === null) {
    //             board[i] = player;
    //             let res = minimax(board, player, comp, depth + 1, !isComp);
    //             if (res > best) {best = res};
    //             board[i] = '';
    //         }
    //     return best;
    // }
    // else {
    //     for (let i = 0; i < 9; i++)
    //         if (board[i] === '' || board[i] === null) {
    //             board[i] = comp;
    //             let res = minimax(board, player, comp, depth + 1, !isComp);
    //             if (res < best) {best = res};
    //             board[i] = '';
    //         }
    //     return best;
    // }

}

// const findBestMov = (board, player, comp) => {
//     let bestMov = -1;
//     let bestScore = -1000;

//     for (let i = 0; i < board.length; i++) {
//         if (!board[i]) {
//             board[i] = comp;
//             console.log(minimax(board, player, comp, 0, true, i), '', i)
//             let minimaxResult = minimax(board, player, comp, 0, true, i);

//             if (minimaxResult > bestScore)  {
//                 bestMov = i; 
//                 bestScore = minimaxResult;
//             }
//             board[i] = '';
//         }
//     }
//     return bestMov;
// }

export { minimax }


