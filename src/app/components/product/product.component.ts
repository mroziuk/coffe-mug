import { Component } from '@angular/core';
import { ColorOptionsComponent } from '../color-oprions/color-options.component';
import { ProductInfoComponent } from './product-info.component';
import { NgtCanvas } from 'angular-three';
import { Experience } from '../../experience/experience.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ColorOptionsComponent,
    ProductInfoComponent,
    NgtCanvas,
    SliderComponent,
  ],
  template: `
    <div class="h-screen w-screen p-8 bg-gray-100">
      <div class="bg-white p-10 rounded-2xl shadow-xl grid grid-cols-2">
        <div class="pr-8 border-r-2 border-gray-200">
          <app-product-info />
          <app-color-options />
          <app-slider />
          <button
            class="mt-8 w-full shadow-2xl text-gray-100 bg-black rounded-md"
          >
            Add to Cart
          </button>
        </div>
        <div class="h-[300px]">
          <ngt-canvas
            [sceneGraph]="sceneGraph"
            [camera]="{ zoom: 1.5, position: [15, 15, 5] }"
          />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductComponent {
  sceneGraph = Experience;
}
