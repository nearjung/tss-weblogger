import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullMainRoutingModule } from './full-main-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FullMainRoutingModule, BrowserModule, HttpClientModule
  ]
})
export class FullMainModule { }
