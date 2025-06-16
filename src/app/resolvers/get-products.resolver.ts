import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Resolve } from '@angular/router';
import { Produto } from '../interfaces/produto.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GetProductsResolver implements Resolve<Produto[]> {
  constructor(private productsService : ProductsService) {}

  resolve(): Observable<Produto[]>{
    return this.productsService.getAll();
  }

}
