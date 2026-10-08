# Consulta de endereço por CEP

Demonstração de um formulário de cadastro que consulta a API ViaCEP para preencher automaticamente os dados de endereço.

**Demonstração:** https://raphael-bezerra.github.io/js-consumindo-dados-api/ (após publicação no GitHub Pages)

## Funcionalidades

- Consulta de endereço ao sair do campo CEP.
- Normalização e validação do formato do CEP.
- Preenchimento de logradouro, bairro, cidade e estado.
- Estados visuais de consulta, sucesso e erro.
- Formulário com validação nativa dos campos obrigatórios.

## Conceitos praticados

- `async`/`await`, `fetch` e Promises.
- Validação e normalização de strings com expressões regulares.
- Tratamento de erros HTTP, de rede e de respostas inesperadas.
- `AbortController` para cancelar consultas desatualizadas.
- Eventos do DOM, atualização de campos e feedback acessível.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- [ViaCEP](https://viacep.com.br/)

O CEP informado é enviado à ViaCEP para consulta. Os demais dados do formulário são usados somente no navegador; este projeto não os armazena nem os envia a um servidor.

## Código

Repositório: https://github.com/Raphael-Bezerra/js-consumindo-dados-api

## Autor

Raphael Bezerra
