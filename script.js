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
    descricao: "Paisagem do sertão construída com tons quentes e pinceladas largas."
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
    descricao: "Cena urbana com fachadas, luz e ruas molhadas."
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
    descricao: "Aquarela leve, marcada por transparências e chuva fina."
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
    descricao: "Composição de textura forte, horizonte baixo e tons terrosos."
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
    descricao: "Fachada geométrica construída com blocos de sombra, concreto e cor."
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
    descricao: "Paisagem de rio em tons suaves e bordas dissolvidas."
  }
];

const colecoes = [
  {
    nome: "Sertão e Silêncio",
    descricao: "Paisagens secas, pedras e horizontes abertos.",
    imagem: "url('assets/artworks-optimized.jpg')"
  },
  {
    nome: "Paisagens Urbanas",
    descricao: "Ruas, fachadas e pequenos recortes do cotidiano urbano.",
    imagem: "url('assets/artworks-optimized.jpg')"
  },
  {
    nome: "Aquarelas Recentes",
    descricao: "Estudos em papel com transparências e chuva."
    imagem: "url('assets/artworks-optimized.jpg')"
  }
];

const gradeDeObras = document.querySelector("#artGrid");
const gradeDeColecoes = document.querySelector("#collectionGrid");
const filtroDeTecnica = document.querySelector("#techniqueFilter");
const filtroDeAno = document.querySelector("#yearFilter");
const filtroDePreco = document.querySelector("#priceFilter");
const filtroDeMoeda = document.querySelector("#currencyFilter");
const filtroDeStatus = document.querySelector("#statusFilter");
const botaoLimparFiltros = document.querySelector("#resetFilters");
const modal = document.querySelector("#interestModal");
const tituloDoModal = document.querySelector("#modalTitle");
const campoObra = document.querySelector("#artworkInput");
const formularioDeInteresse = document.querySelector("#interestForm");
const botaoFecharModal = document.querySelector("#closeModal");
const avisoDoFormulario = document.querySelector("#formNote");
const avisoDeCotacao = document.querySelector("#currencyStatus");
const mensagemSemObras = document.querySelector("#emptyMessage");
const modalDeDetalhes = document.querySelector("#detailModal");
const botaoFecharDetalhes = document.querySelector("#closeDetailModal");
const imagemDetalhe = document.querySelector("#detailImage");
const colecaoDetalhe = document.querySelector("#detailCollection");
const tituloDetalhe = document.querySelector("#detailTitle");
const descricaoDetalhe = document.querySelector("#detailDescription");
const tecnicaDetalhe = document.querySelector("#detailTechnique");
const anoDetalhe = document.querySelector("#detailYear");
const dimensoesDetalhe = document.querySelector("#detailDimensions");
const precoDetalhe = document.querySelector("#detailPrice");
const acoesDetalhe = document.querySelector("#detailActions");
const listaDePedidos = document.querySelector("#ordersList");
const resumoDePedidos = document.querySelector("#ordersSummary");
const pedidosVazios = document.querySelector("#ordersEmpty");
const contadorDePedidos = document.querySelector("#ordersBadge");
const modalDeSucesso = document.querySelector("#successModal");
const resumoDeSucesso = document.querySelector("#successSummary");
const botaoFecharSucesso = document.querySelector("#closeSuccessModal");
const botaoVerPedidosSucesso = document.querySelector("#viewOrdersFromSuccess");

const cotacoes = {
  dolar: null,
  euro: null,
  atualizadaEm: null,
  usandoReserva: false
};

const telefoneWhatsApp = "5586999954249";
const chavePedidos = "carlos-pedidos";
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

function lerPedidos() {
  return JSON.parse(localStorage.getItem(chavePedidos) || "[]");
}

function salvarPedidos(pedidos) {
  localStorage.setItem(chavePedidos, JSON.stringify(pedidos));
}

function statusParaCliente(status) {
  if (status === "Novo" || status === "Em contato") return "Em análise";
  return status;
}

function criarResumoPedidos(pedidos) {
  const totais = {
    "Em análise": 0,
    Reservado: 0,
    Finalizado: 0
  };

  pedidos.forEach((pedido) => {
    const status = statusParaCliente(pedido.status);
    totais[status] = (totais[status] || 0) + 1;
  });

  resumoDePedidos.innerHTML = `
    <article><strong>${pedidos.length}</strong><span>Total</span></article>
    <article><strong>${totais["Em análise"]}</strong><span>Em análise</span></article>
    <article><strong>${totais.Reservado}</strong><span>Reservados</span></article>
    <article><strong>${totais.Finalizado}</strong><span>Finalizados</span></article>
  `;
}

function atualizarIndicadorDePedidos(pedidos = lerPedidos()) {
  const pendentes = pedidos.filter((pedido) => pedido.status !== "Finalizado").length;
  contadorDePedidos.hidden = pendentes === 0;
  contadorDePedidos.textContent = pendentes;
  contadorDePedidos.setAttribute("aria-label", `${pendentes} pedidos pendentes`);
}

