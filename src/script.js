import Game from './classes/Game';



document.body.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      Game.handleMove('left');
      console.log('Left key');
      break;
    case 38:
      Game.handleMove('up');
      console.log('Up key');
      break;
    case 39:
      Game.handleMove('right');
      console.log('Right key');
      break;
    case 40:
      Game.handleMove('down');
      console.log('Down key');
      break; 
    default:
      break;
  }
});

const myGame = new Game('game');