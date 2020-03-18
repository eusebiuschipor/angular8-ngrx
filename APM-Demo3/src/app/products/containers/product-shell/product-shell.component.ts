import { Component, OnInit } from '@angular/core';

import { Product } from '../../product';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  componentActive = true;
  displayCode: boolean;
  products$: Observable<Product[]>;
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit() {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<>;
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  this.store.pipe(
    select(fromProduct.getCurrentProduct),
    takeWhile(() => this.componentActive)
  ).subscribe(
    currentProduct => this.selectedProduct = currentProduct
  );

  this.store.pipe(
    select(fromProduct.getShowProductCode),
    takeWhile(() => this.componentActive)
  ).subscribe(
    showProductCode => this.displayCode = showProductCode
  );
}
