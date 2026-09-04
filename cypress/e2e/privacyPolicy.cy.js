describe('Política de Privacidade', () =>{
    beforeEach(() => cy.visit('./src/privacy.html'))

  it('testa a página da política de privacidade de forma independente', () =>{
      cy.title()
        .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})