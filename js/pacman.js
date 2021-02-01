'use strict'
const PACMAN = '$';
const PACMAN_IMG = '<img src="img/pacman.png" />';

var gPacman;
var gIsSuperFood;
var gRemovedGhosts = [];
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    gFoodCount--;
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCount--;
        console.log('gFoodCount:', gFoodCount)
        if (isVictory()) {
            gWonOrEaten = true;
            // TODO: update the model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            // TODO: update the DOM
            renderCell(gPacman.location, EMPTY, false)
            // TODO: Move the pacman
            gPacman.location = { i: nextLocation.i, j: nextLocation.j }
            // TODO: update the model
            gBoard[nextLocation.i][nextLocation.j] = PACMAN
            // TODO: update the DOM
            renderCell(nextLocation, PACMAN, true);
            gameOver();
            return
        }
    }
    
    if (nextCell === SUPER_FOOD) {
        gFoodCount--;
        if (isVictory()) {
            gWonOrEaten = true;
            // TODO: update the model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            // TODO: update the DOM
            renderCell(gPacman.location, EMPTY, false)
            // TODO: Move the pacman
            gPacman.location = { i: nextLocation.i, j: nextLocation.j }
            // TODO: update the model
            gBoard[nextLocation.i][nextLocation.j] = PACMAN
            // TODO: update the DOM
            renderCell(nextLocation, PACMAN, true);
            gameOver();
            return
        }
        console.log('gFoodCount:', gFoodCount)
        if (!gIsSuperFood) {
            gIsSuperFood = true;
            setTimeout(function () {
                gIsSuperFood = false;
                if (gRemovedGhosts.length >= 1) {
                    for (var i = 0; i < gRemovedGhosts.length; i++) {
                        var currGhost = gRemovedGhosts[i];
                        currGhost.currCellContent = EMPTY;
                        gGhosts.push(currGhost);
                        renderCell(currGhost.location, GHOST);
                    }
                }
            }, 5000);
        }
        else return;
    }

    // TODO: hitting a ghost while super food?  
    if (nextCell === GHOST && gIsSuperFood) {
        for (var i = 0; i < gGhosts.length; i++) {
            var currI = gGhosts[i].location.i;
            var currJ = gGhosts[i].location.j;
            if (currI === nextLocation.i && currJ === nextLocation.j) {
                var extracedGhost = gGhosts.splice(i, 1);
                var ghostObject = extracedGhost[0];
                gRemovedGhosts.push(ghostObject);
            }
        }
    }

    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST && !gIsSuperFood) {
        gameOver()
        return
    }

    if (nextCell === CHERRY) {
        updateScore(10);
    }
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY, false)
    // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // TODO: update the DOM
    renderCell(nextLocation, PACMAN, true)
}


// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
    }
    return nextLocation;
}