import { CarType } from './car-type';

export class Reservation {
  constructor(
    public readonly carType: CarType,
    public readonly startDate: Date,
    public readonly numberOfDays: number,
  ) {
    if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime())) {
      throw new Error('Start date must be a valid date.');
    }

    if (!Number.isInteger(numberOfDays) || numberOfDays <= 0) {
      throw new Error('Number of days must be a positive integer.');
    }
  }

  get endDate(): Date {
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + this.numberOfDays);

    return endDate;
  }
}
