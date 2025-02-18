import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ProductService} from "../../shared/services/product/product.service";
import {SharedModule} from "../../shared/shared.module";
import {CategoryService} from "../../shared/services/category/category.service";
import { IProductResponse } from '../../shared/interfaces/category/product.interface';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent implements OnInit{
  [x: string]: any;
  public adminProducts: Array<IProductResponse> = [];
  public addBlock = false;
  public editStatus = false;
  public productForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;
  private currenProductId = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productServise: ProductService,
  ) {

  }

  ngOnInit(): void {
    this.initProductForm()
    }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imgPath: [null, Validators.required],
      count: [1]
    });
  }
  add(): void {
this.addBlock = true;
  }

  addProduct(): void {

  }
  upload(event: any): void{}
  valueByControl(control: string): any{

  }
  deleteImg():void{

  }
  editProduct():void {}
  deleteProduct():void {}
}
