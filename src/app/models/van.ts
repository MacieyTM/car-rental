import { Car } from './car';
import { CarType } from './car-type';

export class Van extends Car {
  constructor(id: number) {
    super(id, CarType.Van);
  }
}
