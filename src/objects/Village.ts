import { Vector3 } from '@babylonjs/core';
import { HouseFactory, HouseVariant } from './House';

export class Village {
  constructor(private readonly houseFactory: HouseFactory) {}

  public addHouse(
    variant: HouseVariant,
    position: Vector3,
    rotation?: Vector3
  ): void {
    const house = this.houseFactory.create(variant);
    house.position = position;
    if (rotation) {
      house.rotation = rotation;
    }
  }
}
