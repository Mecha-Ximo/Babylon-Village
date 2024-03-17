import {
  Animation,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
} from '@babylonjs/core';
import earcut from 'earcut';

export function createCar(scene: Scene): Mesh {
  const outline = [new Vector3(-0.3, 0, -0.1), new Vector3(0.2, 0, -0.1)];

  // curve
  for (let i = 0; i < 20; i++) {
    outline.push(
      new Vector3(
        0.2 * Math.cos((i * Math.PI) / 40),
        0,
        0.2 * Math.sin((i * Math.PI) / 40) - 0.1
      )
    );
  }

  // top
  outline.push(new Vector3(0, 0, 0.1));
  outline.push(new Vector3(-0.3, 0, 0.1));

  const carFaceUV = [];
  carFaceUV[0] = new Vector4(0, 0.5, 0.38, 1);
  carFaceUV[1] = new Vector4(0, 0, 1, 0.5);
  carFaceUV[2] = new Vector4(0.38, 1, 0, 0.5);

  const car = MeshBuilder.ExtrudePolygon(
    'car',
    { shape: outline, depth: 0.2, faceUV: carFaceUV, wrap: true },
    scene,
    earcut
  );

  const wheelFaceUV: Vector4[] = [];
  wheelFaceUV[0] = new Vector4(0, 0, 1, 1);
  wheelFaceUV[1] = new Vector4(0, 0.5, 0, 0.5);
  wheelFaceUV[2] = new Vector4(0, 0, 1, 1);

  const wheelRB = MeshBuilder.CreateCylinder('wheelRB', {
    diameter: 0.125,
    height: 0.05,
    faceUV: wheelFaceUV,
  });
  const wheelMat = new StandardMaterial('wheel-mat');
  const wheelTexture = new Texture(
    'https://assets.babylonjs.com/environments/wheel.png'
  );
  wheelMat.diffuseTexture = wheelTexture;
  wheelRB.material = wheelMat;

  wheelRB.parent = car;
  wheelRB.position.z = -0.1;
  wheelRB.position.x = -0.2;
  wheelRB.position.y = 0.035;
  wheelRB.animations = [createWheelAnimation()];

  const wheelRF = wheelRB.clone('wheelRF');
  wheelRF.position.x = 0.1;

  const wheelLB = wheelRB.clone('wheelLB');
  wheelLB.position.y = -0.2 - 0.035;

  const wheelLF = wheelRF.clone('wheelLF');
  wheelLF.position.y = -0.2 - 0.035;

  //material
  const carMat = new StandardMaterial('carMat');
  carMat.diffuseTexture = new Texture(
    'https://assets.babylonjs.com/environments/car.png'
  );
  car.material = carMat;

  car.rotation.x = -Math.PI / 2;
  car.position.y = 0.17;

  scene.beginAnimation(wheelRB, 0, 30, true);
  scene.beginAnimation(wheelLB, 0, 30, true);
  scene.beginAnimation(wheelLF, 0, 30, true);
  scene.beginAnimation(wheelRF, 0, 30, true);

  return car;
}

function createWheelAnimation(): Animation {
  const wheelAnimation = new Animation(
    'wheelAnimation',
    'rotation.y',
    30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const wheelKeys = [];
  wheelKeys.push({ frame: 0, value: 0 });
  wheelKeys.push({ frame: 30, value: Math.PI * 2 });
  wheelAnimation.setKeys(wheelKeys);

  return wheelAnimation;
}
