const artworks = [
  {
    id: "sert-01",
    title: "Sertao e Silencio I",
    collection: "Sertao e Silencio",
    technique: "Oleo sobre tela",
    year: 2024,
    dimensions: "80 x 100 cm",
    price: 6200,
    sold: false,
    image: "assets/artworks.png",
    position: "left top",
    description: "Uma paisagem de respiro seco, feita em camadas de cor quente e pausa."
  },
  {
    id: "urb-01",
    title: "Esquina Azul",
    collection: "Paisagens Urbanas",
    technique: "Acrilico",
    year: 2023,
    dimensions: "70 x 90 cm",
    price: 4800,
    sold: false,
    image: "assets/artworks.png",
    position: "center top",
    description: "Luzes, fachadas e memoria afetiva de uma cidade em movimento."
  },
  {
    id: "agu-01",
    title: "Chuva Miuda",
    collection: "Aquarelas Recentes",
    technique: "Aquarela",
    year: 2022,
    dimensions: "42 x 59 cm",
    price: 2800,
    sold: false,
    image: "assets/artworks.png",
    position: "right top",
    description: "Transparencias leves sobre papel, com atmosfera intima e luminosa."
  },
  {
    id: "sert-02",
    title: "Pedra e Vento",
    collection: "Sertao e Silencio",
    technique: "Oleo sobre tela",
    year: 2021,
    dimensions: "100 x 120 cm",
    price: 7600,
    sold: true,
    image: "assets/artworks.png",
    position: "left bottom",
    description: "Obra de colecao particular, marcada por textura densa e horizonte baixo."
  },
  {
    id: "urb-02",
    title: "Janela 32",
    collection: "Paisagens Urbanas",
    technique: "Acrilico",
    year: 2020,
    dimensions: "60 x 80 cm",
    price: 3900,
    sold: true,
    image: "assets/artworks.png",
    position: "center bottom",
    description: "Registro de uma fachada imaginada entre sombra, concreto e cor."
  },
  {
    id: "mem-01",
    title: "Memoria de Rio",
    collection: "Aquarelas Recentes",
    technique: "Aquarela",
    year: 2024,
    dimensions: "50 x 70 cm",
    price: 3400,
    sold: false,
    image: "assets/artworks.png",
    position: "right bottom",
    description: "A fluidez da agua aparece como lembranca, nao como retrato literal."
  }
];

const collections = [
  {
    name: "Sertao e Silencio",
    description: "Horizontes, textura mineral e a calma de lugares que parecem guardar segredo.",
    image: "url('assets/artworks.png')"
  },
  {
    name: "Paisagens Urbanas",
    description: "Cenas de cidade filtradas por cor, arquitetura e memoria cotidiana.",
    image: "url('assets/artworks.png')"
  },
  {
    name: "Aquarelas Recentes",
    description: "Papeis leves, transparencias e estudos de atmosfera.",
    image: "url('assets/artworks.png')"
  }
];

const artGrid = document.querySelector("#artGrid");
const collectionGrid = document.querySelector("#collectionGrid");
const techniqueFilter = document.querySelector("#techniqueFilter");
const yearFilter = document.querySelector("#yearFilter");
const priceFilter = document.querySelector("#priceFilter");
const resetFilters = document.querySelector("#resetFilters");
const modal = document.querySelector("#interestModal");
const modalTitle = document.querySelector("#modalTitle");
const artworkInput = document.querySelector("#artworkInput");
const interestForm = document.querySelector("#interestForm");
const closeModal = document.querySelector("#closeModal");
const formNote = document.querySelector("#formNote");

const currency = {
  USD: null,
  EUR: null
};

function moneyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function moneyForeign(value, code) {
  return value.toLocaleString(code === "USD" ? "en-US" : "de-DE", {
    style: "currency",
    currency: code
  });
}

function convertedPrice(price) {
  if (!currency.USD || !currency.EUR) {
    return "Conversao internacional indisponivel no momento";
  }

  return `${moneyForeign(price / currency.USD, "USD")} · ${moneyForeign(price / currency.EUR, "EUR")}`;
}

