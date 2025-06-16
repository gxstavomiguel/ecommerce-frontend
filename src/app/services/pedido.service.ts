import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  private apiURL = 'http://localhost:8080/api/pedido/';

  criarPedido(pedidoData: any) {
    return this.http.post(this.apiURL, pedidoData);
  }
}
