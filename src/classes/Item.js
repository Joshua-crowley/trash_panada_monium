export default class Item {
  constructor (type, name) {
    const validTypes = [
      'bread',
      'meat',
      'condiment',
      'greens',
      'veggies',
      'cheese'
    ]
    if(!(type in validTypes)) {
      throw ('Invalid Type:', type);
    }
    this.type = type;
    this.name = name;

  }
}