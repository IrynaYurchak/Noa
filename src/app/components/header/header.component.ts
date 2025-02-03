import { Component } from '@angular/core';
import { RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import { MatDialog } from '@angular/material/dialog';
import {MenuComponent} from "../../pages/menu/menu.component";
import {BasketComponent} from "../../pages/basket/basket.component";
import {AuthDialogComponent} from "../../pages/auth-dialog/auth-dialog.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
  ) {
  }

  openMenu(): void {
    this.dialog.open(MenuComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'menu-dialog',
      autoFocus: false,
      disableClose: false
    });
  }

}
