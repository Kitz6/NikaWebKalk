/* ---------------------------------------------------------
   KONFIGURACIJA CIJENA
--------------------------------------------------------- */

const CijeneKvadrature = {
  TE01: 3, TE02: 3, TE03: 3, TE04: 3, TE05: 3,
  TE06: 3, TE07: 3, TE08: 3, TE09: 3, TE10: 3, TE11: 3,

  LAS01: 3, LAS02: 3, LAS03: 3, LAS04: 3, LAS05: 3,
  LAS06: 3, LAS07: 3, LAS08: 3, LAS09: 3, LAS10: 3
};

const CijeneMontaze = {
  "dvorišna": 3,
  "balkonska": 6
};

const CijenaPoKilometru = 3;

const PDV_STOPA = 0.25;

/* ---------------------------------------------------------
   CIJENE PERGOLA I NADSTREŠNICA
--------------------------------------------------------- */

const CijenePergola = {
  m2: 3,
  stup: 0
};

const CijeneNadstresnica = {
  m2: 3,
  stup: 0
};

/* ---------------------------------------------------------
   PODACI O FIRMI
--------------------------------------------------------- */

const Firma = {
  naziv: "NIKA KONSTRUKCIJE d.o.o.",
  adresa: "Braće Radića 23, 42208 Petrijanec",
  oib: "OIB: 33688104975",
  telefon: "Tel: +385 042-303-166",
  email: "info@nika-konstrukcije.hr",
  web: "www.nika-konstrukcije.hr"
};

let selectedCategory = "";
let selectedType = "";
let lastOfferData = null;

/* ---------------------------------------------------------
   LOGO
--------------------------------------------------------- */

let LogoBase64 = null;

function loadLogo() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "img/logo.png";

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    LogoBase64 = canvas.toDataURL("image/png");
  };
}

loadLogo();

/* ---------------------------------------------------------
   NAVIGACIJA
--------------------------------------------------------- */

function selectCategory(cat) {
  selectedCategory = cat;

  screen1.classList.add("hidden");

  if (cat === "aluminijske" || cat === "laserske") {
    screen2.classList.remove("hidden");
    loadTypes();
    return;
  }

  if (cat === "pergola") {
    screenPergola.classList.remove("hidden");
    return;
  }

  if (cat === "nadstresnica") {
    screenNadstresnica.classList.remove("hidden");
    return;
  }
}

function loadTypes() {
  typeGrid.innerHTML = "";

  if (selectedCategory === "aluminijske") {
    for (let i = 1; i <= 11; i++) {
      const t = "TE" + String(i).padStart(2, "0");
      typeGrid.innerHTML += `
        <div class="card" onclick="selectType('${t}')">
          <img src="img/${t}.jpg">
          <h3>${t}</h3>
        </div>`;
    }
  }

  if (selectedCategory === "laserske") {
    for (let i = 1; i <= 10; i++) {
      const t = "LAS" + String(i).padStart(2, "0");
      typeGrid.innerHTML += `
        <div class="card" onclick="selectType('${t}')">
          <img src="img/${t}.jpg">
          <h3>${t}</h3>
        </div>`;
    }
  }
}

function selectType(t) {
  selectedType = t;
  selectedTypeLabel.textContent = t;

  screen2.classList.add("hidden");
  screen3.classList.remove("hidden");
}

function goBack() {
  screen2.classList.add("hidden");
  screen1.classList.remove("hidden");
}

