import {Routes} from '@angular/router';
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
import {AutorizationAdminComponent} from "./pages/autorization-admin/autorization-admin.component";
import {authGuard} from "./shared/guards/auth.guard";
import {CabinetComponent} from "./pages/cabinet/cabinet.component";
import {PersonalComponent} from "./pages/cabinet/personal/personal.component";
import {FavoriteComponent} from "./pages/cabinet/favorite/favorite.component";
import {OrdersComponent} from "./pages/cabinet/orders/orders.component";
import {ChangePassComponent} from "./pages/cabinet/change-pass/change-pass.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'product/:category', component: ProductComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'vacancy', component: VacancyComponent},
  {path: 'autorization', component: AutorizationAdminComponent},
  {
    path: 'admin',
    component: AdminComponent, canActivate: [authGuard],
    children: [
      {path: 'category', component: AdminCategoryComponent},
      {path: 'product', component: AdminProductComponent},
      {path: '', pathMatch: 'full', redirectTo: 'category'},
    ],
  },
  {
    path: 'cabinet', component: CabinetComponent,
    children: [
      {path: 'personal', component: PersonalComponent},
      {path: 'favorite', component: FavoriteComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'change', component: ChangePassComponent},
      {path: '', pathMatch: 'full', redirectTo: 'personal'},
    ],
  },
];
