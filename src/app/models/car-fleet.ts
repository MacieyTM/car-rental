import { Car } from './car';
import { CarType } from './car-type';
import { Sedan } from './sedan';
import { SUV } from './suv';
import { Van } from './van';

export class CarFleet {
  private readonly cars: Car[] = [];

  constructor(sedanCount: number, suvCount: number, vanCount: number) {
    this.addCars(CarType.Sedan, sedanCount);
    this.addCars(CarType.SUV, suvCount);
    this.addCars(CarType.Van, vanCount);
  }

  getCarsOfType(type: CarType): readonly Car[] {
    return [...this.cars.filter((car) => car.type === type)];
  }

  getCount(type: CarType): number {
    return this.cars.filter((car) => car.type === type).length;
  }

  private addCars(type: CarType, count: number): void {
    if (!Number.isInteger(count) || count < 0) {
      throw new Error('Car count must be a non-negative integer.');
    }

    for (let index = 0; index < count; index++) {
      this.cars.push(this.createCar(type, this.cars.length + 1));
    }
  }

  private createCar(type: CarType, id: number): Car {
    switch (type) {
      case CarType.Sedan:
        return new Sedan(id);

      case CarType.SUV:
        return new SUV(id);

      case CarType.Van:
        return new Van(id);
    }
  }
}
