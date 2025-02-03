import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {DeliveryComponent} from "./pages/delivery/delivery.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {VacancyComponent} from "./pages/vacancy/vacancy.component";
import {ProductComponent} from "./pages/product/product.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminCategoryComponent} from "./admin/admin-category/admin-category.component";
import {AdminProductComponent} from "./admin/admin-product/admin-product.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'product/:category', component: ProductComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'vacancy', component: VacancyComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' },
    ],
  },
];
