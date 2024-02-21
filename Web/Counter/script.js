let clickCount = 0;
const clickButton = document.getElementById('clickButton');
const decrementButton = document.getElementById('decrementButton');
const reset = document.getElementById('reset');
const clickCountDisplay = document.getElementById('clickCount');




  decrementButton.addEventListener('click', () => {
    if (clickCount > 0){
      clickCount--;
      clickCountDisplay.textContent = clickCount;
    }
    else {
      alert("Ya llegaste a 0")
    }

  });

  reset.addEventListener('click', () => {
    clickCount = 0;
    clickCountDisplay.textContent = clickCount;
  });

  clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
  });


