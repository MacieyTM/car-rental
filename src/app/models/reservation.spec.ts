import { describe, expect, it } from 'vitest';
import { CarType } from './car-type';
import { Reservation } from './reservation';

describe('Reservation', () => {
  it('should store reservation details', () => {
    const startDate = new Date('2026-09-25T14:00:00');
    const reservation = new Reservation(CarType.SUV, startDate, 3);

    expect(reservation.carType).toBe(CarType.SUV);
    expect(reservation.startDate).toEqual(startDate);
    expect(reservation.numberOfDays).toBe(3);
  });

  it('should calculate the end date', () => {
    const reservation = new Reservation(CarType.SUV, new Date('2026-09-25T14:00:00'), 3);

    expect(reservation.endDate).toEqual(new Date('2026-09-28T14:00:00'));
  });

  it('should reject an invalid start date', () => {
    expect(() => new Reservation(CarType.Sedan, new Date('invalid'), 2)).toThrow();
  });

  it('should reject zero days', () => {
    expect(() => new Reservation(CarType.Sedan, new Date('2026-09-25T14:00:00'), 0)).toThrow();
  });

  it('should reject negative days', () => {
    expect(() => new Reservation(CarType.Sedan, new Date('2026-09-25T14:00:00'), -2)).toThrow();
  });

  it('should reject a non-integer number of days', () => {
    expect(() => new Reservation(CarType.Sedan, new Date('2026-09-25T14:00:00'), 1.5)).toThrow();
  });
});
