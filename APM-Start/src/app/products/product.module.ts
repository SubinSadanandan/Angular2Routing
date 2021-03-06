import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductResolver } from './product-resolver.service';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { AuthGuard } from '../user/auth-guard.service';
import { ProductEditGuard } from './product-guard.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
      SharedModule,
      RouterModule.forChild([
          { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
          {
              path: 'products/:id',
              component: ProductDetailComponent,
              resolve: { product: ProductResolver },
              canActivate: [AuthGuard]
          },
          {
              path: 'products/:id/edit',
              component: ProductEditComponent,
              resolve: { product: ProductResolver },
              canActivate: [AuthGuard],
              canDeactivate: [ProductEditGuard],
              children: [
                  {
                      path: '',
                      redirectTo: 'info',
                      pathMatch:'full'
                  },
                  {
                      path: 'info',
                      component: ProductEditInfoComponent
                  },
                  {
                      path: 'tags',
                      component: ProductEditTagsComponent
                  }
              ]
          }
      ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
      ProductService, ProductResolver, ProductEditGuard
  ]
})
export class ProductModule {}
