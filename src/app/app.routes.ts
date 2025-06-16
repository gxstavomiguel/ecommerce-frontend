import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GetProductsResolver } from './resolvers/get-products.resolver';
import { CarrinhoComponent } from './features/carrinho/carrinho.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
    {
        path: 'produtos',
        loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent),
        resolve: {
            products: GetProductsResolver
        }
    },
    {
        path: 'carrinho',
        component: CarrinhoComponent
    },
    {
        path: 'home',
        redirectTo: ''
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
