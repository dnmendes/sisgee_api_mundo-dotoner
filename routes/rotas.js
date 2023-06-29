const { Router } = require('express');

const { getprodutos, addprodutos, updateprodutos, getprodutosPorCodigo, deleteprodutos } = require('../controllers/produtosController');

const rotas = new Router();

rotas.route('/produtos')
     .get(getprodutos)
     .post(addprodutos)
      .put(updateprodutos)

        
     
     
     rotas.route('/produtos/:cod_produto')
          .get(getprodutosPorCodigo)
          .delete(deleteprodutos)
      
     
     module.exports = rotas;




