import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent {
  constructor(
    private router: Router,
  ) {
  }

}
