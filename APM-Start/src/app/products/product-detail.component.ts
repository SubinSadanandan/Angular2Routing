import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    ngOnInit(): void {
        this.product = this.route.snapshot.data['product'];
        //this.getProduct(id);
    }

    constructor(private route: ActivatedRoute) { }

    //getProduct(id: number) {
    //    this.productService.getProduct(id).subscribe(
    //        product => this.product = product,
    //        error => this.errorMessage = <any>error);
    //}
}
