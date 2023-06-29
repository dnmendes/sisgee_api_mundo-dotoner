const { pool } = require('../config');

const getprodutosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM produtos order by cod_produto');
        return rows;        
    } catch (err) {
        throw "Erro : " + err;
    }
}


const addprodutosDB = async (body) => {
    try {   
        const { equipamentos, suprimentos, nome, descricao, serial, valor } = body; 
        const results = await pool.query(`INSERT INTO produtos (equipamentos, suprimentos, nome, descricao, serial, valor) 
        values ($1, $2, $3, $4, $5, $6) returning cod_produto, equipamentos, suprimentos, nome, descricao, serial, valor`,
        [equipamentos, suprimentos, nome, descricao, serial, valor]);
        return results.rows[0];
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }    
}

const updateprodutosDB = async (body) => {
    try {   
        const { cod_produto, equipamentos, suprimentos, nome, descricao, serial, valor }  = body; 
        const results = await pool.query(`UPDATE produtos SET equipamentos=$1, suprimentos=$2, nome=$3, descricao=$4, serial=$5, valor=$6
        where cod_produto=$7 returning cod_produto, equipamentos, suprimentos, nome, descricao, serial, valor`,
        [equipamentos, suprimentos, nome, descricao, serial, valor, cod_produto]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${cod_produto} para ser alterado`;
        }
        return results.rows[0];
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }      
}

const deleteprodutosDB = async (cod_produto) => {
    try {           
        const results = await pool.query(`DELETE FROM produtos WHERE cod_produto = $1`,
        [cod_produto]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${cod_produto} para ser removido`;
        } else {
            return "Produto removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o produto: " + err;
    }     
}

const getprodutosPorCodigoDB = async (cod_produto) => {
    try {           
        const results = await pool.query(`SELECT * FROM produtos WHERE cod_produto = $1`,
        [cod_produto]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + cod_produto;
        } else {
            return results.rows[0];            
        }       
    } catch (err) {
        throw "Erro ao recuperar o produto: " + err;
    }     
}

module.exports = {
    getprodutosDB, addprodutosDB, updateprodutosDB, deleteprodutosDB, getprodutosPorCodigoDB
}



