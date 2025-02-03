import {NgModule} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from "@angular/material/expansion";

const MATERIAL=[MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule,
  MatButtonModule,
  MatExpansionModule
]
@NgModule({
  declarations:[],
  imports:[...MATERIAL],
  exports:[...MATERIAL]
})
export  class SharedModule{}
