import { MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core';

export function createGround(): void {
  const ground = MeshBuilder.CreateGroundFromHeightMap(
    'height-ground',
    'https://assets.babylonjs.com/environments/villageheightmap.png',
    {
      width: 150,
      height: 150,
      minHeight: 0,
      maxHeight: 10,
      subdivisions: 20,
    }
  );
  const groundMat = new StandardMaterial('ground-mat');
  const groundTexture = new Texture(
    'https://assets.babylonjs.com/environments/valleygrass.png'
  );
  groundMat.diffuseTexture = groundTexture;
  ground.material = groundMat;

  const villageGroundTexture = new Texture(
    'https://assets.babylonjs.com/environments/villagegreen.png'
  );
  const vGroundMat = new StandardMaterial('v-ground-mat');
  vGroundMat.diffuseTexture = villageGroundTexture;
  vGroundMat.diffuseTexture.hasAlpha = true;
  const villageGround = MeshBuilder.CreateGround('v-ground', {
    width: 20,
    height: 20,
  });
  villageGround.material = vGroundMat;
  villageGround.position.y = 0.001;
}
