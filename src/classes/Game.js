import { genRandNum, getRandEl } from '../utils';
import Location from './Location';
import Raccoon from './Raccoon';
import Adversary from './Adversary';
import Trashcan from './Trashcan';

export default class Game {
  constructor(gameld){
    this.gameld = gameld;
    this.status = 'new';
    this.turnsRemaining = 100;
    this.populateGrid();
    this.grid = Array(8)
      .fill(null)
      .map((el) => Array(8).fill(null));
    console.table(this.grid);


    // This Generates the starting location for the trashcans, raccoon, and adversary
    const startingLocs = this.genStartLocs();
    this.trashCans = Array(5).fill(null).map((_,idx) => new Trashcan(startingLocs[idx]));
    this.raccoon = new Raccoon(startingLocs[5], 'Meeko');
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
      if (!randLocs.includes(randLoc)) {
        randLocs.push(randLoc);
      }
    }
    return randLocs.map((loc) => new Location(loc[1], loc[0]));
  }

  handleMove(direction){
    if (['lost', 'won'].includes(this.status)) {
      return;
    } else {
      this.status = 'running';
    }
    // Raccoon needs to move
    let newLoc;
    const {x,y} = this.raccoon.location;
    switch(direction){
      case 'left':
        newLoc = new Location(x-1,y);
        break;
      case 'up':
        newLoc = new Location(x,y-1);
        break;
      case 'right':
        newLoc = new Location(x+1,y);
        break;
      case 'down':
        newLoc = new Location(x,y+1);
        break;
      default:
        throw('bad direction, must be one of (up, down, left, right)');
      
    }
    

    if (this.isValidMove(newLoc)){
      this.moveTo(this.raccoon, newLoc);
      this.raccoon.rummage(this.trashCans);
      console.table(this.grid);
    }

    let advMoves = 0;
    while (advMoves <= 2) {
      if (this.adversary.isNextToRaccoon(this.raccoon)) {
        this.adversary.robRaccoon(this.raccoon);
        break;
      } else if(advMoves < 2) {
        const newMove = this.genRandAdversaryMove();
        this.moveTo(this.adversary, newMove);
      }
      advMoves++;
    }

  
    this.trashCans.forEach(tc => tc.freshen());

    //check if raccoon won
    const items = Object.values(this.raccoon.inventory);
    const numItems = items.filter(i => i).length;
    if(numItems === 6){
      alert(`${this.raccoon.name}, The Raccoon has made the best panini ever!`);
      this.status = 'won';
    }


    
    //update round tracker
    this.turnsRemaining--;
    if(!this.turnsRemaining){
      alert(`${this.raccoon.name} the raccoon will never get his panini, or make it to cooking school`)
      this.status = 'lost';
    }
  }

  moveTo(creature, loc){
    if(this.isValidMove(loc)){
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

    for (let rowIdx = y - 1; rowIdx <= y + 1; rowIdx++) {
      for (let colIdx = x - 1; colIdx <= x + 1; colIdx++) {
        if (this.isValidMove(new Location(colIdx, rowIdx))) {
          validMoves.push(new Location(colIdx, rowIdx));
        }
      }
    }

    return validMoves;
  }

  isValidMove(loc){
    return this.isOnBoard(loc) && !this.isOccupied(loc);
  }

  isOnBoard(loc){
    return loc.x >= 0 && loc.x <= 7 && loc.y >= 0 && loc.y <= 7;
  }

  isOccupied(loc){
   return !!this.grid[loc.y][loc.x];
  }

  populateGrid() {
    const game = document.getElementById(this.gameld);
    const gridDOM = game.querySelector('.grid');

    gridDOM.innerHTML = '';
    
    for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let colIdx = 0; colIdx < 8; colIdx++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `${rowIdx}${colIdx}`;
        // if (this.isOccupied(new Location(colIdx,rowIdx))) {
        //   const img = document.createElement('img');
        //   img.src = this.grid[rowIdx][colIdx].imgPath;
        //   cell.appendChild(img);
        // }
        row.appendChild(cell);
      }
      gridDOM.appendChild(row);
    }
  }
}
