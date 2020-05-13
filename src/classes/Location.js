export default class Location {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  equals(loc){
    return loc.x === this.x && loc.y === this.y;
  }

  isAdjacentTo(loc){
    const tooFarAwayX = math.abs(this.x - loc.x) > 1;
    const tooFarAwayY = math.abs(this.y - loc.y) > 1;
    return !(tooFarAwayX || tooFarAwayY);
  }
  
}