function renderizarPedidos() {
  const pedidos = lerPedidos().sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
  listaDePedidos.innerHTML = "";
  pedidosVazios.hidden = pedidos.length > 0;
  criarResumoPedidos(pedidos);
  atualizarIndicadorDePedidos(pedidos);

  pedidos.forEach((pedido) => {
    const item = document.createElement("article");
    item.className = "order-card";
    item.innerHTML = `
      <div>
        <p class="eyebrow">${pedido.numero}</p>
        <h3>${pedido.obra}</h3>
        <p>${pedido.nome} · ${pedido.email} · ${pedido.telefone}</p>
      </div>
      <dl>
        <div><dt>Status</dt><dd>${statusParaCliente(pedido.status)}</dd></div>
        <div><dt>Valor</dt><dd>${pedido.preco}</dd></div>
        <div><dt>Pagamento</dt><dd>${pedido.pagamento}</dd></div>
        <div><dt>Data</dt><dd>${new Date(pedido.criadoEm).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</dd></div>
      </dl>
      ${pedido.observacao ? `<p class="order-note">${pedido.observacao}</p>` : ""}
    `;
    listaDePedidos.append(item);
  });
}

function criarPedido() {
  const obra = obras.find((item) => item.titulo === campoObra.value);
  const pedidos = lerPedidos();
  const agora = new Date();
  const pedido = {
    id: String(agora.getTime()),
    numero: `PED-${String(pedidos.length + 1).padStart(3, "0")}`,
    obra: campoObra.value,
    preco: obra ? formatarReal(obra.preco) : "A consultar",
    nome: document.querySelector("#nameInput").value,
    email: document.querySelector("#emailInput").value,
    telefone: document.querySelector("#phoneInput").value,
    pagamento: document.querySelector("#paymentInput").value,
    observacao: document.querySelector("#noteInput").value.trim(),
    status: "Novo",
    criadoEm: agora.toISOString()
  };

  pedidos.push(pedido);
  salvarPedidos(pedidos);
  renderizarPedidos();
  return pedido;
}

function abrirConfirmacaoDePedido(pedido) {
  resumoDeSucesso.innerHTML = `
    <span><strong>Número:</strong> ${pedido.numero}</span>
    <span><strong>Obra:</strong> ${pedido.obra}</span>
    <span><strong>Status:</strong> Em análise</span>
  `;
  modalDeSucesso.showModal();
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

function correspondeAoStatus(obra) {
  if (filtroDeStatus.value === "disponiveis") return !obra.vendida;
  if (filtroDeStatus.value === "vendidas") return obra.vendida;
  return true;
}

function obrasFiltradas() {
  return obras.filter((obra) => {
    const tecnicaSelecionada = filtroDeTecnica.value === "todas" || obra.tecnica === filtroDeTecnica.value;
    const anoSelecionado = filtroDeAno.value === "todos" || String(obra.ano) === filtroDeAno.value;
    return tecnicaSelecionada && anoSelecionado && correspondeAoPreco(obra) && correspondeAoStatus(obra);
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
          <button class="button whatsapp-button" type="button" data-detalhe="${obra.id}">
            Ver detalhes
          </button>
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

function abrirDetalhes(idDaObra) {
  const obra = obras.find((item) => item.id === idDaObra);
  if (!obra) return;

  imagemDetalhe.style.setProperty("--detail-image", `url('${obra.imagem}')`);
  imagemDetalhe.style.setProperty("--detail-position", obra.posicao);
  imagemDetalhe.setAttribute("aria-label", obra.titulo);
  colecaoDetalhe.textContent = obra.colecao;
  tituloDetalhe.textContent = obra.titulo;
  descricaoDetalhe.textContent = obra.descricao;
  tecnicaDetalhe.textContent = obra.tecnica;
  anoDetalhe.textContent = obra.ano;
  dimensoesDetalhe.textContent = obra.dimensoes;
  precoDetalhe.textContent = formatarPrecoPrincipal(obra.preco);
  acoesDetalhe.innerHTML = obra.vendida
    ? '<span class="badge-static">Obra vendida</span>'
    : `
        <button class="button primary" type="button" data-obra="${obra.id}">Adquirir obra</button>
        <a class="button whatsapp-button" href="${linkDoWhatsApp(obra.titulo)}" target="_blank" rel="noopener">WhatsApp</a>
      `;

  modalDeDetalhes.showModal();
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
  const botaoDetalhe = evento.target.closest("[data-detalhe]");
  if (botaoDetalhe) abrirDetalhes(botaoDetalhe.dataset.detalhe);

  const botao = evento.target.closest("[data-obra]");
  if (botao) abrirInteresse(botao.dataset.obra);
});

acoesDetalhe.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-obra]");
  if (!botao) return;

  modalDeDetalhes.close();
  abrirInteresse(botao.dataset.obra);
});

[filtroDeTecnica, filtroDeAno, filtroDePreco, filtroDeStatus].forEach((controle) => {
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
  filtroDeStatus.value = "todas";
  filtroDeMoeda.value = "BRL";
  moedaSelecionada = "BRL";
  renderizarObras();
});

botaoFecharModal.addEventListener("click", () => modal.close());
botaoFecharDetalhes.addEventListener("click", () => modalDeDetalhes.close());

formularioDeInteresse.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const pedido = criarPedido();
  avisoDoFormulario.textContent = "Pedido salvo com sucesso.";
  setTimeout(() => {
    modal.close();
    abrirConfirmacaoDePedido(pedido);
  }, 500);
});

botaoFecharSucesso.addEventListener("click", () => modalDeSucesso.close());

botaoVerPedidosSucesso.addEventListener("click", () => {
  modalDeSucesso.close();
});

preencherFiltros();
renderizarColecoes();
renderizarObras();
renderizarPedidos();
carregarCotacoes();
