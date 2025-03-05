import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';
import { CategoryService } from "../../shared/services/category/category.service";
import { ProductService } from "../../shared/services/product/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, SharedModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  public userCategories: Array<ICategoryResponse> = [];
  public categoryStates: { [key: string]: boolean } = {
    snidanky: false,
    starter: false,
    sushiset: false,
    rolls: false,
    ramen: false,
    asianbowls: false,
    napoyi:false,
    asianwok:false,
    deserty:false,
    sushiburgery:false
  };

  constructor(
    private router: Router,
    private categoryServices: CategoryService,
    private productServices: ProductService,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.activatedRoute.paramMap.subscribe(params => {
      const categoryName = params.get('category');
      if (categoryName) {
        this.loadProduct(categoryName);
      }
    });
  }

  loadCategories(): void {
    this.categoryServices.getAll().subscribe((userCategories: ICategoryResponse[]) => {
      this.userCategories = userCategories;
    });
  }

  loadProduct(categoryName: string): void {
    this.productServices.getAllByCategory(categoryName).subscribe({
      next: (data) => {
        this.userProducts = data.map(item => {
          const product = item as IProductResponse;
          product.count = product.count || 1;
          return product;
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Скидаємо всі стани категорій перед встановленням нового
    this.categoryStates = {
      snidanky: false,
      starter: false,
      sushiset: false,
      rolls: false,
      ramen: false,
      asianbowls: false,
      napoyi:false,
      asianwok:false,
      deserty:false,
      sushiburgery:false
    };

    // Якщо вибрана категорія є в об'єкті - оновлюємо її значення
    if (this.categoryStates.hasOwnProperty(categoryName)) {
      this.categoryStates[categoryName] = true;
    }
  }


  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      product.count = (product.count || 0) + 1;
    } else if (!value && (product.count || 0) > 1) {
      product.count = (product.count || 0) - 1;
    }
  }
}
