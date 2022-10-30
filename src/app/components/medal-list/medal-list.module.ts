import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MedalListComponent } from './medal-list.component';

@NgModule({
  declarations: [MedalListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [MedalListComponent]

})
export class MedalListModule { }
