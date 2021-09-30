let themeColor = localStorage.getItem('themeColor');

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', themeMode)


if (themeColor === 'enabled') {
  document.body.classList.add('dark-theme');
}

function themeMode() {
  const toggleImage = document.querySelector('.theme-toggle img')
  document.body.classList.toggle('dark-theme');
  
  themeColor = localStorage.getItem('themeColor');

  if (document.body.classList.contains('dark-theme')) {
    toggleImage.src =  `/images/icon-sun.svg`
    localStorage.setItem('themeColor', 'enabled');
  } else {
    toggleImage.src = `/images/icon-moon.svg`;
    localStorage.setItem('themeColor', null);
  }
}
