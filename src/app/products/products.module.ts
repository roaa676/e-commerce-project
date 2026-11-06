import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from "../shared/shared.module";
import { SelectComponent } from '../shared/components/select/select.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms';



@NgModule({
    declarations: [
        AllProductsComponent,
        ProductDetailsComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
        
    ],
    exports: [
        AllProductsComponent,
        ProductDetailsComponent,
        NgModel
    ]
})
export class ProductsModule { }
