import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  constructor(  private router: Router) {

  }

}
