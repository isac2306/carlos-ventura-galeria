const obras = [
  {
    id: "sert-01",
    titulo: "Sertão e Silêncio I",
    colecao: "Sertão e Silêncio",
    tecnica: "Óleo sobre tela",
    ano: 2024,
    dimensoes: "80 x 100 cm",
    preco: 6200,
    vendida: false,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "left top",
    descricao: "Uma paisagem de respiro seco, feita em camadas de cor quente e pausa."
  },
  {
    id: "urb-01",
    titulo: "Esquina Azul",
    colecao: "Paisagens Urbanas",
    tecnica: "Acrílico",
    ano: 2023,
    dimensoes: "70 x 90 cm",
    preco: 4800,
    vendida: false,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "center top",
    descricao: "Luzes, fachadas e memória afetiva de uma cidade em movimento."
  },
  {
    id: "agu-01",
    titulo: "Chuva Miúda",
    colecao: "Aquarelas Recentes",
    tecnica: "Aquarela",
    ano: 2022,
    dimensoes: "42 x 59 cm",
    preco: 2800,
    vendida: false,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "right top",
    descricao: "Transparências leves sobre papel, com atmosfera íntima e luminosa."
  },
  {
    id: "sert-02",
    titulo: "Pedra e Vento",
    colecao: "Sertão e Silêncio",
    tecnica: "Óleo sobre tela",
    ano: 2021,
    dimensoes: "100 x 120 cm",
    preco: 7600,
    vendida: true,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "left bottom",
    descricao: "Obra de coleção particular, marcada por textura densa e horizonte baixo."
  },
  {
    id: "urb-02",
    titulo: "Janela 32",
    colecao: "Paisagens Urbanas",
    tecnica: "Acrílico",
    ano: 2020,
    dimensoes: "60 x 80 cm",
    preco: 3900,
    vendida: true,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "center bottom",
    descricao: "Registro de uma fachada imaginada entre sombra, concreto e cor."
  },
  {
    id: "mem-01",
    titulo: "Memória de Rio",
    colecao: "Aquarelas Recentes",
    tecnica: "Aquarela",
    ano: 2024,
    dimensoes: "50 x 70 cm",
    preco: 3400,
    vendida: false,
    imagem: "assets/artworks-optimized.jpg",
    posicao: "right bottom",
    descricao: "A fluidez da água aparece como lembrança, não como retrato literal."
  }
];

const colecoes = [
  {
    nome: "Sertão e Silêncio",
    descricao: "Horizontes, textura mineral e a calma de lugares que parecem guardar segredo.",
    imagem: "url('assets/artworks-optimized.jpg')"
  },
  {
    nome: "Paisagens Urbanas",
    descricao: "Cenas de cidade filtradas por cor, arquitetura e memória cotidiana.",
    imagem: "url('assets/artworks-optimized.jpg')"
  },
  {
    nome: "Aquarelas Recentes",
    descricao: "Papéis leves, transparências e estudos de atmosfera.",
    imagem: "url('assets/artworks-optimized.jpg')"
  }
];

const gradeDeObras = document.querySelector("#artGrid");
const gradeDeColecoes = document.querySelector("#collectionGrid");
const filtroDeTecnica = document.querySelector("#techniqueFilter");
const filtroDeAno = document.querySelector("#yearFilter");
const filtroDePreco = document.querySelector("#priceFilter");
const filtroDeMoeda = document.querySelector("#currencyFilter");
const botaoLimparFiltros = document.querySelector("#resetFilters");
const modal = document.querySelector("#interestModal");
const tituloDoModal = document.querySelector("#modalTitle");
const campoObra = document.querySelector("#artworkInput");
const formularioDeInteresse = document.querySelector("#interestForm");
const botaoFecharModal = document.querySelector("#closeModal");
const avisoDoFormulario = document.querySelector("#formNote");
const avisoDeCotacao = document.querySelector("#currencyStatus");
const mensagemSemObras = document.querySelector("#emptyMessage");

const cotacoes = {
  dolar: null,
  euro: null,
  atualizadaEm: null,
  usandoReserva: false
};

