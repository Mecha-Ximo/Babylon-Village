import {
  Color3,
  MeshBuilder,
  Sound,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import { createEngine } from './engine';
import { createCar } from './objects/Car';
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

const ground = MeshBuilder.CreateGround(
  'ground',
  { width: 20, height: 20 },
  scene
);
const groundMat = new StandardMaterial('ground-mat', scene);
groundMat.diffuseColor = new Color3(0.8, 0.3, 0.2);
ground.material = groundMat;

// const box = MeshBuilder.CreateBox(
//   'b-1',
//   { width: 1, height: 1, depth: 2 },
//   scene
// );
// box.position.y = 0.5;
// box.scaling.x = 2;
// box.rotate(new Vector3(0, 1, 0), Math.PI / 4);

// const box2 = MeshBuilder.CreateBox('box-2', {}, scene);
// box2.scaling = new Vector3(1, 4, 1);
// box2.position = new Vector3(-4, 2, 0);
// box2.rotation.y = Tools.ToRadians(60);

// const soundLoop = new Sound('sound-1', '/test-sound.wav', scene, null, {
//   loop: true,
//   autoplay: true,
// });
const sound = new Sound('sound-1', '/test-sound.wav', scene, () => {
  // sound.play();
});

const factory = new HouseFactory('factory', scene);
const village = new Village(factory);

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
