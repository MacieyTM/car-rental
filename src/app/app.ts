import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarFleet } from './models/car-fleet';
import { CarType } from './models/car-type';
import { CarRental } from './services/car-rental';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly CarType = CarType;

  protected readonly fleet = new CarFleet(2, 1, 1);
  private readonly rental = new CarRental(this.fleet);

  protected readonly selectedType = signal<CarType>(CarType.Sedan);
  protected readonly selectedDate = signal('2026-09-25');
  protected readonly selectedTime = signal('10:00');
  protected readonly numberOfDays = signal(1);

  protected readonly reservations = signal(this.rental.getReservations());

  protected readonly message = signal('');

  checkAvailability(): void {
    try {
      const startDate = this.createStartDate();

      const available = this.rental.isCarAvailable(
        this.selectedType(),
        startDate,
        this.numberOfDays(),
      );

      this.message.set(
        available
          ? `${this.selectedType()} is available.`
          : `${this.selectedType()} is not available for the selected period.`,
      );
    } catch (error) {
      this.message.set(error instanceof Error ? error.message : 'Invalid reservation data.');
    }
  }

  reserveCar(): void {
    try {
      const reservation = this.rental.reserveCar(
        this.selectedType(),
        this.createStartDate(),
        this.numberOfDays(),
      );

      this.reservations.set(this.rental.getReservations());

      this.message.set(
        `${reservation.carType} reserved successfully until ${reservation.endDate.toLocaleString()}.`,
      );
    } catch (error) {
      this.message.set(error instanceof Error ? error.message : 'Could not create reservation.');
    }
  }

  private createStartDate(): Date {
    const [year, month, day] = this.selectedDate().split('-').map(Number);
    const [hours, minutes] = this.selectedTime().split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  }
}