function goBackToTypes() {
  screen3.classList.add("hidden");
  screen2.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – Ograde
--------------------------------------------------------- */

function calculate() {
  const sirinaVal = parseFloat(sirina.value) || 0;
  const visinaVal = parseFloat(visina.value) || 0;
  const montazaVal = montaza.value;
  const kmVal = parseFloat(kilometri.value) || 0;

  const kupacImeVal = kupacIme.value.trim();
  const kupacAdresaVal = kupacAdresa.value.trim();
  const kupacOIBVal = kupacOIB.value.trim();
  const kupacNapomenaVal = kupacNapomena.value.trim();

  if (!sirinaVal || !visinaVal) return alert("Unesite širinu i visinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal) return alert("Unesite podatke o kupcu.");

  const kvadratura = sirinaVal * visinaVal;
  const cijenaKvadrature = CijeneKvadrature[selectedType];
  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const iznosOgrade = kvadratura * cijenaKvadrature;
  const osnovica = iznosOgrade + cijenaMontaze + cijenaUdaljenosti;
  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "ograda",
    model: selectedType,
    sirinaVal, visinaVal, kvadratura,
    montazaVal, kmVal,
    cijenaKvadrature, iznosOgrade,
    cijenaMontaze, cijenaUdaljenosti,
    osnovica, pdv, ukupno,
    kupacImeVal, kupacAdresaVal, kupacOIBVal, kupacNapomenaVal
  };

//Dodaj u kontekst ako bude potrebe
//-----------------------------------------------------
//Montaža: €${cijenaMontaze.toFixed(2)}
//Udaljenost: €${cijenaUdaljenosti.toFixed(2)}
//Cijena po m²: €${cijenaKvadrature.toFixed(2)}
//Iznos ograde: €${iznosOgrade.toFixed(2)}

  result.textContent = `
PONUDA – Model ${selectedType}

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Širina: ${sirinaVal} m
Visina: ${visinaVal} m
Površina (m²): ${kvadratura.toFixed(2)} m²

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}

Cijena je informativnog karaktera.
${Firma.naziv}
`;

  result.classList.remove("hidden");
  pdfBtn.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – Pergola
--------------------------------------------------------- */

function calculatePergola() {
  const duzina = parseFloat(pergDuzina.value) || 0;
  const sirina = parseFloat(pergSirina.value) || 0;
  const stupovi = parseInt(pergStupovi.value) || 0;
  const visinaStupova = parseFloat(pergVisinaStupova.value) || 0;

  const kmVal = parseFloat(pergKilometri.value) || 0;
  const montazaVal = pergMontaza.value;

  const kupacImeVal = pergKupacIme.value.trim();
  const kupacAdresaVal = pergKupacAdresa.value.trim();
  const kupacOIBVal = pergKupacOIB.value.trim();
  const kupacNapomenaVal = pergKupacNapomena.value.trim();

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal) return alert("Unesite podatke o kupcu.");

  const povrsina = duzina * sirina;
  const cijenaPovrsine = povrsina * CijenePergola.m2;
  const cijenaStupova = stupovi * CijenePergola.stup;
  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const osnovica = cijenaPovrsine + cijenaStupova + cijenaMontaze + cijenaUdaljenosti;
  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "pergola",
    duzina, sirina, povrsina,
    stupovi, visinaStupova,
    montazaVal, kmVal,
    osnovica, pdv, ukupno,
    kupacImeVal, kupacAdresaVal, kupacOIBVal, kupacNapomenaVal
};

  pergResult.textContent = `
PONUDA – PERGOLA

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Dužina: ${duzina} m
Širina: ${sirina} m
Površina: ${povrsina.toFixed(2)} m²

Broj stupova: ${stupovi}
Visina stupova: ${visinaStupova} m

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}
`;

  pergResult.classList.remove("hidden");
  pergPdfBtn.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – Nadstrešnica
--------------------------------------------------------- */

function calculateNadstresnica() {
  const duzina = parseFloat(nadDuzina.value) || 0;
  const sirina = parseFloat(nadSirina.value) || 0;
  const stupovi = parseInt(nadStupovi.value) || 0;
  const visinaStupova = parseFloat(nadVisinaStupova.value) || 0;

  const kmVal = parseFloat(nadKilometri.value) || 0;
  const montazaVal = nadMontaza.value;

  const kupacImeVal = nadKupacIme.value.trim();
  const kupacAdresaVal = nadKupacAdresa.value.trim();
  const kupacOIBVal = nadKupacOIB.value.trim();
  const kupacNapomenaVal = nadKupacNapomena.value.trim();

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal) return alert("Unesite podatke o kupcu.");

  const povrsina = duzina * sirina;
  const cijenaPovrsine = povrsina * CijeneNadstresnica.m2;
  const cijenaStupova = stupovi * CijeneNadstresnica.stup;
  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const osnovica = cijenaPovrsine + cijenaStupova + cijenaMontaze + cijenaUdaljenosti;
  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "nadstresnica",
    duzina, sirina, povrsina,
    stupovi, visinaStupova,
    montazaVal, kmVal,
    osnovica, pdv, ukupno,
    kupacImeVal, kupacAdresaVal, kupacOIBVal, kupacNapomenaVal
};

  nadResult.textContent = `
PONUDA – NADSTREŠNICA

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Dužina: ${duzina} m
Širina: ${sirina} m
Površina: ${povrsina.toFixed(2)} m²

Broj stupova: ${stupovi}
Visina stupova: ${visinaStupova} m

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}
`;

  nadResult.classList.remove("hidden");
  nadPdfBtn.classList.remove("hidden");
}

/* ---------------------------------------------------------
   PDF GENERATOR — PDFMAKE
--------------------------------------------------------- */

