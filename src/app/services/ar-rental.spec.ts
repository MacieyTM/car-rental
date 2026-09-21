import { describe, expect, it } from 'vitest';
import { CarFleet } from '../models/car-fleet';
import { CarType } from '../models/car-type';
import { CarRental } from './car-rental';

describe('CarRental', () => {
  it('should create a reservation', () => {
    const fleet = new CarFleet(2, 1, 1);
    const rental = new CarRental(fleet);

    const reservation = rental.reserveCar(CarType.SUV, new Date('2026-09-25T14:00:00'), 3);

    expect(reservation.carType).toBe(CarType.SUV);
    expect(reservation.startDate).toEqual(new Date('2026-09-25T14:00:00'));
    expect(reservation.numberOfDays).toBe(3);
  });

  it('should report whether a car is available', () => {
    const fleet = new CarFleet(1, 0, 0);
    const rental = new CarRental(fleet);

    expect(rental.isCarAvailable(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3)).toBe(true);
  });

  it('should report a car as unavailable after it has been reserved', () => {
    const fleet = new CarFleet(1, 0, 0);
    const rental = new CarRental(fleet);

    rental.reserveCar(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    expect(rental.isCarAvailable(CarType.Sedan, new Date('2026-09-26T10:00:00'), 2)).toBe(false);
  });

  it('should allow another reservation after the previous one ends', () => {
    const fleet = new CarFleet(1, 0, 0);
    const rental = new CarRental(fleet);

    rental.reserveCar(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    expect(rental.isCarAvailable(CarType.Sedan, new Date('2026-09-28T10:00:00'), 2)).toBe(true);
  });

  it('should return all reservations', () => {
    const fleet = new CarFleet(2, 1, 1);
    const rental = new CarRental(fleet);

    rental.reserveCar(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    rental.reserveCar(CarType.SUV, new Date('2026-09-26T12:00:00'), 2);

    expect(rental.getReservations()).toHaveLength(2);
  });
});
