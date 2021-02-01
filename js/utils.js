function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + ' transition"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value,isAddOrRemove) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  if(isAddOrRemove)elCell.classList.add('transiton');
  else elCell.classList.remove('transiton');
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // var emojis = ['👽', '👻', '👾'];
  // var idx = getRandomIntInclusive(0, 2);
  // var color=emojis[idx];
  return color;
}

function randomEmptyCell() {
  // var i = getRandomIntInclusive(0, 9);
  // var j = getRandomIntInclusive(0, 9);
  // while (gBoard[i][j] !== EMPTY) {
  //   i = getRandomIntInclusive(0, 9);
  //   j = getRandomIntInclusive(0, 9);
  // }
  var res = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) res.push({ i: i, j: j });
    }
  }
  var randomIdx = getRandomIntInclusive(0, res.length - 1);
  return res[randomIdx];
}