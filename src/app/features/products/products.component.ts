import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Produto } from '../../interfaces/produto.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCarrinho } from '../../interfaces/itemCarrinho.interface';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  products = signal<Produto[]>([]);
  srcImagem!: string;

  constructor(
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public imageService: ImageService
  ) {
    this.route.data.subscribe((data) => {
      this.products.set(data['products']);
    });
  }

  getImagemProduto(nome: string): string {
    return this.imageService.getImagem(nome);
  }

  private productMappingForItem(produto: Produto): ItemCarrinho {
    return {
      id: produto.id,
      nome: produto.nome,
      quantidade: 1,
      preco: produto.preco,
      imagem: this.imageService.getImagem(produto.nome),
    };
  }

  comprarProduto(produto: Produto) {
    const item = this.productMappingForItem(produto);
    this.carrinhoService.adicionarProduto(item);
    this.router.navigate(['/carrinho']);
  }

  adicionarProdutoCarrinho(produto: Produto) {
    const item = this.productMappingForItem(produto);
    this.carrinhoService.adicionarProduto(item);
    this.snackBar.open('Produto adicionado ao carrinho!', 'X', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
    });
  }

  get produtos(){
    return this.products();
  }

  filtro = '';

  produtosFiltrados(){
    return this.products().filter(p => 
      p.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

}
