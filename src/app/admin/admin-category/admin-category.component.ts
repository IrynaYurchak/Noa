import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category/category.service";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent implements OnInit{
  public adminCategories: Array<ICategoryResponse> = [];
  public addBlock = false;
  public editStatus=false;
  public categoryForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId!: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryServices: CategoryService

  ) {
  }
  ngOnInit(): void {
    this.initCategoryForm();
  }
  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }
  add(): void {
    this.addBlock=true;
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  addCategory():void{

  }
  upload(event: any): void{}
  valueByControl(control: string): any{

  }
  deleteImg():void{

  }
}
