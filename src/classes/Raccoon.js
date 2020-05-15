import Creature from './Creature';

export default class Raccoon extends Creature {
  constructor (location, name = 'Meeko') {
    const imgPath = 'https://i.pinimg.com/736x/30/d0/10/30d010906a5bfcb12c1e69940753bdca.jpg';
    super(location, imgPath, name);
    this.inventory = {
      bread: null,
      meat: null,
      condiment: null,
      green: null,
      veggies: null,
      cheese: null
      // stolenType doesn't exist raccoon.inventory[] vs
    };
  }

  rummage(trashCans){
    const adjacentCans = trashCans.filter(tc => 
      tc.location.isAdjacentTo(this.location)
    );
      for (let i = 0; i < adjacentCans.length; i++) {
        const newItem = adjacentCans[i].tryYield();
        if (newItem) {
          this.inventory[newItem.type] = newItem;
          return;
        }
      }
  }
}