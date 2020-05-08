import { genRandNum } from '../utils';
import Location from './Location';
import Raccoon from './Raccoon';
import Adversary from './Adversary';
import Trashcan from './Trashcan';

export default class Game {
  constructor(gameld){
    this.gameld = gameld;
    this.status = 'new';
    this.populateGrid();
    this.grid = Array(8)
      .fill(null)
      .map((el) => Array(8).fill(null));
    console.table(this.grid);


    // This Generates the starting location for the trashcans, raccoon, and adversary
    const startingLocs = this.genStartLocs();
    this.trashCans = Array(5).fill(null).map((_,idx) => new Trashcan(startingLocs[idx]));
    this.raccoon = new Raccoon(startingLocs[5], 'Meekoo');
    this.adversary = new Adversary(startingLocs[6], 'Chef Chef');

    this.grid[this.raccoon.location.y][this.raccoon.location.x] = this.raccoon;
    
    console.table(this.grid);
  }

  genStartLocs() {
    const genLoc = () => `${genRandNum(0,7)}${genRandNum(0,7)}`;
    const randLocs = [];
    while(randLocs.length < 7) {
      let randLoc = genLoc();
      if (!(randLoc in randLocs)) {
        randLocs.push(randLoc);
      }
    }
    return randLocs.map((loc) => new Location(loc[1], loc[0]));
  }



  populateGrid(){
    const game = document.getElementById(this.gameld);
    const gridDOM = game.querySelector('.grid');
    
    for(let rowIdx = 0; rowIdx < 8; rowIdx++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `${rowIdx}${colIdx}`;
        row.appendChild(cell);
      }
      gridDOM.appendChild(row);
    }
  }
}
