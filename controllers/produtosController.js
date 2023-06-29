const { getprodutosDB, addprodutosDB, updateprodutosDB, deleteprodutosDB, getprodutosPorCodigoDB  } = require('../usecases/produtoUseCases')

const getprodutos = async (request, response) => {
    await getprodutosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o produto: ' + err
        }));
}

const addprodutos = async (request, response) => {
    await addprodutosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateprodutos = async (request, response) => {
    await updateprodutosDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteprodutos = async (request, response) => {
    await deleteprodutosDB(parseInt(request.params.cod_produto))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getprodutosPorCodigo = async (request, response) => {
    await getprodutosPorCodigoDB(parseInt(request.params.cod_produto))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getprodutos, addprodutos, updateprodutos, deleteprodutos, getprodutosPorCodigo
}



