/// <reference types='cypress'/>
import CompraE2E from "../support/page_objects/compra-e2e.page"
import random from "random";

const dadosFaturamento = require('../fixtures/dadosFaturamento.json')
const sizes = require('../fixtures/tamanhos.json')
const colors = require('../fixtures/cores.json')
const clothers = require('../fixtures/produtos.json')

var id = random.int(0, 2)
var qty = random.int(1, 10)
var size = random.choice(sizes)
var color = random.choice(colors)
var clother = random.choice(clothers)

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

        beforeEach(() => {
            cy.visit('minha-conta')
            cy.fixture('perfil').then(dados => {
                cy.login(dados.usuario, dados.senha)
            })
        });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        CompraE2E.buscarProduto(clother)
        CompraE2E.adicionarProdutoAoCarrinho(size, color, qty)
        CompraE2E.checkout()
        cy.fixture('dadosFaturamento').then(dadosFaturamento => {
            cy.enderecoFaturamento(
                dadosFaturamento[id].nome, 
                dadosFaturamento[id].sobrenome, 
                dadosFaturamento[id].pais, 
                dadosFaturamento[id].endereco, 
                dadosFaturamento[id].cidade, 
                dadosFaturamento[id].estado, 
                dadosFaturamento[id].cep, 
                dadosFaturamento[id].telefone, 
                dadosFaturamento[id].email
            )
        })
        CompraE2E.finalizarCompra()       
    });
})