function fillFilters() {
  const techniques = [...new Set(artworks.map((art) => art.technique))];
  const years = [...new Set(artworks.map((art) => art.year))].sort((a, b) => b - a);

  techniques.forEach((technique) => {
    const option = document.createElement("option");
    option.value = technique;
    option.textContent = technique;
    techniqueFilter.append(option);
  });

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = year;
    yearFilter.append(option);
  });
}

function matchesPrice(art) {
  if (priceFilter.value === "ate-3000") return art.price <= 3000;
  if (priceFilter.value === "3000-6000") return art.price > 3000 && art.price <= 6000;
  if (priceFilter.value === "acima-6000") return art.price > 6000;
  return true;
}

function filteredArtworks() {
  return artworks.filter((art) => {
    const techniqueOk = techniqueFilter.value === "todas" || art.technique === techniqueFilter.value;
    const yearOk = yearFilter.value === "todos" || String(art.year) === yearFilter.value;
    return techniqueOk && yearOk && matchesPrice(art);
  });
}

function renderArtworks() {
  artGrid.innerHTML = "";

  filteredArtworks().forEach((art) => {
    const article = document.createElement("article");
    article.className = "art-card";
    article.innerHTML = `
      <div class="art-image" role="img" aria-label="${art.title}" style="--art-image: url('${art.image}'); --art-position: ${art.position}">
        ${art.sold ? '<span class="badge">Vendido</span>' : ""}
      </div>
      <div class="art-body">
        <div class="meta"><span>${art.collection}</span><span>${art.year}</span><span>${art.dimensions}</span></div>
        <h3>${art.title}</h3>
        <p>${art.description}</p>
        <div class="meta"><span>${art.technique}</span></div>
        <div class="price">${moneyBRL(art.price)}</div>
        <div class="converted">${art.sold ? "Portfolio de obras passadas" : convertedPrice(art.price)}</div>
        <div class="card-actions">
          <button class="button primary" type="button" data-art="${art.id}" ${art.sold ? "disabled" : ""}>
            ${art.sold ? "Obra vendida" : "Adquirir obra"}
          </button>
        </div>
      </div>
    `;
    artGrid.append(article);
  });
}

function renderCollections() {
  collectionGrid.innerHTML = "";
  collections.forEach((collection) => {
    const card = document.createElement("article");
    card.className = "collection-card";
    card.style.setProperty("--collection-image", collection.image);
    card.innerHTML = `<h3>${collection.name}</h3><p>${collection.description}</p>`;
    collectionGrid.append(card);
  });
}

function openInterest(artId) {
  const artwork = artworks.find((art) => art.id === artId);
  if (!artwork || artwork.sold) return;

  artworkInput.value = artwork.title;
  modalTitle.textContent = `Interesse em "${artwork.title}"`;
  formNote.textContent = "";
  interestForm.reset();
  modal.showModal();
}

async function loadCurrency() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
    const data = await response.json();
    currency.USD = Number(data.USDBRL.bid);
    currency.EUR = Number(data.EURBRL.bid);
  } catch {
    currency.USD = 5;
    currency.EUR = 5.4;
  } finally {
    renderArtworks();
  }
}

artGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-art]");
  if (button) openInterest(button.dataset.art);
});

[techniqueFilter, yearFilter, priceFilter].forEach((control) => {
  control.addEventListener("change", renderArtworks);
});

resetFilters.addEventListener("click", () => {
  techniqueFilter.value = "todas";
  yearFilter.value = "todos";
  priceFilter.value = "todos";
  renderArtworks();
});

closeModal.addEventListener("click", () => modal.close());

interestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const interests = JSON.parse(localStorage.getItem("carlos-interesses") || "[]");
  interests.push({
    artwork: artworkInput.value,
    name: document.querySelector("#nameInput").value,
    email: document.querySelector("#emailInput").value,
    phone: document.querySelector("#phoneInput").value,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem("carlos-interesses", JSON.stringify(interests));
  formNote.textContent = "Interesse salvo com sucesso.";
  setTimeout(() => modal.close(), 900);
});

fillFilters();
renderCollections();
renderArtworks();
loadCurrency();
