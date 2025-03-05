import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category/category.service";
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import {ImageService} from "../../shared/services/images/images.service";

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss'
})
export class AdminCategoryComponent implements OnInit{
  [x: string]: any;
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
    private categoryServices: CategoryService,
  private imagesServices: ImageService
  ) {
  }
  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories()
  }
  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required]
    });

  }

  loadCategories(): void {
    this.categoryServices.getAll().subscribe(data => {
       this.adminCategories = data as ICategoryResponse [];
    });
  }

  add(): void {
    this.addBlock=true;
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  addCategory(): void {
    if (this.editStatus) {
      this.categoryServices.update(this.categoryForm.value, this.currentCategoryId).then(() => {
        this.loadCategories();
      });
    } else {
      this.categoryServices.create(this.categoryForm.value).then(() => {
        this.loadCategories();
      });
    }
    this.addBlock = false;
    this.categoryForm.reset();
  }

  editCategory(category: ICategoryResponse): void {
    this.currentCategoryId = category.id; // Зберігаємо ID категорії для редагування
    this.editStatus = true; // Активуємо статус редагування
    this.addBlock = true; // Відкриваємо блок форми

    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imgPath: category.imgPath
    });
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryServices.delete(category.id).then(() => {
      this.loadCategories();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imagesServices.uploadFile('img', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;

  }
  deleteImg(): void {
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
}
