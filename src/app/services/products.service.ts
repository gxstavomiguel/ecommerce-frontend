import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = 'http://localhost:8080/api/produto/';
  private http = inject(HttpClient);

  post(produto: Produto) {
    return this.http.post<Produto>(`${this.apiURL}`, produto);
  }

  getAll() {
    return this.http.get<Produto[]>(`${this.apiURL}`);
  }

  getById(id: number) {
    return this.http.get<Produto>(`${this.apiURL}${id}`);
  }

  put(id: number, produto: Produto) {
    return this.http.put<Produto>(`${this.apiURL}${id}`, produto);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}${id}`);
  }
}
