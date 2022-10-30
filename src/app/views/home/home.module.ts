import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListModule } from 'src/app/components/category-list/category-list.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    CategoryListModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
