import Game from './classes/Game';

const myGame = new Game('game');

document.body.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      myGame.handleMove('left');
      console.log('Left key');
      break;
    case 38:
      myGame.handleMove('up');
      console.log('Up key');
      break;
    case 39:
      myGame.handleMove('right');
      console.log('Right key');
      break;
    case 40:
      myGame.handleMove('down');
      console.log('Down key');
      break; 
    default:
      break;
  }
});

