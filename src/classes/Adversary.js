import Creature from './Creature';
export default class Adversary extends Creature {
  constructor (location, name = 'The Chef', movesPerTurn = 2){
    imgPath = 'https://trendings.net/wp-content/uploads/2020/01/lkjhgfdxhjkghjj-h.jpg';
    super(location, imgPath, name);
    this.movesPerTurn = movesPerTurn;
  }
  
}