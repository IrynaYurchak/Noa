import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
constructor(  private router: Router) {
}
}
