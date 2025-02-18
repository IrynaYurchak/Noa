import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Router, RouterModule} from "@angular/router";
import {AccountService} from "../../shared/services/account/account.service";
import {ToastrService} from "ngx-toastr";
import {UserCredential, signInWithEmailAndPassword, Auth, getAuth} from "@angular/fire/auth";
import {doc, docData, Firestore} from "@angular/fire/firestore";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-autorization-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  templateUrl: './autorization-admin.component.html',
  styleUrl: './autorization-admin.component.scss'
})
export class AutorizationAdminComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  private auth: Auth = inject(Auth);
  public loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private afs: Firestore
  ) {
  }


  ngOnInit(): void {
    this.initForms()
  }

  initForms(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginAdmin(): void {
    const {email, password} = this.loginForm.value;
    this.login(email, password).then(() => {
      this.toaster.success('Вітаю, ви увійшли.');
    })
      .catch(e => {
        console.log(e);
      })

  }

  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User UID:', credential.user.uid);

      this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(
        user => {
          console.log('User data:', user);

          this.router.navigate(['/admin']);
        },
        e => {
          console.error('Firestore error:', e);
        }
      );
    } catch (error) {
      console.error('Login error:', error);
      this.toaster.error('Помилка авторизації. Перевірте email та пароль.');
    }
  }


  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
