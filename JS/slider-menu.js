const slider_menu = document.getElementById('silder-menu-container');


document.querySelector('.menu-silder-button').addEventListener('click', () => {
  if (slider_menu.classList.contains('animate__slideInRight')) {
    slider_menu.classList.remove('animate__slideInRight');
    slider_menu.classList.add('animate__slideOutRight');
    setTimeout( () => {
      slider_menu.classList.toggle('active');
    }, 500);
  } else {
    slider_menu.classList.remove('animate__slideOutRight');
    slider_menu.classList.add('animate__slideInRight');
    slider_menu.classList.toggle('active');
  }
});