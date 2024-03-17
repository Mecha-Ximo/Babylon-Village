import {
  InstancedMesh,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector4,
} from '@babylonjs/core';

export enum HouseVariant {
  SMALL = 'small',
  BIG = 'big',
}

export class HouseFactory {
  private houseIndex = 0;

  private smallHouseModel: House | null = null;

  private bigHouseModel: House | null = null;

  constructor(private readonly id: string, private readonly scene: Scene) {}

  private createSmallModel(): House {
    this.smallHouseModel = new House(
      `small-model-${this.id}`,
      this.scene,
      1,
      HouseVariant.SMALL
    );

    return this.smallHouseModel;
  }

  private createBigModel(): House {
    this.bigHouseModel = new House(
      `big-model-${this.id}`,
      this.scene,
      1,
      HouseVariant.BIG
    );
    return this.bigHouseModel;
  }

  public create(variant: HouseVariant): InstancedMesh | Mesh {
    this.houseIndex += 1;

    if (variant === HouseVariant.SMALL) {
      if (!this.smallHouseModel) {
        return this.createSmallModel();
      }

      return this.smallHouseModel.clone(
        `small-house-${this.houseIndex}-${this.id}`
      );
    }

    if (!this.bigHouseModel) {
      return this.createBigModel();
    }

    return this.bigHouseModel.clone(`big-house-${this.houseIndex}-${this.id}`);
  }
}

export class House extends Mesh {
  constructor(
    private readonly _name: string,
    private readonly scene: Scene,
    height: number,
    private readonly variant = HouseVariant.SMALL
  ) {
    super(`${_name}-mesh`, scene);

    const body = this.createBody(height);
    body.parent = this;

    const rooftop = this.createRooftop();
    rooftop.parent = this;
  }

  private createBody(height: number): Mesh {
    const faceUV: Vector4[] = [];

    if (this.variant === HouseVariant.SMALL) {
      const front = new Vector4(0, 0, 0.25, 1);
      const right = new Vector4(0.25, 0, 0.5, 1);
      const back = new Vector4(0.5, 0, 0.75, 1);
      const left = new Vector4(0.75, 0, 1, 1);
      faceUV.push(back, front, right, left);
    } else {
      const front = new Vector4(0, 0, 0.4, 1);
      const right = new Vector4(0.4, 0, 0.6, 1);
      const back = new Vector4(0.6, 0, 1, 1);
      const left = new Vector4(0.4, 0, 0.6, 1);
      faceUV.push(back, front, right, left);
    }

    const width = this.variant === HouseVariant.BIG ? 2 : 1;

    const mesh = MeshBuilder.CreateBox(
      `${this._name}-body`,
      { height, faceUV, wrap: true, width },
      this.scene
    );
    mesh.position.y = height / 2;

    const mat = new StandardMaterial(`${this._name}-body-mat`, this.scene);
    mat.diffuseTexture = new Texture(
      this.variant === HouseVariant.SMALL
        ? 'https://assets.babylonjs.com/environments/cubehouse.png'
        : 'https://assets.babylonjs.com/environments/semihouse.png',
      this.scene
    );

    mesh.material = mat;

    return mesh;
  }

  private createRooftop(): Mesh {
    const mesh = MeshBuilder.CreateCylinder(`${this._name}-rooftop`, {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    });
    mesh.scaling.x = 0.75;
    mesh.rotation.z = Math.PI / 2;
    mesh.position.y = 1.22;

    if (this.variant === HouseVariant.BIG) {
      mesh.scaling.y = 2;
    }

    const material = new StandardMaterial(
      `${this._name}-rooftop-material`,
      this.scene
    );
    material.diffuseTexture = new Texture(
      'https://assets.babylonjs.com/environments/roof.jpg',
      this.scene
    );
    mesh.material = material;

    return mesh;
  }
}
