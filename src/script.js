import Game from './classes/Game';


document.body.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      handleMove('left');
      console.log('Left key');
      break;
    case 38:
      handleMove('up');
      console.log('Up key');
      break;
    case 39:
      handleMove('right');
      console.log('Right key');
      break;
    case 40:
      handleMove('down');
      console.log('Down key');
      break; 
    default:
      break;
  }
});

const myGame = new Game('game');