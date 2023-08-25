let usersObj = JSON.parse(localStorage.getItem("usersObj"));
let scoresArray = Object.values(usersObj);//set the object into an array

scoresArray = scoresArray.sort((a, b) => b['gamesWon'] - a['gamesWon']).slice(0, 5);
console.log(JSON.stringify(scoresArray))


scoresArray.forEach(element => {
  createNewTableRow(element);
});

function createNewTableRow(element) {
  let tableBody = document.getElementById("table-body");
  let newRow = document.createElement("tr");

  const usernameCell = document.createElement("td");
  usernameCell.textContent = element['user'];

  let scoreCell = document.createElement("td");
  scoreCell.textContent = element['gamesWon'];

  newRow.appendChild(usernameCell);
  newRow.appendChild(scoreCell);

  tableBody.appendChild(newRow);
}
