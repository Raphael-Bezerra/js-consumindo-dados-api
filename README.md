# Consulta de endereço por CEP

Formulário de cadastro que consulta a API ViaCEP e preenche os dados de endereço a partir do CEP informado.

<p>
    <a href="https://raphael-bezerra.github.io/js-consumindo-dados-api/">
        <img src="https://img.shields.io/badge/VER%20DEMO-1875E8?style=for-the-badge&logo=githubpages&logoColor=white" alt="Ver demonstração">
    </a>
    <a href="https://github.com/Raphael-Bezerra/js-consumindo-dados-api">
        <img src="https://img.shields.io/badge/VER%20C%C3%93DIGO-181717?style=for-the-badge&logo=github&logoColor=white" alt="Ver código">
    </a>
</p>

## 🏷️ Sobre

Projeto educacional de formulário com consulta de endereço pela API ViaCEP.

Ao sair do campo CEP, a aplicação valida e normaliza a entrada e, se válida, consulta a API para preencher logradouro, bairro, cidade e estado.

O formulário também valida os campos obrigatórios no navegador e apresenta estados de carregamento, sucesso e erro. Os dados pessoais permanecem no navegador; somente o CEP é enviado à ViaCEP para consulta.

## 🧠 Conceitos praticados

- Funções com responsabilidades separadas para validar, consultar a API e atualizar o DOM.
- `fetch`, Promises, `async`/`await` e tratamento de erros.
- Validação e normalização de entradas com expressões regulares.
- Eventos `input`, `blur` e `submit` e atualização dos elementos do formulário.
- `AbortController` para cancelar consultas desatualizadas.
- Validação nativa de formulários HTML e mensagens acessíveis com `aria-live`.

## 🚀 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**API consumida:** [ViaCEP](https://viacep.com.br/)

## 👨‍💻 Autor

<table>
    <tr>
        <td align="center">
            <img src="https://github.com/Raphael-Bezerra.png" width="120" alt="Foto de Raphael Bezerra">
            <br>
            <sub><b>Raphael Bezerra</b></sub>
        </td>
    </tr>
</table>

[![GitHub](https://img.shields.io/badge/GitHub-Raphael--Bezerra-181717?style=for-the-badge&logo=github)](https://github.com/Raphael-Bezerra)