function downloadPDF() {
  if (!lastOfferData) return alert("Prvo izračunaj ponudu.");

  if (!LogoBase64) {
    alert("Logo se još učitava... pokušajte ponovno.");
    return;
  }

  /* ---------------------------------------------------------
     HEADER
  --------------------------------------------------------- */
  const headerBlock = {
    columns: [
      {
        image: LogoBase64,
        fit: [240, 120],
        alignment: "left",
        margin: [0, -10, 10, 0]
      },
      {
        width: '*',
        alignment: 'right',
        stack: [
          { text: "NIKA KONSTRUKCIJE", style: "header" },
          { text: "PONUDA", style: "subheader" },
          { text: new Date().toLocaleDateString("hr-HR"), margin: [0, 5, 0, 0] }
        ]
      }
    ]
  };

  const lineBlock = {
    canvas: [
      { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }
    ],
    margin: [0, 10, 0, 10]
  };

  /* ---------------------------------------------------------
     STAVKE ZA PDF — Ograde / Pergola / Nadstrešnica
  --------------------------------------------------------- */

  let stavkaNaslov = "";
  let tableBody = [];

  /* ---------------- OGRADA ---------------- */
  if (lastOfferData.tip === "ograda") {
    stavkaNaslov = selectedCategory === "laserske"
      ? `Laserski rezana ograda ${lastOfferData.model}`
      : `Aluminijska ograda ${lastOfferData.model}`;

    tableBody = [
      [
        { text: "Opis", bold: true },
        { text: "Vrijednost", bold: true }
      ],
      ["Širina", lastOfferData.sirinaVal + " m"],
      ["Visina", lastOfferData.visinaVal + " m"],
      ["Površina", lastOfferData.kvadratura.toFixed(2) + " m²"],

      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"]
      //["Cijena po m²", lastOfferData.cijenaKvadrature.toFixed(2) + " €"],
      //["Iznos ograde", lastOfferData.iznosOgrade.toFixed(2) + " €"]
    ];
  }

  /* ---------------- PERGOLA ---------------- */
  if (lastOfferData.tip === "pergola") {
    stavkaNaslov = "Pergola";

    tableBody = [
      [
        { text: "Opis", bold: true },
        { text: "Vrijednost", bold: true }
      ],
      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],
      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"]
    ];
}

  /* ---------------- NADSTREŠNICA ---------------- */
  if (lastOfferData.tip === "nadstresnica") {
    stavkaNaslov = "Nadstrešnica";

    tableBody = [
      [
        { text: "Opis", bold: true },
        { text: "Vrijednost", bold: true }
      ],
      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],
      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"]
    ];
}

  /* ---------------------------------------------------------
     PDF DEFINICIJA
  --------------------------------------------------------- */

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [30, 40, 30, 40],

    content: [
      headerBlock,
      lineBlock,

      /* Firma */
      {
        style: "firma",
        stack: [
          Firma.naziv,
          Firma.adresa,
          Firma.oib,
          Firma.telefon,
          Firma.email + " / " + Firma.web
        ]
      },

      "\n",

      /* Kupac */
      { text: "Kupac", style: "sectionTitle" },
      {
        stack: [
          "Ime: " + lastOfferData.kupacImeVal,
          "Adresa: " + lastOfferData.kupacAdresaVal,
          "OIB: " + lastOfferData.kupacOIBVal
        ]
      },

      "\n",

      /* Stavke */
      { text: stavkaNaslov, style: "sectionTitle" },

      {
        table: {
          widths: ["*", "auto"],
          body: tableBody
        },
        layout: "lightHorizontalLines"
      },

      "\n",

      /* Sažetak */
      { text: "Sažetak iznosa", style: "sectionTitle" },

      {
        table: {
          widths: ["*", "auto"],
          body: [
            ["Osnovica:", lastOfferData.osnovica.toFixed(2) + " €"],
            ["PDV 25%:", lastOfferData.pdv.toFixed(2) + " €"],
            ["Ukupno:", lastOfferData.ukupno.toFixed(2) + " €"]
          ]
        },
        layout: "noBorders"
      },

      "\n",

      /* Završni tekst */
      { text: "OVO NIJE FISKALIZIRANI RAČUN", italics: true, margin: [0, 10, 0, 0] },
      { text: "Cijena je informativnog karaktera. Za konačnu ponudu pošaljite slike i detalje.", margin: [0, 5, 0, 0] }
    ],

    styles: {
      header: { fontSize: 20, bold: true },
      subheader: { fontSize: 14, bold: true },
      sectionTitle: { fontSize: 13, bold: true, margin: [0, 10, 0, 5] },
      firma: { fontSize: 10 }
    }
  };

  pdfMake.createPdf(docDefinition).download(`Ponuda_${stavkaNaslov}.pdf`);
}