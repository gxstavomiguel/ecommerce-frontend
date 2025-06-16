import { Pedido } from "./pedido.interface";
import { Produto } from "./produto.interface";

export interface ItemCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  imagem?: string;
  produto?: Produto;
  pedido? : Pedido;
}
