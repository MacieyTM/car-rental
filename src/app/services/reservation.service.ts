import { CarFleet } from '../models/car-fleet';
import { CarType } from '../models/car-type';
import { Reservation } from '../models/reservation';

export class ReservationService {
  private readonly reservations: Reservation[] = [];

  constructor(private readonly fleet: CarFleet) {}

  isAvailable(reservation: Reservation): boolean {
    const totalCars = this.fleet.getCount(reservation.carType);

    const overlappingReservations = this.reservations.filter(
      (existingReservation) =>
        existingReservation.carType === reservation.carType &&
        this.overlaps(existingReservation, reservation),
    );

    return overlappingReservations.length < totalCars;
  }

  reserve(reservation: Reservation): void {
    if (!this.isAvailable(reservation)) {
      throw new Error(`No ${reservation.carType} available for the requested period.`);
    }

    this.reservations.push(reservation);
  }

  getReservations(): readonly Reservation[] {
    return [...this.reservations];
  }

  private overlaps(first: Reservation, second: Reservation): boolean {
    return first.startDate < second.endDate && second.startDate < first.endDate;
  }
}
