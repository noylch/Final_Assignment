function submitForm() { // checks if the input of username and if character was selected.
    let usernameInput  = document.getElementById("username")
    let username = usernameInput.value.toUpperCase();

    let errorMessageElement = document.getElementById("errorMessage");
    if (username == "") {
      errorMessageElement.innerText = "Username cannot be empty."
      return;
    }
    let selectedPhoto = document.querySelector(".photo.selected");

    if (selectedPhoto === null) {
    errorMessageElement.innerText = "Please select a character.";
    return;
  }
    else{
        let usersObj = JSON.parse(localStorage.getItem("usersObj"));

  if (!usersObj.hasOwnProperty(username)) { // Player doesn't exist, create a new one with the score. return true if doesnt exist
    usersObj[username] = { "user": username, "gamesWon": 0 };
    localStorage.setItem("usersObj", JSON.stringify(usersObj));
  }
  localStorage.setItem("username", username);
  window.location.href = "game.html";
      }
  }

document.addEventListener("DOMContentLoaded", () => { 
    let photos = document.querySelectorAll(".photo");
    photos.forEach(photo => { // for each photo inside photos add the option to click on
      photo.addEventListener("click", () => { 
        photos.forEach(otherPhoto => { // another function that after a click start to check if there is another picture "selected" and remove
          if (otherPhoto !== photo) {
            otherPhoto.classList.remove("selected");
          }
        });
  

        photo.classList.toggle("selected"); // toggle the selected class for clicked photos
        if (photo.classList.contains("selected")) {
        let imageSrc = photo.querySelector("img").getAttribute("src"); // get the src
        let altText = photo.querySelector("img").getAttribute("alt"); // get text

        // Create an object to hold the selected photo's data
        let selectedPhotoData = {
          imageSrc: imageSrc,
          altText: altText
        };

        let jsonString = JSON.stringify(selectedPhotoData); // save it into local storage
        localStorage.setItem("selectedPhotoData", jsonString);
      } else {
        // Remove the stored data from Local Storage when deselected
        localStorage.removeItem("selectedPhotoData");
        }
      });
    });
  });
  

