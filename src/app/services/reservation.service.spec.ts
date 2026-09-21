import { describe, expect, it } from 'vitest';
import { CarFleet } from '../models/car-fleet';
import { CarType } from '../models/car-type';
import { Reservation } from '../models/reservation';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  it('should allow a reservation when a car is available', () => {
    const fleet = new CarFleet(1, 0, 0);
    const service = new ReservationService(fleet);

    const reservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    expect(service.isAvailable(reservation)).toBe(true);
  });

  it('should allow multiple non-overlapping reservations for one car', () => {
    const fleet = new CarFleet(1, 0, 0);
    const service = new ReservationService(fleet);

    const firstReservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    const secondReservation = new Reservation(CarType.Sedan, new Date('2026-09-28T10:00:00'), 2);

    service.reserve(firstReservation);

    expect(service.isAvailable(secondReservation)).toBe(true);
  });

  it('should reject overlapping reservations when no car is available', () => {
    const fleet = new CarFleet(1, 0, 0);
    const service = new ReservationService(fleet);

    const firstReservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    const secondReservation = new Reservation(CarType.Sedan, new Date('2026-09-26T10:00:00'), 2);

    service.reserve(firstReservation);

    expect(service.isAvailable(secondReservation)).toBe(false);
  });

  it('should allow overlapping reservations up to the fleet capacity', () => {
    const fleet = new CarFleet(2, 0, 0);
    const service = new ReservationService(fleet);

    const firstReservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    const secondReservation = new Reservation(CarType.Sedan, new Date('2026-09-26T10:00:00'), 2);

    const thirdReservation = new Reservation(CarType.Sedan, new Date('2026-09-27T10:00:00'), 1);

    service.reserve(firstReservation);
    service.reserve(secondReservation);

    expect(service.isAvailable(thirdReservation)).toBe(false);
  });

  it('should throw when trying to reserve an unavailable car', () => {
    const fleet = new CarFleet(1, 0, 0);
    const service = new ReservationService(fleet);

    const firstReservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    const secondReservation = new Reservation(CarType.Sedan, new Date('2026-09-26T10:00:00'), 2);

    service.reserve(firstReservation);

    expect(() => service.reserve(secondReservation)).toThrow();
  });

  it('should calculate availability separately for each car type', () => {
    const fleet = new CarFleet(1, 1, 1);
    const service = new ReservationService(fleet);

    const sedanReservation = new Reservation(CarType.Sedan, new Date('2026-09-25T10:00:00'), 3);

    const suvReservation = new Reservation(CarType.SUV, new Date('2026-09-25T10:00:00'), 3);

    service.reserve(sedanReservation);

    expect(service.isAvailable(suvReservation)).toBe(true);
  });
});
