import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service';
@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-slider',
  template: `
    <div>
      <input
        id="slider"
        type="range"
        [min]="min"
        [max]="max"
        [step]="step"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
      />
    </div>
  `,
  styles: [
    `
      div {
        margin: 20px;
      }
      input[type='range'] {
        width: 300px;
      }
    `,
  ],
})
export class SliderComponent {
  service = inject(ConfigService);
  value = 0;
  min = 0;
  max = 100;
  step = 1;

  map(input: number, a: number, b: number, min: number, max: number): number {
    return min + ((input - a) / (b - a)) * (max - min);
  }

  onValueChange(newValue: number): void {
    const scaled = this.map(newValue, 0, 100, 8, -2.1);
    this.service.setSlice(scaled); // Wywołanie metody z ConfigService
  }
}
