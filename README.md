# 🧪 Cypress — Automação E2E da Central de Atendimento ao Cliente TAT

Suíte de testes **end-to-end (E2E)** desenvolvida com **Cypress** para validar a **Central de Atendimento ao Cliente TAT**.

O projeto contempla cenários de sucesso, validações de campos, regras condicionais, comportamentos de erro, upload de arquivos, navegação entre páginas e validações de comportamento da aplicação, buscando reproduzir ações reais realizadas por um usuário.

Além da automação dos testes, o projeto conta com **scripts npm**, execução em **viewport mobile** e **integração contínua (CI) utilizando GitHub Actions**, permitindo que os testes sejam executados automaticamente a cada novo `push` no repositório.

---

## 🚀 Tecnologias

- **Node.js:** 18+
- **JavaScript:** ES6
- **Cypress:** 15.21.1
- **Git**
- **npm**
- **GitHub Actions** (CI)

---

## 📁 Estrutura do projeto

```text
cypress-do-zero-a-nuvem/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline de CI (GitHub Actions)
│
├── cypress/
│   ├── e2e/
│   │   └── CAC-TAT.cy.js          # Suíte principal de testes
│   │
│   ├── fixtures/
│   │   └── example.json           # Massa de dados para testes de upload
│   │
│   └── support/
│       └── commands.js            # Comandos customizados
│
├── src/
│   ├── index.html                 # Interface da aplicação
│   ├── privacy.html               # Página de Política de Privacidade
│   └── script.js                  # Regras e comportamentos da aplicação
│
├── package.json
└── README.md
```

---

## 🧪 Cobertura de testes

Atualmente, a suíte possui **13 cenários principais**:

| # | Cenário | Verificação |
|---|---|---|
| 1 | Título da página | Valida o carregamento correto da aplicação |
| 2 | Happy Path completo | Preenche todos os campos e valida a mensagem de sucesso |
| 3 | E-mail inválido | Valida o bloqueio do envio e a mensagem de erro |
| 4 | Telefone condicional | Verifica se o telefone se torna obrigatório ao selecionar contato por telefone |
| 5 | Preencher e limpar campos | Valida se `clear()` retorna os campos ao estado vazio esperado |
| 6 | Formulário vazio | Verifica se o envio é bloqueado e se o erro é exibido |
| 7 | Telefone com valor inválido | Valida que valores alfanuméricos não são aceitos no campo de telefone |
| 8 | Comando customizado | Valida o uso de `cy.fillMandatoryFieldsAndSubmit()` para reduzir duplicação |
| 9 | Upload de arquivo | Valida o envio de um arquivo utilizando `selectFile()` |
| 10 | Upload com drag-and-drop | Simula o envio de arquivo utilizando a ação `drag-drop` |
| 11 | Upload utilizando fixture e alias | Utiliza `cy.fixture()` e alias para realizar o upload |
| 12 | Política de privacidade — nova aba | Valida os atributos `href` e `target="_blank"` do link |
| 13 | Política de privacidade — navegação | Remove o `target` e valida o acesso à página de política de privacidade |

---

## 📋 Regras de negócio validadas

Os testes automatizados contemplam as seguintes regras e comportamentos:

- Validação de campos obrigatórios antes do envio;
- Validação do formato do e-mail;
- Obrigatoriedade condicional do campo de telefone;
- Validação de valores numéricos no campo de telefone;
- Validação das mensagens de sucesso e erro;
- Reset do formulário após um envio realizado com sucesso;
- Seleção de produto;
- Seleção do tipo de atendimento;
- Seleção das opções de contato;
- Upload de arquivos;
- Navegação para a política de privacidade;
- Abertura da política de privacidade em nova aba.

---

## 📎 Upload de arquivos

O projeto também possui testes voltados para o comportamento de upload de arquivos.

São utilizados diferentes métodos para validar o componente:

### Upload tradicional

Utilização do `selectFile()` para selecionar um arquivo:

```javascript
cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json')
```

A validação verifica se o arquivo selecionado possui o nome esperado.

### Drag-and-drop

O comportamento de arrastar e soltar também é simulado:

```javascript
cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json', {
    action: 'drag-drop'
  })
```

### Upload utilizando fixture e alias

O projeto utiliza uma fixture associada a um alias:

```javascript
cy.fixture('example.json').as('meuArquivo')

cy.get('#file-upload')
  .selectFile('@meuArquivo')
```

Essa abordagem demonstra a utilização de **fixtures e aliases** para reutilização de dados durante os testes.

---

## 🔗 Validação de navegação

Também são realizados testes relacionados à página de **Política de Privacidade**.

O primeiro cenário valida que o link possui os atributos esperados:

```javascript
cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')
```

Outro cenário remove o atributo `target` antes de realizar o clique, permitindo validar a navegação para a página:

```javascript
cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()

cy.contains('h1', 'CAC TAT - Política de Privacidade')
  .should('be.visible')
```

---

## ✅ Boas práticas aplicadas

### Isolamento dos testes

Utilização de `beforeEach` para garantir que cada cenário seja iniciado em um estado conhecido e independente:

```javascript
beforeEach(() => {
  cy.visit('./src/index.html')
})
```

---

