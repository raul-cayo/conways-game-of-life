function showBaner(message, time) {
  const existingBaner = document.querySelector('.baner');
  if (existingBaner) {
    document.body.removeChild(existingBaner);
  }

  const baner = document.createElement('div');
  baner.classList.add('baner');
  baner.textContent = message;
  document.body.appendChild(baner);

  setTimeout(() => {
    baner.classList.add('fade-out');
  }, time);
}

export {showBaner};