function submitForm() {
    let usernameInput = document.getElementById("username");
    let username = usernameInput.value.toUpperCase();
  
    let errorMessageElement = document.getElementById("errorMessage"); 
    if (username === "") { // checks if there is a username in input
      errorMessageElement.innerText = "Username cannot be empty.";
      return;
    } else {
      let usersObj = JSON.parse(localStorage.getItem("usersObj"));
  
      if (usersObj.hasOwnProperty(username)) { // checks if user exist in storage and gets username and score. else return player not exist
        let user = usersObj[username];
        let gamesWon = user.gamesWon;
        let userInfoElement = document.getElementById("userInfo");
        userInfoElement.innerHTML = `Username: ${username}<br>Games Won: ${gamesWon}`;
      } else {
        errorMessageElement.innerText = "Player does not exist.";
      }
    }
  }
  