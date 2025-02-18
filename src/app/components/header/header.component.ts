import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from "../../pages/menu/menu.component";
import { AuthDialogComponent } from "../../pages/auth-dialog/auth-dialog.component";
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string = 'Гість';  // Ім'я юзера (початкове значення)
  userRoleUrl: string = 'login';  // URL для переходу (кабінет або адмін)
  isAuthenticated: boolean = false;  // Чи залогінений юзер

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    // Відстежуємо зміну авторизації Firebase
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        const userRef = doc(this.firestore, 'users', user.uid);
        docData(userRef).subscribe((userData: any) => {
          if (userData) {
            this.userName = userData.role === 'ADMIN' ? 'Адмін' : userData.firstName;
            this.userRoleUrl = userData.role === 'ADMIN' ? 'admin' : 'cabinet';
          }
        });
      } else {
        this.isAuthenticated = false;
        this.userName = 'Гість';
        this.userRoleUrl = 'login';
      }
    });
  }

  openMenu(): void {
    this.dialog.open(MenuComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'menu-dialog',
      autoFocus: false,
      disableClose: false
    });
  }

  openAuth(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
      disableClose: false,
    });
  }
}

