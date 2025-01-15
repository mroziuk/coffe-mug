import { Component, inject, signal } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-color-options',
  standalone: true,
  imports: [],
  template: `
    <h3 class="text-sm text-gray-400 tracking-widest">COLOR OPTIONS</h3>
    <div class="flex mt-4 gap-4">
      @for (color of colors(); track color) {
      <button
        class="h-6 w-6 rounded-full shadow-lg cursor-pointer hover:opacity-50 border-2"
        [class.selected]="configService.selectedColor() === color"
        [style.background-color]="color"
        (click)="configService.setColor(color)"
      ></button>
      }
    </div>
  `,
  styles: `
  .selected{
    border-color: black;
  }
  `,
})
export class ColorOptionsComponent {
  configService = inject(ConfigService);

  colors = signal<string[]>([
    '#bc4266',
    '#3300f2',
    '#6c14c6',
    '#cd3e61',
    '#f0f033',
    '#20b6bf',
  ]);
}
