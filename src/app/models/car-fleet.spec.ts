import { describe, expect, it } from 'vitest';
import { CarFleet } from './car-fleet';
import { CarType } from './car-type';
import { Sedan } from './sedan';
import { SUV } from './suv';
import { Van } from './van';

describe('CarFleet', () => {
  it('should create the requested number of cars for each type', () => {
    const fleet = new CarFleet(3, 2, 1);

    expect(fleet.getCount(CarType.Sedan)).toBe(3);
    expect(fleet.getCount(CarType.SUV)).toBe(2);
    expect(fleet.getCount(CarType.Van)).toBe(1);
  });

  it('should create concrete car objects', () => {
    const fleet = new CarFleet(1, 1, 1);

    const sedan = fleet.getCarsOfType(CarType.Sedan)[0];
    const suv = fleet.getCarsOfType(CarType.SUV)[0];
    const van = fleet.getCarsOfType(CarType.Van)[0];

    expect(sedan).toBeInstanceOf(Sedan);
    expect(suv).toBeInstanceOf(SUV);
    expect(van).toBeInstanceOf(Van);
  });

  it('should reject negative car counts', () => {
    expect(() => new CarFleet(-1, 2, 1)).toThrow();
  });
});
