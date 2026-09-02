# 🧪 Cypress — Automação E2E da Central de Atendimento ao Cliente TAT

Suíte de testes **end-to-end (E2E)** desenvolvida com **Cypress** para validar a **Central de Atendimento ao Cliente TAT**.

O projeto contempla cenários de sucesso, validações de campos, regras condicionais e comportamentos de erro, buscando reproduzir ações reais realizadas por um usuário na aplicação.

---

## 🚀 Tecnologias

- **Cypress:** 15.21.1
- **JavaScript:** ES6
- **Node.js:** 18+
- **npm**

---

## 📁 Estrutura do projeto

```text
cypress-do-zero-a-nuvem/
├── cypress/
│   ├── e2e/
│   │   └── CAC-TAT.cy.js          # Suíte principal de testes
│   │
│   └── support/
│       └── commands.js            # Comandos customizados
│
├── src/
│   ├── index.html                 # Interface da aplicação
│   └── script.js                  # Regras e comportamentos da aplicação
│
├── package.json
└── README.md
```
---

## 🧪 Cobertura de testes

Atualmente, a suíte possui **8 cenários principais**:

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

---

## 📋 Regras de negócio validadas

Os testes automatizados contemplam as seguintes regras:

- Validação de campos obrigatórios antes do envio;
- Validação do formato do e-mail através de regex;
- Obrigatoriedade condicional do campo de telefone;
- Validação das mensagens de sucesso e erro;
- Reset do formulário após um envio realizado com sucesso.

---

## ✅ Boas práticas aplicadas

### Isolamento dos testes

Utilização de `beforeEach` para garantir que cada cenário seja iniciado em um estado conhecido e independente:

```javascript
beforeEach(() => {
  cy.visit('./src/index.html')
})
```

### Simulação de ações reais

Os testes reproduzem comportamentos semelhantes aos realizados por um usuário, como:

- Digitar informações;
- Selecionar opções;
- Marcar campos;
- Limpar informações;
- Enviar o formulário.

### Testes positivos e negativos

A suíte não se limita ao **Happy Path**.

Também são cobertos cenários de:

- Dados inválidos;
- Campos obrigatórios não preenchidos;
- Regras condicionais;
- Tentativas de envio que devem ser bloqueadas.

### Assertions explícitas

Utilização de `should()` para validar os resultados esperados:

```javascript
cy.get('.success').should('be.visible')
```

### Reutilização de código

Foi criado um **comando customizado** para centralizar o preenchimento dos campos obrigatórios e o envio do formulário:

```javascript
cy.fillMandatoryFieldsAndSubmit()
```

Essa abordagem reduz duplicação e facilita a manutenção dos testes.

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
Validar reset do formulário
```

---

## 🎯 Objetivo do projeto

Este projeto tem como objetivo demonstrar a aplicação prática de **automação de testes E2E com Cypress**, utilizando conceitos como:

- Testes funcionais;
- Cenários positivos e negativos;
- Validação de regras de negócio;
- Assertions;
- Isolamento de testes;
- Comandos customizados;
- Reutilização de código;
- Boas práticas de automação.

O projeto também serve como base para a evolução da suíte e aplicação de conceitos mais avançados de **Quality Assurance (QA)** e automação de testes.

---

## 👨‍💻 Autor

**Patrick Sousa do Nascimento**

Projeto desenvolvido como parte dos estudos práticos em **Quality Assurance e Automação de Testes** seguindo o curso **Cypress do Zero a Nuvem** da escola TalkingAboutTesting.