import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly color = signal<string>('#b3478c');
  public readonly selectedColor = this.color.asReadonly();
  setColor(hex: string) {
    this.color.set(hex);
  }

  private readonly _slice = signal<number>(8);
  public readonly slice = this._slice.asReadonly();
  setSlice(value: number) {
    this._slice.set(value);
  }
  constructor() {}
}
