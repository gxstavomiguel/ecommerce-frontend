import { Component } from '@angular/core';
import { ItemCarrinho } from '../../interfaces/itemCarrinho.interface';
import { CarrinhoService } from '../../services/carrinho.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './carrinho.component.html',
})
export class CarrinhoComponent {
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    public imageService: ImageService
  ) {}

  itens: ItemCarrinho[] = [];
  srcImagem!: string;

  getImagemProduto(nome: string): string {
    return this.imageService.getImagem(nome);
  }

  ngOnInit(): void {
    this.itens = this.carrinhoService.obterCarrinho();
  }

  removerItem(id: number): void {
    this.itens = this.itens.filter((item) => item.id !== id);
    this.carrinhoService.salvarCarrinho(this.itens);
  }

  limparCarrinho(): void {
    this.itens = [];
    this.carrinhoService.limparCarrinho();
  }

  get total(): number {
    return this.itens.reduce(
      (soma, item) => soma + item.quantidade * item.preco,
      0
    );
  }

  finalizarCompra(): void {
    this.router.navigate(['/checkout']);
  }
}


