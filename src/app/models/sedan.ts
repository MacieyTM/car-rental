import { Car } from './car';
import { CarType } from './car-type';

export class Sedan extends Car {
  constructor(id: number) {
    super(id, CarType.Sedan);
  }
}
