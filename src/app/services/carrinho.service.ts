import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../interfaces/itemCarrinho.interface';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private readonly STORAGE_KEY = 'carrinho';
  constructor() {}

  obterCarrinho(): ItemCarrinho[] {
    const carrinho = localStorage.getItem(this.STORAGE_KEY);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  salvarCarrinho(itens: ItemCarrinho[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
  }

  private atualizarCarrinho(
    transform: (c: ItemCarrinho[]) => ItemCarrinho[]
  ): void {
    const atual = this.obterCarrinho();
    const atualizado = transform(atual);
    this.salvarCarrinho(atualizado);
  }

  adicionarProduto(item: ItemCarrinho): void {
    this.atualizarCarrinho((carrinho) => {
      const existente = carrinho.find((i) => i.id === item.id);
      if (existente) {
        existente.quantidade += item.quantidade;
      } else {
        carrinho.push(item);
      }
      return carrinho;
    });
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
