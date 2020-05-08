import Game from './classes/Game';


document.body.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      console.log('Left key');
      break;
    case 38:
      console.log('Up key');
      break;
    case 39:
      console.log('Right key');
      break;
    case 40:
      console.log('Down key');
      break; 
    default:
      break;
  }
});

const myGame = new Game('game');