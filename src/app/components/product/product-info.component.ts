import { Component } from '@angular/core';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full mb-5">
      <div class="w-full m-2">
        <p class="text-black text-2xl">COFFE MUG</p>
      </div>
      <div class="w-full">
        <p class="text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          impedit aspernatur ipsam dolorum, distinctio ea nulla a iste quia
          placeat, ipsa exercitationem eos esse reprehenderit. Ipsam aspernatur
          libero numquam qui!
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductInfoComponent {}
