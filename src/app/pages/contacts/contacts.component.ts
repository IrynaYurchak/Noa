import { Component } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  public infoForm!: FormGroup;
  public  submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,


  ){}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.infoForm = this.fb.group({
      name: [null, [Validators.required,]],
      lastName: [null, [Validators.required,]],
      phone: [null, [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
      email:[null, [Validators.required, Validators.email]],
      message:[null, [Validators.required,]]
    });
  }
  sent(): void {
    this.infoForm.reset()
    this.submitted = true;
    if (this.infoForm.invalid) {
      return;
    }
  }


}
