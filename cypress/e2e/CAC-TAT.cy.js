describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))

  const longtext = Cypress._.repeat('Cypress é massa d+ ', 20)
  const data = {
    firstName: 'Patrick',
    lastName: 'Sousa do Nascimento',
    email: 'patrick@teste.com',
    text: 'teste' 
  }

  it('Valida o titulo da página', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  });

  it('HappyPath', () => {
    cy.get('#firstName')
      .type('Patrick')
      .should('have.value', 'Patrick')

    cy.get('#lastName')
      .type('Sousa do Nascimento')
      .should('have.value', 'Sousa do Nascimento')

    cy.get('#email')
      .type('patrick@teste.com')
      .should('have.value', 'patrick@teste.com')

    cy.get('#phone')
      .type('912345678')
      .should('have.value', '912345678')

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    cy.get('#email-checkbox').click()

    cy.get('#open-text-area')
      .type(longtext, { delay: 0 })
      .should('have.value', longtext)

    cy.contains('button', 'Enviar').click()

    cy.get('.success')
      .should('be.visible', 'Mensagem enviada com sucesso')
  });

  it.only('Login com email incorreto', () => {
    cy.get('#firstName')
      .type('Patrick')
      .should('have.value', 'Patrick')

    cy.get('#lastName')
      .type('Sousa do Nascimento')
      .should('have.value', 'Sousa do Nascimento')

    cy.get('#email')
      .type('patrick')
      .should('have.value', 'patrick')

    cy.get('#phone')
      .type('912345678')
      .should('have.value', '912345678')

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })

    cy.get('#email-checkbox').click()

    cy.get('#open-text-area')
      .type(longtext, { delay: 0 })
      .should('have.value', longtext)

    cy.contains('button', 'Enviar').click()

    cy.get('.error')
      .should('be.visible', 'Valide os campos obrigatórios!')
  })

  it('Valida mensagem de erro no campo telefone quando obrigatorio', () => {
    cy.get('#firstName')
      .type('Patrick')
      .should('have.value', 'Patrick');

    cy.get('#lastName')
      .type('Sousa do Nascimento')
      .should('have.value', 'Sousa do Nascimento');

    cy.get('#email')
      .type('patrick@teste.com')
      .should('have.value', 'patrick@teste.com');

    cy.get('#phone');

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube');

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

    cy.get('#phone-checkbox').click();

    cy.get('#open-text-area')
      .type(longtext, { delay: 0 })
      .should('have.value', longtext);

    cy.contains('button', 'Enviar').click()

    cy.get('.error')
      .should('be.visible', 'Valide os campos obrigatórios!');
  });

  it('Preenche e limpa os campos nome, sobrenome, email, e telefone', () => {
    cy.get('#firstName')
      .type('Patrick')
      .should('have.value', 'Patrick')
      .clear()
      .should('have.value', '');

    cy.get('#lastName')
      .type('Sousa do Nascimento')
      .should('have.value', 'Sousa do Nascimento')
      .clear()
      .should('have.value', '');

    cy.get('#email')
      .type('patrick@teste.com')
      .should('have.value', 'patrick@teste.com')
      .clear()
      .should('have.value', '');

    cy.get('#phone')
      .type('912345678')
      .should('have.value', '912345678')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error')
      .should('be.visible', 'Valide os campos obrigatórios!');
  });

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get('.success')
      .should('be.visible', 'Mensagem enviada com sucesso');
  });
});
