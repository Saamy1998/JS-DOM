const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
  ];
  
  let flippedCards = [];
  let matchedCards = [];
  
  const gameBoard = document.getElementById('gameBoard');
  const restartButton = document.getElementById('restart');
  
  // Function to shuffle the cards
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Function to initialize the game
  function initializeGame() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.innerHTML = `
        <div class="front"></div>
        <div class="back">${card}</div>
      `;
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
    });
    flippedCards = [];
    matchedCards = [];
  }
  
  // Function to handle card flipping
  function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;
  
    this.classList.add('flipped');
    flippedCards.push(this);
  
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
  
  // Function to check for matching cards
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.back').textContent;
    const value2 = card2.querySelector('.back').textContent;
  
    if (value1 === value2) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === cards.length) {
        setTimeout(() => alert('You won!'), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Function to restart the game
  restartButton.addEventListener('click', initializeGame);
  
  // Initialize the game on page load
  initializeGame();
  