import { Engine } from '@babylonjs/core';

export function createEngine(canvas: HTMLCanvasElement): Engine {
  const engine = new Engine(canvas, true);

  window.addEventListener('resize', () => {
    engine.resize();
  });

  return engine;
}
