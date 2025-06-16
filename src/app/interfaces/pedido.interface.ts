import { ItemCarrinho } from "./itemCarrinho.interface";

export interface Pedido {
    id: number,
    usuarioId: number,
    dataPedido: string,
    valorTotal: number,
    status: 'CRIADO' | 'PAGO' | 'CANCELADO';
    itens: ItemCarrinho[];
}