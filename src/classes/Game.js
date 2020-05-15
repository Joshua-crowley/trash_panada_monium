import { genRandNum, getRandEl } from '../utils';
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
    this.grid[this.adversary.location.y][this.adversary.location.x] = this.adversary;
    this.trashCans.forEach((tc) => this.grid[tc.location.y][tc.location.x] = tc);
    
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

  handleMove(direction){
    // Raccoon needs to move
    if (direction === 'left') {
      moveTo(this.raccoon, this.raccoon.location.x - 1);

    } else if (direction === 'up') {
      moveTo(this.raccoon, this.raccoon.location.y - 1);

    } else if (direction === 'right') {
      moveTo(this.raccoon, this.raccoon.location.x + 1);

    } else if (direction === 'down') {
      moveTo(this.raccoon, this.raccoon.location.y + 1);

    }

    // Call the functions needed for the game to run.
    this.raccoon.rummage();
    this.trashCans.forEach((tc) => tc.freshen());
    this.adversary.takeTurn();

  }

  moveTo(creature, loc){
    if(!this.isOccupied(loc)){
      // update grid
      this.grid[creature.location.y][creature.location.x] = null;
      this.grid[loc.y][loc.x] = creature;
      // update creature
      creature.updateLocation(loc);
    }
  }

  genRandAdversaryMove() {
    const validMoves = this.getValidAdversaryMoves();
    const randMove = getRandEl(validMoves);
    return randMove;
  }

  getValidAdversaryMoves() {
    const validMoves = [];
    const {x, y} = this.adversary.location;

    for (let rowIdx = y - 1; rowIdx <= y + 1; y++) {
      for (let colIdx = x - 1; colIdx <= x + 1; x++) {
        if (!this.isValidMove(new Location(colIdx, rowIdx))) {
        validMoves.push(new Location(colIdx, rowIdx));
        }
      }
    }

    return validMoves;
  }

  isValidMove(loc){
    return this.isOnBoard(loc) && !this.isOccupied(loc);
  }

  isOnBoard(){
    return loc.x >= 0 && loc.x <= 7 && loc.y >= 0 && loc.y <= 7;
  }

  isOccupied(loc){
   return !!this.grid[loc.y][loc.x];
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
