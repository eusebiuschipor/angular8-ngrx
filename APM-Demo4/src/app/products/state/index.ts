import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import * as fromRoot from '../../state/app.state';
import * as fromProducts from './product.reducer';

export interface State extends fromRoot.State {
    products: fromProducts.ProductState;
}