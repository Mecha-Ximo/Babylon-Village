import { Sound, Vector3 } from '@babylonjs/core';
import { createEngine } from './engine';
import { createCar } from './objects/Car';
import { createGround } from './objects/Ground';
import { HouseFactory, HouseVariant } from './objects/House';
import { Village } from './objects/Village';
import { createScene } from './scene';
import './style.css';

const canvas = document.querySelector('canvas');
if (!canvas) {
  throw new Error('Unable to find the canvas');
}

const engine = createEngine(canvas);
const scene = createScene(engine);

createGround();

const sound = new Sound('sound-1', '/test-sound.wav', scene, () => {
  // sound.play();
});

const factory = new HouseFactory('factory', scene);
const village = new Village(factory);
createHouses();

function createHouses(): void {
  village.addHouse(HouseVariant.BIG, Vector3.Zero());
  village.addHouse(HouseVariant.BIG, new Vector3(0, 0, 3));
  village.addHouse(HouseVariant.BIG, new Vector3(2.5, 0, 3));
  village.addHouse(HouseVariant.BIG, new Vector3(5, 0, 3));
  village.addHouse(
    HouseVariant.BIG,
    new Vector3(-2.5, 0, 5.5),
    new Vector3(0, -Math.PI / 2, 0)
  );
  village.addHouse(HouseVariant.SMALL, new Vector3(2, 0, 0));
  village.addHouse(
    HouseVariant.SMALL,
    new Vector3(2, 0, -1.5),
    new Vector3(0, Math.PI / 2, 0)
  );
  village.addHouse(
    HouseVariant.SMALL,
    new Vector3(2, 0, -3),
    new Vector3(0, Math.PI / 2, 0)
  );

  village.addHouse(
    HouseVariant.SMALL,
    new Vector3(-2.2, 0, 3.2),
    new Vector3(0, Math.PI / 4, 0)
  );
}

createCar(scene);
