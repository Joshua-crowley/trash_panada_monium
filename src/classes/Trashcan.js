import { getRandEl } from '../utils';
import Item from './Item';

export default class Trashcan {
  constructor (location, turnsTilFresh){
    this.location = location;
    this.imgPath = 
    'https://image.shutterstock.com/z/stock-vector-raccoon-character-looking-for-food-in-trash-can-vector-flat-cartoon-illustration-598153841.jpg';
    this.turnsTilFresh = 0;
  }

  tryYield(){
    if (this.turnsTilFresh) {
      return null;
    }
    const ingredients = {
      bread: ['barley', 'wheat', 'focaccia'],
      meat: ['ham', 'turkey', 'chickem'],
      condiment: ['mayo', 'tabasco', 'ketchup'],
      greens: ['lettuce', 'spinach', 'dolla bills'],
      veggies: ['tomato', 'sour cucumbers', 'onion'],
      cheese: ['merican', 'swiss', 'chedda']
    }
    const randType = getRandEl(Object.keys(ingredients));
    const randIngredient = getRandEl(ingredients[randType]);
    const newItem = new Item(randType, randIngredient);

    this.turnsTilFresh = 10;

    return newItem;
  }

  freshen(){
    if (this.turnsTilFresh !== 0) {
       this.turnsTilFresh--;
    }
  }
}