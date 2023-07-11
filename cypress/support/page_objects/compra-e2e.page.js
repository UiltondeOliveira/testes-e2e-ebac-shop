class CompraE2E {

    buscarProduto(nomeProduto){
        cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .tbay-search')
            .click()
            .type(nomeProduto)

        cy.get('.search > .tbay-search-form > .form-ajax-search > .form-group > .input-group > .button-group > .button-search')
            .click()

        cy.wait(500)   
    }

    adicionarProdutoAoCarrinho(tamanhoProduto, corProduto, quantidadeProduto){
        cy.get('.button-variable-item-'+ tamanhoProduto).click()
        cy.get('.button-variable-item-'+ corProduto).click()
        cy.get('.input-text').clear().type(quantidadeProduto)
        cy.get('.single_add_to_cart_button').click()
    }

    checkout(){
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
    }

    finalizarCompra(){
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()        
    }
}

export default new CompraE2E()