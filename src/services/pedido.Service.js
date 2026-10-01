import * as pedidoRepo from '../repositories/pedidoRepository.js';

export async function registrarPedido(dadosPedido) {
  if (!dadosPedido) {
    throw new Error('Os dados do pedido não foram enviados.');
  }

  const { cliente_id, forma_pagamento, taxa_entrega, valor_total, observacoes } = dadosPedido;

  if (!cliente_id || !forma_pagamento || valor_total === undefined) {
    throw new Error('Campos obrigatórios estão faltando: cliente_id, forma_pagamento e valor_total são necessários.');
  }

  const pedidoFormatado = {
    cliente_id,
    forma_pagamento,
    taxa_entrega: taxa_entrega || 0.00,
    valor_total,
    observacoes: observacoes || null
  };

  const novoPedido = await pedidoRepo.salvarPedido(pedidoFormatado);
  
  if (!novoPedido || novoPedido.length === 0) {
    throw new Error('Erro ao registrar o pedido no banco de dados.');
  }

  return novoPedido;
}

export async function obterPainelPedidos() {
  const pedidos = await pedidoRepo.obterPedidosComClientes();
  return pedidos;
}

export async function atualizarStatus(id, status) {
  if (!id || !status) {
    throw new Error('O ID do pedido e o novo status são obrigatórios.');
  }

  const pedidoAtualizado = await pedidoRepo.mudarStatusPedido(id, status);
  
  if (!pedidoAtualizado || pedidoAtualizado.length === 0) {
    throw new Error('Pedido não encontrado para atualização ou erro no banco.');
  }

  return pedidoAtualizado;
}
