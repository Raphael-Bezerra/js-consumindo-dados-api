const formulario = document.querySelector("#formulario");
const campoCep = document.querySelector("#cep");
const mensagemCep = document.querySelector("#cep-feedback");
const botaoEnviar = document.querySelector("#enviar");
const camposEndereco = {
    logradouro: document.querySelector("#endereco"),
    bairro: document.querySelector("#bairro"),
    cidade: document.querySelector("#cidade"),
    estado: document.querySelector("#estado")
};

let consultaAtiva = null;
let cepEmConsulta = "";
let ultimoCepConsultado = "";

function normalizarCep(valor) {
    return valor.trim().replace("-", "");
}

function mostrarFeedbackCep(mensagem, estado = "") {
    mensagemCep.textContent = mensagem;
    mensagemCep.dataset.state = estado;
}

function definirCarregamento(estaCarregando) {
    formulario.setAttribute("aria-busy", String(estaCarregando));
    mensagemCep.setAttribute("aria-busy", String(estaCarregando));
    botaoEnviar.disabled = estaCarregando;
}

function cancelarConsultaCep() {
    if (consultaAtiva) {
        consultaAtiva.abort();
        consultaAtiva = null;
        cepEmConsulta = "";
        definirCarregamento(false);
    }
}

async function consultarViaCep(cep, sinal) {
    let resposta;

    try {
        resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: sinal });
    } catch (erro) {
        if (erro.name === "AbortError") {
            throw erro;
        }
        throw new Error("Não foi possível conectar à ViaCEP. Verifique sua conexão e tente novamente.");
    }

    if (!resposta.ok) {
        throw new Error(`A ViaCEP respondeu com erro HTTP ${resposta.status}. Tente novamente.`);
    }

    let dados;
    try {
        dados = await resposta.json();
    } catch {
        throw new Error("A ViaCEP retornou uma resposta inválida. Tente novamente.");
    }

    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        throw new Error("A ViaCEP retornou dados em um formato inesperado.");
    }

    if (dados.erro === true) {
        throw new Error("CEP não encontrado. Confira o número informado.");
    }

    if (typeof dados.localidade !== "string" || !dados.localidade.trim()
        || typeof dados.uf !== "string" || !dados.uf.trim()) {
        throw new Error("A resposta da ViaCEP não contém uma cidade e um estado válidos.");
    }

    return {
        endereco: typeof dados.logradouro === "string" ? dados.logradouro : "",
        bairro: typeof dados.bairro === "string" ? dados.bairro : "",
        cidade: dados.localidade,
        estado: dados.uf
    };
}

function preencherEndereco(endereco) {
    camposEndereco.logradouro.value = endereco.endereco;
    camposEndereco.bairro.value = endereco.bairro;
    camposEndereco.cidade.value = endereco.cidade;
    camposEndereco.estado.value = endereco.estado;
}

function limparEndereco() {
    Object.values(camposEndereco).forEach((campo) => {
        campo.value = "";
    });
}

async function consultarEnderecoPorCep() {
    const valorCep = campoCep.value.trim();
    const formatoCepValido = /^\d{5}-?\d{3}$/.test(valorCep);

    if (!formatoCepValido) {
        cancelarConsultaCep();
        ultimoCepConsultado = "";
        mostrarFeedbackCep("Informe um CEP válido com oito números.", "error");
        campoCep.setAttribute("aria-invalid", "true");
        return;
    }

    const cep = normalizarCep(valorCep);
    campoCep.value = `${cep.slice(0, 5)}-${cep.slice(5)}`;
    campoCep.setAttribute("aria-invalid", "false");

    if (cep === ultimoCepConsultado) {
        return;
    }

    if (cep === cepEmConsulta) {
        return;
    }

    cancelarConsultaCep();
    consultaAtiva = new AbortController();
    const consultaAtual = consultaAtiva;
    cepEmConsulta = cep;
    definirCarregamento(true);
    mostrarFeedbackCep("Consultando a ViaCEP…", "loading");

    try {
        const endereco = await consultarViaCep(cep, consultaAtual.signal);
        if (consultaAtual.signal.aborted || consultaAtiva !== consultaAtual) {
            return;
        }

        preencherEndereco(endereco);
        ultimoCepConsultado = cep;
        mostrarFeedbackCep("Endereço preenchido. Confira os dados antes de continuar.", "success");
    } catch (erro) {
        if (erro.name === "AbortError") {
            return;
        }
        mostrarFeedbackCep(erro.message, "error");
    } finally {
        if (consultaAtiva === consultaAtual) {
            consultaAtiva = null;
            cepEmConsulta = "";
            definirCarregamento(false);
        }
    }
}

campoCep.addEventListener("input", () => {
    cancelarConsultaCep();
    const cepAlterado = normalizarCep(campoCep.value) !== ultimoCepConsultado;
    if (ultimoCepConsultado && cepAlterado) {
        limparEndereco();
    }
    if (cepAlterado) {
        ultimoCepConsultado = "";
    }
    campoCep.setAttribute("aria-invalid", "false");
    mostrarFeedbackCep();
});

campoCep.addEventListener("blur", consultarEnderecoPorCep);

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    window.location.assign("./cadastro-finalizado.html");
});
