import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RulesListComponent } from './rules-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RulesListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [RulesListComponent]
})
export class RulesListModule { }