const telefoneWhatsApp = "5586999954249";
let moedaSelecionada = "BRL";

function formatarReal(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarMoedaEstrangeira(valor, codigo) {
  return valor.toLocaleString(codigo === "USD" ? "en-US" : "de-DE", {
    style: "currency",
    currency: codigo
  });
}

function formatarPrecoPrincipal(preco) {
  if (moedaSelecionada === "USD" && cotacoes.dolar) {
    return formatarMoedaEstrangeira(preco / cotacoes.dolar, "USD");
  }

  if (moedaSelecionada === "EUR" && cotacoes.euro) {
    return formatarMoedaEstrangeira(preco / cotacoes.euro, "EUR");
  }

  return formatarReal(preco);
}

function resumoDeConversao(preco) {
  if (!cotacoes.dolar || !cotacoes.euro) {
    return "Conversão internacional indisponível no momento";
  }

  if (moedaSelecionada === "USD") {
    return `Equivale a ${formatarReal(preco)} · ${formatarMoedaEstrangeira(preco / cotacoes.euro, "EUR")}`;
  }

  if (moedaSelecionada === "EUR") {
    return `Equivale a ${formatarReal(preco)} · ${formatarMoedaEstrangeira(preco / cotacoes.dolar, "USD")}`;
  }

  return `${formatarMoedaEstrangeira(preco / cotacoes.dolar, "USD")} · ${formatarMoedaEstrangeira(preco / cotacoes.euro, "EUR")}`;
}

function atualizarAvisoDeCotacao() {
  if (!cotacoes.dolar || !cotacoes.euro) {
    avisoDeCotacao.textContent = "Cotação indisponível no momento.";
    return;
  }

  const horario = cotacoes.atualizadaEm
    ? cotacoes.atualizadaEm.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    : "agora";
  const origem = cotacoes.usandoReserva ? "valores de reserva" : "AwesomeAPI";

  avisoDeCotacao.textContent = `Cotação atualizada por ${origem} em ${horario}: dólar ${formatarReal(cotacoes.dolar)} · euro ${formatarReal(cotacoes.euro)}.`;
}

function linkDoWhatsApp(tituloDaObra) {
  const mensagem = `Olá, tenho interesse na obra "${tituloDaObra}" do Carlos Ventura.`;
  return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

function preencherFiltros() {
  const tecnicas = [...new Set(obras.map((obra) => obra.tecnica))];
  const anos = [...new Set(obras.map((obra) => obra.ano))].sort((a, b) => b - a);

  tecnicas.forEach((tecnica) => {
    const opcao = document.createElement("option");
    opcao.value = tecnica;
    opcao.textContent = tecnica;
    filtroDeTecnica.append(opcao);
  });

  anos.forEach((ano) => {
    const opcao = document.createElement("option");
    opcao.value = String(ano);
    opcao.textContent = ano;
    filtroDeAno.append(opcao);
  });
}

function correspondeAoPreco(obra) {
  if (filtroDePreco.value === "ate-3000") return obra.preco <= 3000;
  if (filtroDePreco.value === "3000-6000") return obra.preco > 3000 && obra.preco <= 6000;
  if (filtroDePreco.value === "acima-6000") return obra.preco > 6000;
  return true;
}

function obrasFiltradas() {
  return obras.filter((obra) => {
    const tecnicaSelecionada = filtroDeTecnica.value === "todas" || obra.tecnica === filtroDeTecnica.value;
    const anoSelecionado = filtroDeAno.value === "todos" || String(obra.ano) === filtroDeAno.value;
    return tecnicaSelecionada && anoSelecionado && correspondeAoPreco(obra);
  });
}

function renderizarObras() {
  gradeDeObras.innerHTML = "";
  const lista = obrasFiltradas();
  mensagemSemObras.hidden = lista.length > 0;

  lista.forEach((obra) => {
    const artigo = document.createElement("article");
    artigo.className = "art-card";
    artigo.innerHTML = `
      <div class="art-image" role="img" aria-label="${obra.titulo}" style="--art-image: url('${obra.imagem}'); --art-position: ${obra.posicao}">
        ${obra.vendida ? '<span class="badge">Vendido</span>' : ""}
      </div>
      <div class="art-body">
        <div class="meta"><span>${obra.colecao}</span><span>${obra.ano}</span><span>${obra.dimensoes}</span></div>
        <h3>${obra.titulo}</h3>
        <p>${obra.descricao}</p>
        <div class="meta"><span>${obra.tecnica}</span></div>
        <div class="price">${formatarPrecoPrincipal(obra.preco)}</div>
        <div class="converted">${obra.vendida ? "Portfólio de obras passadas" : resumoDeConversao(obra.preco)}</div>
        <div class="card-actions">
          <button class="button primary" type="button" data-obra="${obra.id}" ${obra.vendida ? "disabled" : ""}>
            ${obra.vendida ? "Obra vendida" : "Adquirir obra"}
          </button>
          ${obra.vendida ? "" : `<a class="button whatsapp-button" href="${linkDoWhatsApp(obra.titulo)}" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp sobre a obra ${obra.titulo}">WhatsApp</a>`}
        </div>
      </div>
    `;
    gradeDeObras.append(artigo);
  });
}

function renderizarColecoes() {
  gradeDeColecoes.innerHTML = "";

  colecoes.forEach((colecao) => {
    const cartao = document.createElement("article");
    cartao.className = "collection-card";
    cartao.style.setProperty("--collection-image", colecao.imagem);
    cartao.innerHTML = `<h3>${colecao.nome}</h3><p>${colecao.descricao}</p>`;
    gradeDeColecoes.append(cartao);
  });
}

function abrirInteresse(idDaObra) {
  const obra = obras.find((item) => item.id === idDaObra);
  if (!obra || obra.vendida) return;

  formularioDeInteresse.reset();
  campoObra.value = obra.titulo;
  tituloDoModal.textContent = `Interesse em "${obra.titulo}"`;
  avisoDoFormulario.textContent = "";
  modal.showModal();
}

async function carregarCotacoes() {
  try {
    const resposta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
    const dados = await resposta.json();
    cotacoes.dolar = Number(dados.USDBRL.bid);
    cotacoes.euro = Number(dados.EURBRL.bid);
    cotacoes.atualizadaEm = new Date();
    cotacoes.usandoReserva = false;
  } catch {
    cotacoes.dolar = 5;
    cotacoes.euro = 5.4;
    cotacoes.atualizadaEm = new Date();
    cotacoes.usandoReserva = true;
  } finally {
    atualizarAvisoDeCotacao();
    renderizarObras();
  }
}

gradeDeObras.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-obra]");
  if (botao) abrirInteresse(botao.dataset.obra);
});

[filtroDeTecnica, filtroDeAno, filtroDePreco].forEach((controle) => {
  controle.addEventListener("change", renderizarObras);
});

filtroDeMoeda.addEventListener("change", () => {
  moedaSelecionada = filtroDeMoeda.value;
  renderizarObras();
});

botaoLimparFiltros.addEventListener("click", () => {
  filtroDeTecnica.value = "todas";
  filtroDeAno.value = "todos";
  filtroDePreco.value = "todos";
  filtroDeMoeda.value = "BRL";
  moedaSelecionada = "BRL";
  renderizarObras();
});

botaoFecharModal.addEventListener("click", () => modal.close());

formularioDeInteresse.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const interessados = JSON.parse(localStorage.getItem("carlos-interesses") || "[]");
  interessados.push({
    obra: campoObra.value,
    nome: document.querySelector("#nameInput").value,
    email: document.querySelector("#emailInput").value,
    telefone: document.querySelector("#phoneInput").value,
    criadoEm: new Date().toISOString()
  });

  localStorage.setItem("carlos-interesses", JSON.stringify(interessados));
  avisoDoFormulario.textContent = "Interesse salvo com sucesso.";
  setTimeout(() => modal.close(), 900);
});

preencherFiltros();
renderizarColecoes();
renderizarObras();
carregarCotacoes();
