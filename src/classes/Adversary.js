import Creature from './Creature';
import { getRandEl } from '../utils';

export default class Adversary extends Creature {
  constructor (location, name = 'The Chef', movesPerTurn = 2){
    const imgPath = 'https://trendings.net/wp-content/uploads/2020/01/lkjhgfdxhjkghjj-h.jpg';
    super(location, imgPath, name);
    this.movesPerTurn = movesPerTurn;
  }
  
  isNextToRaccoon(raccoon){
    return this.location.isAdjacentTo(raccoon.location);
  }

  robRaccoon(raccoon){
    const ingredientTypes = Object.keys(raccoon.inventory); //creates a list of possible things to steal
    const stolenType = getRandEl(ingredientTypes);          // create one of those possible things we can steal and steal it
    const stolenIngredient = raccoon.inventory[stolenType]; // changes stolen type to a name (bread to wheat)

    if (stolenIngredient){
      raccoon.inventory[stolenType] = null;
      const message = `The Chef Stole Your ${stolenIngredient.name}`;
      console.log(message);
      alert(message);
    }
  }
}