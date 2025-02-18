import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { Auth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent implements OnInit {
  public passwordForm!: FormGroup;
  private auth: Auth = inject(Auth);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      passwordOld: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmationPassword: [null, [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmationPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmationPassword')?.setErrors({ matchError: true });
    } else {
      form.get('confirmationPassword')?.setErrors(null);
    }
  }

  checkVisibilityError(control: string, name: string): boolean {
    const formControl = this.passwordForm.get(control);
    return formControl && formControl.touched && formControl.errors?.[name] ? true : false;
  }

  /** 🔄 Оновлення паролю */
  async saveChange(): Promise<void> {
    if (this.passwordForm.invalid) {
      this.toaster.warning("Будь ласка, заповніть всі поля правильно.");
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      this.toaster.error("Користувач не авторизований.");
      return;
    }

    const { passwordOld, password } = this.passwordForm.value;

    try {
      // 🔑 Підтвердження поточного пароля
      const credential = EmailAuthProvider.credential(user.email!, passwordOld);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, password);
      this.toaster.success("Пароль успішно змінено!");
      this.passwordForm.reset();

    } catch (error) {
      this.toaster.error("Помилка зміни паролю");
      console.error(error);
    }
  }
}
