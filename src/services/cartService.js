const cartRepository = require('../repositories/cartRepository');

const processarAdicaoItem = async (dadosItem) => {
  
    const itemExistente = await cartRepository.buscarItemIgual(dadosItem);

    if (itemExistente) {
      
        const novaQuantidade = itemExistente.quantidade + (dadosItem.quantidade || 1);
        return await cartRepository.atualizarQuantidade(itemExistente.id, novaQuantidade);
    }

   
    return await cartRepository.criarItemCarrinho(dadosItem);
};

module.exports = { processarAdicaoItem };
