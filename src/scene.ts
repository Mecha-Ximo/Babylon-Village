import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
} from '@babylonjs/core';

export function createScene(engine: Engine): Scene {
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    'cam',
    Math.PI / 3,
    Math.PI / 4,
    6,
    Vector3.Zero(),
    scene
  );
  camera.attachControl();

  const light = new HemisphericLight('ambient', new Vector3(-4, 8, -2), scene);
  light.intensity = 0.75;

  engine.runRenderLoop(() => scene.render());

  return scene;
}
