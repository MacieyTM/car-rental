import { Car } from './car';
import { CarType } from './car-type';

export class SUV extends Car {
  constructor(id: number) {
    super(id, CarType.SUV);
  }
}
