// import {Component, inject, OnInit} from '@angular/core';
// import {Auth, signOut} from "@angular/fire/auth";
// import {ToastrService} from "ngx-toastr";
// import {Router} from "@angular/router";
// import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
// import {Firestore} from "@angular/fire/firestore";
//
//
// @Component({
//   selector: 'app-personal',
//   standalone: true,
//   imports: [FormsModule, ReactiveFormsModule],
//   templateUrl: './personal.component.html',
//   styleUrl: './personal.component.scss'
// })
// export class PersonalComponent implements OnInit {
//   public personalForm!: FormGroup;
//
//   constructor(
//     private router: Router,
//     private auth: Auth = inject(Auth),
//     public toaster: ToastrService,
//     private afs: Firestore,
//     private fb: FormBuilder
//   ) {
//   }
//
//   ngOnInit(): void {
//
//     this.initPersonalForm()
//   }
//
//   initPersonalForm(): void {
//     this.personalForm = this.fb.group({
//       firstName: [null, [Validators.required]],
//       lastName: [null, [Validators.required]],
//       phoneNumber: [null, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
//       email: [null, [Validators.required, Validators.email]],
//     })
// }
//   logout(): void { signOut(this.auth).
//     then(() => {
//       this.toaster.success("Ви вийшли з акаунту.");
//       setTimeout(() => {
//         this.router.navigate(['/']);
//       }, 500);
//     }).catch(error => {
//       this.toaster.error("Не вдалося вийти з акаунту.");
//     });
//   }
// }

// import { Component, inject, OnInit } from '@angular/core';
// import { Auth, signOut, User } from "@angular/fire/auth";
// import { ToastrService } from "ngx-toastr";
// import { Router } from "@angular/router";
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
// import { Observable } from "rxjs";
// import {AccountService} from "../../../shared/services/account/account.service";
// import {IRegisterResponse} from "../../../shared/interfaces/register/register.interface";
//
// @Component({
//   selector: 'app-personal',
//   standalone: true,
//   imports: [FormsModule, ReactiveFormsModule],
//   templateUrl: './personal.component.html',
//   styleUrl: './personal.component.scss'
// })
// export class PersonalComponent implements OnInit {
//   public personalForm!: FormGroup;
//   private auth: Auth = inject(Auth);
//   public currentUser$!: Observable<any>; // Створюємо Observable для підписки на дані
//
//   constructor(
//     private router: Router,
//     public toaster: ToastrService,
//     private fb: FormBuilder,
//     private accountService: AccountService
//   ) {}
//
//   ngOnInit(): void {
//     this.initPersonalForm();
//     this.loadUserData();
//   }
//
//   /** Ініціалізація форми */
//   initPersonalForm(): void {
//     this.personalForm = this.fb.group({
//       firstName: ['', [Validators.required]],
//       lastName: ['', [Validators.required]],
//       phoneNumber: ['', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }
//
//   /** 🔍 Отримання даних користувача з Firestore */
//   loadUserData(): void {
//     const user = this.auth.currentUser;
//     if (user) {
//       this.currentUser$ = this.accountService.getOne(user.uid);
//       this.currentUser$.subscribe(userData => {
//         if (userData) {
//           this.personalForm.patchValue({
//             firstName: userData.firstName || '',
//             lastName: userData.lastName || '',
//             phoneNumber: userData.phoneNumber || '',
//             email: user.email || '',
//           });
//         }
//       });
//     } else {
//       console.warn("Користувач не авторизований.");
//     }
//   }
//
//   /** 🔄 Оновлення даних користувача */
//   saveChange(): void {
//     if (this.personalForm.valid) {
//       const user = this.auth.currentUser;
//       if (user) {
//         this.accountService.update(this.personalForm.value, user.uid)
//           .then(() => {
//             this.toaster.success("Дані оновлено успішно!");
//           })
//           .catch(error => {
//             this.toaster.error("Помилка оновлення даних.");
//             console.error(error);
//           });
//       }
//     } else {
//       this.toaster.warning("Будь ласка, заповніть всі поля правильно.");
//     }
//   }
//
//   logout(): void {
//     signOut(this.auth).then(() => {
//       this.toaster.success("Ви вийшли з акаунту.");
//       setTimeout(() => {
//         this.router.navigate(['/']);
//       }, 500);
//     }).catch(error => {
//       this.toaster.error("Не вдалося вийти з акаунту.");
//     });
//   }
//   // saveChange(user: IRegisterResponse): void {
//   //   this.accountService.getOne(user.id as string).subscribe(data => {
//   //   })
//   // }
// }


import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Auth, signOut, User } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AccountService } from "../../../shared/services/account/account.service";
import { IRegisterResponse } from "../../../shared/interfaces/register/register.interface";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit, OnDestroy {
  public personalForm!: FormGroup;
  private auth: Auth = inject(Auth);
  public currentUser$!: Observable<IRegisterResponse>;
  private userSubscription!: Subscription;

  constructor(
    private router: Router,
    public toaster: ToastrService,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initPersonalForm();
    this.loadUserData();
  }

  /** Ініціалізація форми */
  initPersonalForm(): void {
    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /** 🔍 Отримання даних користувача з Firestore */
  loadUserData(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.currentUser$ = this.accountService.getOne(user.uid) as Observable<IRegisterResponse>;
      this.userSubscription = this.currentUser$.pipe(take(1)).subscribe((userData: IRegisterResponse) => {
        if (userData) {
          this.personalForm.patchValue({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phoneNumber: userData.phoneNumber || '',
            email: user.email || '',
          });
        }
      });
    } else {
      console.warn("Користувач не авторизований.");
    }
  }


  saveChange(): void {
    if (this.personalForm.valid) {
      const user = this.auth.currentUser;
      if (user) {
        const updatedData: IRegisterResponse = {
          ...this.personalForm.value,
          id: user.uid, // Передаємо ID користувача
        };
        this.accountService.update(updatedData, user.uid)
          .then(() => {
            this.toaster.success("Дані оновлено успішно!");
          })
          .catch(error => {
            this.toaster.error("Помилка оновлення даних.");
            console.error(error);
          });
      }
    } else {
      this.toaster.warning("Будь ласка, заповніть всі поля правильно.");
    }
    this.personalForm.reset()
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

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
