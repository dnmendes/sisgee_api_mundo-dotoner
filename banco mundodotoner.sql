CREATE TABLE clientes (
    rua VARCHAR,
    numero VARCHAR,
    cod_cliente SERIAL,
    nome VARCHAR,
    email VARCHAR,
    fone VARCHAR,
    cpf VARCHAR,
    id_pf INT,
    cnpj VARCHAR,
    id_pj INT,
    clientes_TIPO INT,
    PRIMARY KEY (cod_cliente, id_pf, id_pj)
);

CREATE TABLE servicos (
    cod_servico SERIAL PRIMARY KEY,
    data DATE,
    forma_pagamento VARCHAR,
    prazo_entrega VARCHAR,
    venda CHAR,
    orcamento CHAR,
    descricao VARCHAR,
    fk_clientes_cod_cliente INT,
    fk_clientes_id_pf INT,
    fk_clientes_id_pj INT
);

CREATE TABLE produtos (
    cod_produto SERIAL PRIMARY KEY,
    equipamentos CHAR,
    suprimentos CHAR,
    nome VARCHAR,
    descricao VARCHAR,
    serial VARCHAR,
    valor REAL
);

CREATE TABLE prod_fornec_originam (
    fk_fornecedores_cod_fornecedor SERIAL,
    fk_produtos_cod_produto SERIAL
);

CREATE TABLE fornecedores (
    cod_fornecedor SERIAL PRIMARY KEY,
    parceiro CHAR,
    empresa CHAR,
    nome VARCHAR,
    fone VARCHAR,
    email VARCHAR,
    fk_cidades_cod_cidade INT
);

CREATE TABLE cidades (
    cod_cidade SERIAL PRIMARY KEY,
    nome_cidade VARCHAR,
    uf VARCHAR,
    cep VARCHAR
);

CREATE TABLE contem (
    fk_servicos_cod_servico INT,
    fk_produtos_cod_produto INT,
    quantidade VARCHAR
);

CREATE TABLE localizados (
    fk_cidades_cod_cidade INT,
    fk_clientes_cod_cliente INT,
    fk_clientes_id_pf INT,
    fk_clientes_id_pj INT
);
 
ALTER TABLE servicos ADD CONSTRAINT FK_servicos_2
    FOREIGN KEY (fk_clientes_cod_cliente, fk_clientes_id_pf, fk_clientes_id_pj)
    REFERENCES clientes (cod_cliente, id_pf, id_pj)
    ON DELETE CASCADE;
 
ALTER TABLE prod_fornec_originam ADD CONSTRAINT FK_prod_fornec_originam_1
    FOREIGN KEY (fk_fornecedores_cod_fornecedor)
    REFERENCES fornecedores (cod_fornecedor);
 
ALTER TABLE prod_fornec_originam ADD CONSTRAINT FK_prod_fornec_originam_2
    FOREIGN KEY (fk_produtos_cod_produto)
    REFERENCES produtos (cod_produto);
 
ALTER TABLE fornecedores ADD CONSTRAINT FK_fornecedores_2
    FOREIGN KEY (fk_cidades_cod_cidade)
    REFERENCES cidades (cod_cidade)
    ON DELETE CASCADE;
 
ALTER TABLE contem ADD CONSTRAINT FK_contem_1
    FOREIGN KEY (fk_servicos_cod_servico)
    REFERENCES servicos (cod_servico)
    ON DELETE SET NULL;
 
ALTER TABLE contem ADD CONSTRAINT FK_contem_2
    FOREIGN KEY (fk_produtos_cod_produto)
    REFERENCES produtos (cod_produto)
    ON DELETE SET NULL;
 
ALTER TABLE localizados ADD CONSTRAINT FK_localizados_1
    FOREIGN KEY (fk_cidades_cod_cidade)
    REFERENCES cidades (cod_cidade)
    ON DELETE RESTRICT;
 
ALTER TABLE localizados ADD CONSTRAINT FK_localizados_2
    FOREIGN KEY (fk_clientes_cod_cliente, fk_clientes_id_pf, fk_clientes_id_pj)
    REFERENCES clientes (cod_cliente, id_pf, id_pj)
    ON DELETE SET NULL;
	

insert into produtos (equipamentos, suprimentos, nome, descricao, serial, valor)  
       values ('E', '', 'Impressora Canon', 'modeloxr5', 'wer456hj34', 700.00 )
	   returning cod_produto, equipamentos, suprimentos, nome, descricao, serial, valor;