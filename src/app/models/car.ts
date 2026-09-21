import { CarType } from './car-type';

export abstract class Car {
  constructor(
    public readonly id: number,
    public readonly type: CarType,
  ) {}
}
