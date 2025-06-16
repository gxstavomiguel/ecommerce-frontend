import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { ItemCarrinho } from '../../interfaces/itemCarrinho.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, CommonModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  itensCarrinho: ItemCarrinho[] = [];
  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
    });
  }

  

  finalizarPedido(): void {
  if (this.checkoutForm.valid) {
    const usuario = this.checkoutForm.value;

    this.usuarioService.post(usuario).subscribe({
      next: (usuarioSalvo) => {
        const valorTotal = this.carrinhoService.obterCarrinho().reduce((soma, item) => soma + item.quantidade * item.preco, 0);
        const pedido = {
          usuario : { id: usuarioSalvo.id },
          valorTotal: valorTotal,
          usuarioId: usuarioSalvo.id,
          itens: this.carrinhoService.obterCarrinho().map(item => ({
            produto: {id: item.produto ? item.produto.id : item.id},
            quantidade: item.quantidade,
            precoUnitario: item.preco
          }))
        };

        this.pedidoService.criarPedido(pedido).subscribe({
          next: (pedidoSalvo) => {
            this.snackBar.open('Compra finalizada com sucesso!', '✅', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['']);
            });

            this.carrinhoService.limparCarrinho();
          },
          error: (erroPedido) => {
            console.error('Erro ao salvar o pedido:', erroPedido);
            this.snackBar.open('Erro ao salvar pedido. Tente novamente.', '❌', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end'
            });
          }
        });
      },
      error: (errorUsuario) => {
        console.error('Erro ao salvar o usuário:', errorUsuario);
        this.snackBar.open('Erro ao finalizar compra. Tente novamente.', '❌', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end'
        });
      }
    });
  } else {
    this.checkoutForm.markAllAsTouched();
  }
}

}
