import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {ToastrService} from "ngx-toastr";
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AccountService} from "../../shared/services/account/account.service";
import {CommonModule} from "@angular/common";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import { IRegister } from '../../shared/interfaces/register/register.interface';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AuthDialogComponent implements OnInit {
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public newUser = true;
  public checkPassword = false;

  private registerData!: IRegister;
  private auth: Auth = inject(Auth);
  public loginSubscription!: Subscription;


  constructor(
    public toaster: ToastrService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
  private afs: Firestore
  ) {

  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmationPassword: [null, [Validators.required]],
    });
  }

  register(): void {
    this.newUser = !this.newUser;
    this.initForms()

  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);

    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
      address: '',
      orders: [],
      role: 'USER'
    };

    await setDoc(doc(this.afs, 'users', credential.user.uid), user);
    this.registerForm.reset()
  }



  loginUser(): void {
    const {email, password} = this.loginForm.value;
    this.login(email, password).then(() => this.toaster.success('Ви успішно увійшли!', 'Успіх'))
      .catch((e) => this.toaster.error('Помилка входу: ' + e.message, 'Помилка'));
    this.closeDialog()
  }
  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User UID:', credential.user.uid);

      this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(
        user => {
          this.router.navigate(['/cabinet']);
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
  checkConfirmedPassword(): void {
    // this.checkPassword = this.password.value === this.confirmed.value;
    // if (this.password.value !== this.confirmed.value) {
    //   this.registerForm.controls['confirmationPassword'].setErrors({
    //     matchError: 'Паролі не співпадіють'
    //   })
    // }
  }
  checkRegisterForm(): void {
    console.log('Форма реєстрації валідна:', this.registerForm.valid);
    console.log('Значення форми:', this.registerForm.value);

    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      console.warn('Форма не валідна!');
    }
  }
  registerUser(): void {
    if (!this.registerForm.valid) {
      this.toaster.error('Будь ласка, заповніть всі поля коректно.');
      return;
    }

    this.registerData = this.registerForm.value;  // Спочатку зберігаємо дані
    const { email, password } = this.registerForm.value;

    this.emailSignUp(email, password)
      .then(() => this.toaster.success('Вітаю, ви успішно зареєструвалися!'))
      .catch(e => {
        console.error('Помилка реєстрації:', e);
        this.toaster.error('Помилка реєстрації: ' + e.message);
      });
  }
  // get password(): AbstractControl {
  //   return this.registerForm.controls['password']
  // }
  // get confirmed(): AbstractControl {
  //   return this.registerForm.controls['confirmationPassword']
  // }
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name];
  }
  closeDialog(): void {
    this.dialogRef.close();

  }
}
