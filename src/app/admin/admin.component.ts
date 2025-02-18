import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../shared/services/account/account.service";
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Auth, onAuthStateChanged, signOut} from "@angular/fire/auth";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: Auth = inject(Auth),
    private accountService: AccountService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    // Перевірка чи користувач авторизований
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        console.log("Користувач не авторизований, перенаправляємо на головну");
        this.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.toaster.success("Ви вийшли з акаунту.");
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    }).catch(error => {
      this.toaster.error("Не вдалося вийти з акаунту.");
    });
  }
}
