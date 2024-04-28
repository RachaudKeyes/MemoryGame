document.addEventListener("DOMContentLoaded", function() { 
  const gameContainer = document.getElementById("game");

  let firstCard = null;
  let secondCard = null;
  let flippedCards = 0;
  let currentScore = 0;
  let noClickingAllowed = false;

  // Retrieve from localStorage
  let lowScore = localStorage.getItem("low-score");
  if (lowScore) {
    document.querySelector(".bestScore").innerText = lowScore;
  }

  const COLORS = [
    "url('https://cache.desktopnexus.com/thumbseg/1807/1807840-bigthumbnail.jpg')",
    "url('https://cache.desktopnexus.com/thumbseg/1807/1807840-bigthumbnail.jpg')",
    "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Turtle_clip_art.svg/2560px-Turtle_clip_art.svg.png')",
    "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Turtle_clip_art.svg/2560px-Turtle_clip_art.svg.png')",
    "url('https://i.pinimg.com/564x/1a/94/07/1a9407441fdfc8ebcad7457e491e23e2.jpg')",
    "url('https://i.pinimg.com/564x/1a/94/07/1a9407441fdfc8ebcad7457e491e23e2.jpg')",
    "url('https://e0.pxfuel.com/wallpapers/40/884/desktop-wallpaper-funny-troll-meme-faces-black-background.jpg')",
    "url('https://e0.pxfuel.com/wallpapers/40/884/desktop-wallpaper-funny-troll-meme-faces-black-background.jpg')",
    "url('https://media1.popsugar-assets.com/files/thumbor/ZzJqFHxBWcT6B554IfZ-h-wS2bo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/08/07/729/n/44701584/be3753057c566d67_GettyImages-1071193996/i/Pictures-Dogs-Making-Funny-Faces.jpg')",
    "url('https://media1.popsugar-assets.com/files/thumbor/ZzJqFHxBWcT6B554IfZ-h-wS2bo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/08/07/729/n/44701584/be3753057c566d67_GettyImages-1071193996/i/Pictures-Dogs-Making-Funny-Faces.jpg')",
    "url('https://mrwallpaper.com/images/high/funny-face-daffy-duck-cro6shochfueiz5q.jpg')",
    "url('https://mrwallpaper.com/images/high/funny-face-daffy-duck-cro6shochfueiz5q.jpg')",
    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI865plzIe9UUV1sy42kU5NnZnHBpWqwfbZ1SvLvuDng&s')",
    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI865plzIe9UUV1sy42kU5NnZnHBpWqwfbZ1SvLvuDng&s')"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);

      // Hides cards while title image is up
      newDiv.style.display = 'none';
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    
    let clickedCard = event.target; 

    // If user clicks while cards are reloading, ignores clicks
    if (noClickingAllowed) return;

    // classList[0] will target specifically the first class, color
    // removes front image
    clickedCard.style.backgroundImage = clickedCard.classList[0];
    clickedCard.style.backgroundRepeat = "no-repeat";
    clickedCard.style.backgroundSize = "contain";


    // When firstCard or secondCard have not been selected:
    if (!firstCard || !secondCard) {

      // Add click tries to score
      if (!clickedCard.classList.contains("flipped")){
        setScore(currentScore +1);
      }

      // When a card is clicked, add the class "flipped"
      clickedCard.classList.add("flipped");

      // First card will be the first card clicked and remain the first card.
      firstCard = firstCard || clickedCard;

      // Clicking the same card twice will result in a null value.
      // Otherwise, it will be the second clicked value.
      secondCard = clickedCard === firstCard ? null : clickedCard;
    }

    // Creating Matches
    if (firstCard && secondCard) {

      noClickingAllowed = true;

      // Matches will have same class.
      let firstCardColor = firstCard.className;
      let secondCardColor = secondCard.className;

      if (firstCardColor === secondCardColor) {

        // Counter for when to end game.
        flippedCards += 2
        

        // Leave matched cards face up
        firstCard.removeEventListener("click", handleCardClick);
        secondCard.removeEventListener("click", handleCardClick);

        // Reset card values
        firstCard = null;
        secondCard = null;
        noClickingAllowed = false;
      }
      else {
        // Prevents user from clicking during setTimeout delay
        noClickingAllowed = true;

        //Turn cards over and restart game after a 1 second delay
        setTimeout(function() {

          // Reset background
          firstCard.style.backgroundImage = 'url("https://t4.ftcdn.net/jpg/06/01/93/71/360_F_601937174_2h70YKVtBkBGm1fk3y9RpCI1QoKvfC3i.jpg")';
          secondCard.style.backgroundImage = 'url("https://t4.ftcdn.net/jpg/06/01/93/71/360_F_601937174_2h70YKVtBkBGm1fk3y9RpCI1QoKvfC3i.jpg")';
          firstCard.style.backgroundSize = "10rem";
          secondCard.style.backgroundSize = "10rem";
          firstCard.style.backgroundRepeat = "repeat";
          secondCard.style.backgroundRepeat = "repeat";
          
          // Remove class "flipped"
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");

          // Reset card values
          firstCard = null;
          secondCard = null;
          noClickingAllowed = false;
        }, 1000);
      }
    }
    
    // GAME OVER!
    if (flippedCards === COLORS.length) 
      endGame();
  }
    // when the DOM loads
  createDivsForColors(shuffledColors);

   // Start Game
   setScore(0);

  // SetScore
  function setScore (newScore) {
    currentScore = newScore;
    document.querySelector(".currentScore").innerText = currentScore;
  }

   // Begin Game Button
   document.querySelector(".startGame").addEventListener("click", function() {
     
    // Remove title image
    document.querySelector('#game img').remove();

    // Restore display of cards
     cardDisplay = document.querySelectorAll("#game div");
     for (let cards of cardDisplay) {
       cards.style.display = "inline-block";
     }
   });

  // Restart Game Button
  const restart = document.querySelector(".restartGame");
  restart.addEventListener("click", function() { 
    window.location.reload();
  });

  // End Game
  function endGame() {
    let scoreCard = document.querySelector("#scoreCard");
    let lowScore = +localStorage.getItem("low-score") || Infinity;

    // If the player scores lower than the record score, replace in localStorage
    if (currentScore < lowScore) {
      scoreCard.lastElementChild.innerText = "NEW Best Score: " + currentScore;
      scoreCard.lastElementChild.style.color = "yellow";
      scoreCard.lastElementChild.style.fontWeight = "bold";
      localStorage.setItem("low-score", currentScore);
    }
    alert("You Finished!");
  }
});