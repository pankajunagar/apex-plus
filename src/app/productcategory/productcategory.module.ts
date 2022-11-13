import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductcategoryPage } from './productcategory.page';
import { AlphabeticalScrollBarModule } from 'alphabetical-scroll-bar';

const routes: Routes = [
  {
    path: '',
    component: ProductcategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AlphabeticalScrollBarModule
  ],
  declarations: [ProductcategoryPage]
})
export class ProductcategoryPageModule {}
