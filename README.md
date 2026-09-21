<div style="text-align: center;">
  <img src="./assets/car-renting.jpg" width="180" alt="Car Rental logo">
</div>

# 🚗 Car Rental

A small car rental application built with Angular as a technical exercise.

The application allows users to check car availability and create reservations for different car types over a selected date and time range.

## Features

- Reserve a car for a selected number of days

- Choose a car type:
  - Sedan
  - SUV
  - Van

- Check car availability before making a reservation

- Handle a limited fleet of cars for each type

- Prevent overlapping reservations when all cars of a given type are already reserved

- Validate reservation data

- Display current reservations in the UI

- Unit, integration and component tests

## Tech Stack

- Angular
- TypeScript
- Vitest
- HTML
- CSS

## Project Structure

```text
src/app/

├── models/
│   ├── car-fleet.ts
│   ├── car-fleet.spec.ts
│   ├── car-type.ts
│   ├── reservation.ts
│   └── reservation.spec.ts
│
├── services/
│   ├── car-rental.ts
│   ├── car-rental.integration.spec.ts
│   ├── car-rental.spec.ts
│   ├── reservation.service.ts
│   └── reservation.service.spec.ts
│
├── app.ts
├── app.html
├── app.css
└── app.spec.ts
```
