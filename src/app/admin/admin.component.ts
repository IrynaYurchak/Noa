import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../shared/services/account/account.service";
import { RouterModule } from '@angular/router'; // Додаємо RouterModule
import { CommonModule } from '@angular/common';

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
    private accountService: AccountService,
  ) { }
  ngOnInit(): void {

  }
  logout(): void {
    // this.router.navigate(['/']);
    // localStorage.removeItem('currentUser');
    // this.accountService.isUserLogin$.next(true)
  }
}
