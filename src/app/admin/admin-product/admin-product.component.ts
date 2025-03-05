import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ProductService} from "../../shared/services/product/product.service";
import {SharedModule} from "../../shared/shared.module";
import {CategoryService} from "../../shared/services/category/category.service";
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import {ImageService} from "../../shared/services/images/images.service";


@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent implements OnInit {
  [x: string]: any;

  public adminProducts: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public addBlock = false;
  public editStatus = false;
  public productForm!: FormGroup;
  public isUploaded = false;
  private currenProductId = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productServise: ProductService,
    private imagesServices: ImageService
  ) {

  }

  ngOnInit(): void {
    this.initProductForm()
    this.loadCategories();
    this.loadProduct();
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

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    });
  }

  loadProduct(): void {
    this.productServise.getAll().subscribe(data => {
      this.adminProducts = data;

    });
  }

  add(): void {
    this.addBlock = true;
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.productForm.patchValue({});
  }


  addProduct(): void {
    if (this.editStatus) {
      this.productServise.update(this.productForm.value, this.currenProductId).then(() => {
        this.loadProduct();
      });
    } else {
      this.productServise.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
      });
    }
    this.addBlock = false;
    this.productForm.reset();

  }

  editProduct(product: IProductResponse): void {
    this.addBlock = true;
    this.editStatus = true;
    this.isUploaded = true;
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      price: product.price,
      imgPath: product.imgPath,
      weight:product.weight

    });
    this.currenProductId = product.id;
  }


  deleteProduct(product: IProductResponse): void {
    this.productServise.delete(product.id).then(() => {
      this.loadProduct();
    })
  }


  upload(event: any): void {
    const file = event.target.files[0];
    this.imagesServices.uploadFile('img', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;

  }

  deleteImg(): void {
    this.isUploaded = false;
  }
}
