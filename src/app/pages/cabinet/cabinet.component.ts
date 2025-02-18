import { Component } from '@angular/core';
import {Router, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [
    RouterModule, CommonModule, RouterOutlet
  ],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent {
constructor(
  private router: Router
) {
}
}
