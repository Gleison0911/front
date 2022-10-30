import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModule
  ],
  exports: [CategoryListComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CategoryListModule { }
