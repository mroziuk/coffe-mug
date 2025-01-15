import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  viewChild,
  ElementRef,
  ChangeDetectionStrategy,
  computed,
  inject,
} from '@angular/core';
import {
  extend,
  injectBeforeRender,
  injectLoader,
  injectStore,
  NgtArgs,
} from 'angular-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ConfigService } from '../config.service';
import { OrbitControls } from 'three-stdlib';
extend(THREE);
extend({ OrbitControls });
@Component({
  standalone: true,
  imports: [NgtArgs],
  template: `
    <ngt-ambient-light [intensity]="1" />

    <ngt-directional-light [intensity]="2" [position]="[0, 0, 1]" />
    <ngt-directional-light [intensity]="2" [position]="[0, 0, -1]" />
    <ngt-directional-light [intensity]="2" [position]="[0, 0, 1]" />

    <ngt-point-light [intensity]="0.5" [position]="[-0.5, -1, 0]" />
    <ngt-primitive *args="[model()]" [position]="[0, -2, 0]" />

    <ngt-orbit-controls
      #orbitControls
      *args="[camera(), glDomElement()]"
      [enableZoom]="false"
      [autoRotate]="true"
      [autoRotateSpeed]="5"
    />
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  configService = inject(ConfigService);
  ngtStore = injectStore();

  orbitControls = viewChild<ElementRef<OrbitControls>>('orbitControls');

  gltf = injectLoader(
    () => GLTFLoader,
    () => `assets/scene.gltf`
  );

  model = computed(() => {
    const gltf = this.gltf();
    if (!gltf) return null;
    const color = this.configService.selectedColor();
    const mesh_outside = gltf.scene.getObjectByName(
      'Segmentovan��_povrch_1_obal_0'
    ) as THREE.Mesh;

    const localPlane = new THREE.Plane(
      new THREE.Vector3(0, -1, 0),
      this.configService.slice()
    );
    const material = mesh_outside.material as THREE.MeshStandardMaterial;
    material.color.set(new THREE.Color(color));
    material.clippingPlanes = [localPlane];

    const mesh_inside = gltf.scene.getObjectByName(
      'Segmentovan��_povrch_1_vnutro_0'
    ) as THREE.Mesh;
    const mat = mesh_inside.material as THREE.MeshStandardMaterial;
    mat.clippingPlanes = [localPlane];
    return gltf.scene;
  });

  camera = this.ngtStore.select('camera');
  glDomElement = this.ngtStore.select('gl', 'domElement');
  constructor() {
    const renderer = this.ngtStore.get('gl') as THREE.WebGLRenderer;
    renderer.localClippingEnabled = true;
    injectBeforeRender(() => {
      const orbitControls = this.orbitControls()?.nativeElement;
      orbitControls?.update();
    });
  }
}
