
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService,
        private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        IProduct | Observable<IProduct> | Promise<IProduct> {

        let id = route.params["id"];
        if (isNaN(id)) {
            console.log(`Product Id is not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }

        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Error while retrieving: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }

}