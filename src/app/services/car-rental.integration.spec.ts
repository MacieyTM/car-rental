import { CarFleet } from '../models/car-fleet';
import { CarType } from '../models/car-type';
import { CarRental } from './car-rental';

describe('CarRental integration', () => {
  it('should reserve an available car and make it unavailable for overlapping dates', () => {
    const fleet = new CarFleet(1, 1, 1);
    const rental = new CarRental(fleet);

    const startDate = new Date(2026, 8, 25, 10, 0);

    expect(rental.isCarAvailable(CarType.Sedan, startDate, 3)).toBe(true);

    rental.reserveCar(CarType.Sedan, startDate, 3);

    expect(rental.isCarAvailable(CarType.Sedan, startDate, 3)).toBe(false);
  });

  it('should allow another reservation after the previous reservation ends', () => {
    const fleet = new CarFleet(1, 1, 1);
    const rental = new CarRental(fleet);

    const firstStartDate = new Date(2026, 8, 25, 10, 0);

    rental.reserveCar(CarType.Sedan, firstStartDate, 3);

    const secondStartDate = new Date(2026, 8, 28, 10, 0);

    expect(rental.isCarAvailable(CarType.Sedan, secondStartDate, 2)).toBe(true);
  });
});
