import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import {CommonModule} from "@angular/common";
import {CategoryService} from "../../shared/services/category/category.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  public userCategories: Array<ICategoryResponse> = [];
constructor(
  private categoryServices: CategoryService,
  private router: Router,
  public dialogRef: MatDialogRef<MenuComponent>

) {
}

  ngOnInit(): void {
    this.loadCategories();
    }
  loadCategories(): void {
    this.categoryServices.getAll().subscribe((userCategories: ICategoryResponse[]) => {
      this.userCategories = userCategories;
    });
  }
  closeMenu(): void {
    this.dialogRef.close(); // Закриває діалогове вікно
  }
}