### Simulação de ações reais

Os testes reproduzem comportamentos semelhantes aos realizados por um usuário, como:

- Digitar informações;
- Selecionar opções;
- Marcar campos;
- Limpar informações;
- Enviar o formulário;
- Selecionar arquivos;
- Simular drag-and-drop;
- Acessar páginas através de links.

---

### Testes positivos e negativos

A suíte não se limita ao **Happy Path**.

Também são cobertos cenários de:

- Dados válidos;
- Dados inválidos;
- Campos obrigatórios não preenchidos;
- Regras condicionais;
- Tentativas de envio que devem ser bloqueadas;
- Valores inválidos;
- Upload de arquivos;
- Validação de navegação.

---

### Assertions explícitas

Utilização de `should()` e `expect()` para validar os resultados esperados.

Exemplo:

```javascript
cy.get('.success')
  .should('be.visible')
```

Exemplo de validação utilizando `expect()`:

```javascript
.should(input => {
  expect(input[0].files[0].name)
    .to.equal('example.json')
})
```

---

### Reutilização de código

Foi criado um **comando customizado** para centralizar o preenchimento dos campos obrigatórios e o envio do formulário:

```javascript
cy.fillMandatoryFieldsAndSubmit(data)
```

```javascript
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
  firstName: 'Teste',
  lastName: 'da Silva',
  email: 'teste@teste.com',
  text: 'TESSTE'
}) => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.contains('button', 'Enviar').click()
})
```

Essa abordagem reduz duplicação e facilita a manutenção dos testes.

---

### Fixtures

O projeto utiliza **fixtures** para disponibilizar dados utilizados durante os testes.

Exemplo:

```javascript
cy.fixture('example.json')
```

As fixtures também podem ser associadas a aliases para facilitar sua utilização:

```javascript
cy.fixture('example.json').as('meuArquivo')
```

---

## 📦 Scripts npm

O projeto possui scripts configurados no `package.json` para facilitar a execução dos testes.

### Abrir o Cypress

```bash
npm run cy:open
```

Abre o Cypress em modo interativo.

### Executar os testes

```bash
npm test
```

Executa os testes em modo **headless** através do comando `cypress run`.

### Abrir o Cypress em viewport mobile

```bash
npm run mobile
```

Executa o Cypress em modo interativo utilizando:

```text
viewportWidth: 410
viewportHeight: 860
```

### Executar os testes em viewport mobile no modo headless

```bash
npm run mobile:headless
```

Executa os testes utilizando a configuração de viewport mobile em modo headless.

---

## 🔄 Integração Contínua — GitHub Actions

O projeto possui um workflow de **GitHub Actions** configurado para executar os testes E2E automaticamente a cada `push` realizado no repositório.

Fluxo configurado:

```text
Push para o GitHub
        ↓
GitHub Actions
        ↓
Ubuntu 22.04
        ↓
Checkout do repositório
        ↓
Cypress GitHub Action
        ↓
Execução dos testes E2E
```

Workflow utilizado:

```yaml
name: End-to-end tests

on: push

jobs:
  cypress-run:
    runs-on: ubuntu-22.04

    steps:
      - name: checkout
        uses: actions/checkout@v4

      - name: Cypress run
        uses: cypress-io/github-action@v6
```

Dessa forma, alterações enviadas para o repositório acionam automaticamente o pipeline e executam a suíte de testes.

Essa configuração permite aplicar o conceito de **Continuous Integration (CI)** ao projeto, garantindo uma validação automatizada a cada nova alteração enviada ao GitHub.

---

## 🔎 Exemplo de fluxo automatizado

Um dos principais cenários da suíte segue o fluxo:

```text
Acessar aplicação
       ↓
Preencher campos obrigatórios
       ↓
Selecionar opções necessárias
       ↓
Enviar formulário
       ↓
Validar mensagem de sucesso
       ↓
Validar comportamento esperado
```

---

## 🧪 Conceitos de QA aplicados

O projeto busca aplicar conceitos fundamentais de **Quality Assurance (QA)** e automação de testes, incluindo:

- Testes end-to-end;
- Testes funcionais;
- Cenários positivos e negativos;
- Happy Path;
- Validação de regras de negócio;
- Validação de campos;
- Validação de mensagens de erro;
- Assertions;
- Isolamento de testes;
- Comandos customizados;
- Reutilização de código;
- Fixtures;
- Aliases;
- Upload de arquivos;
- Drag-and-drop;
- Validação de navegação;
- Execução headless;
- Testes em viewport mobile;
- Integração contínua (CI);
- GitHub Actions.

---

## 🎯 Objetivo do projeto

Este projeto tem como objetivo demonstrar a aplicação prática de **automação de testes E2E com Cypress**, utilizando conceitos de QA e boas práticas de automação.


O projeto também serve como base para a evolução da suíte e aplicação de conceitos mais avançados de **Quality Assurance (QA)**, automação de testes e integração contínua.

---

## 👨‍💻 Autor

**Patrick Sousa do Nascimento**

Projeto desenvolvido como parte dos estudos práticos em **Quality Assurance e Automação de Testes**, seguindo o curso **Cypress do Zero a Nuvem** da escola TalkingAboutTesting.
