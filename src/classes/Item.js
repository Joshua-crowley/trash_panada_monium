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
    if(!validTypes.includes(type)) {
      throw ('Invalid Type:', type);
    }
    this.type = type;
    this.name = name;

  }
}