import { CarType } from '../models/car-type';
import { Reservation } from '../models/reservation';
import { CarFleet } from '../models/car-fleet';
import { ReservationService } from './reservation.service';

export class CarRental {
  private readonly reservationService: ReservationService;

  constructor(fleet: CarFleet) {
    this.reservationService = new ReservationService(fleet);
  }

  reserveCar(carType: CarType, startDate: Date, numberOfDays: number): Reservation {
    const reservation = new Reservation(carType, startDate, numberOfDays);

    this.reservationService.reserve(reservation);

    return reservation;
  }

  isCarAvailable(carType: CarType, startDate: Date, numberOfDays: number): boolean {
    const reservation = new Reservation(carType, startDate, numberOfDays);

    return this.reservationService.isAvailable(reservation);
  }

  getReservations(): readonly Reservation[] {
    return this.reservationService.getReservations();
  }
}
