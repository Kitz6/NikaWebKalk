/* ---------------------------------------------------------
   KONFIGURACIJA CIJENA
--------------------------------------------------------- */

const CijeneKvadrature = {      //cijena modela po kvadratu
  TE01: 3, TE02: 3, TE03: 3, TE04: 3, TE05: 3,
  TE06: 3, TE07: 3, TE08: 3, TE09: 3, TE10: 3, TE11: 3,

  LAS01: 3, LAS02: 3, LAS03: 3, LAS04: 3, LAS05: 3,
  LAS06: 3, LAS07: 3, LAS08: 3, LAS09: 3, LAS10: 3
};

const CijeneMontaze = {         //cijena tipa montaže
  "dvorišna": 3,
  "balkonska": 6
};

const CijeneVrata = {          //cijena ulaznih i kliznih vrata
  ulazna: 3,
  klizna: 3
};

const RALBoje = [          //RAL BOJE
  "RAL 7016",
  "RAL 9005",
  "RAL 9010",
  "RAL 7024",
  "RAL 8017"
];

const CijenaPoKilometru = 3;        //cijena po kilometru
const PDV_STOPA = 0.25;         //PDV FIXNO!!!!!

const CijenePergola = {            //cijena po kvadraturi i po metru stupa
  m2: 3,
  stup: 3
};

const CijeneNadstresnica = {      //cijena po kvadraturi i po metru stupa
  m2: 3,
  stup: 3
};

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
   HOME ELEMENTI
--------------------------------------------------------- */

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

const screenPergola = document.getElementById("screenPergola");
const screenNadstresnica = document.getElementById("screenNadstresnica");

const typeGrid = document.getElementById("typeGrid");
const selectedTypeLabel = document.getElementById("selectedTypeLabel");

/* OGRADA */
const sirina = document.getElementById("sirina");
const visina = document.getElementById("visina");
const ulaznaSirina = document.getElementById("ulaznaSirina");
const ulaznaVisina = document.getElementById("ulaznaVisina");
const kliznaDuzina = document.getElementById("kliznaDuzina");
const kliznaVisina = document.getElementById("kliznaVisina");
const ralBoja = document.getElementById("ralBoja");
const montaza = document.getElementById("montaza");
const kilometri = document.getElementById("kilometri");
const kupacIme = document.getElementById("kupacIme");
const kupacAdresa = document.getElementById("kupacAdresa");
const kupacOIB = document.getElementById("kupacOIB");
const kupacNapomena = document.getElementById("kupacNapomena");
const result = document.getElementById("result");
const pdfBtn = document.getElementById("pdfBtn");

/* PERGOLA */
const pergDuzina = document.getElementById("pergDuzina");
const pergSirina = document.getElementById("pergSirina");
const pergStupovi = document.getElementById("pergStupovi");
const pergVisinaStupova = document.getElementById("pergVisinaStupova");
const pergMontaza = document.getElementById("pergMontaza");
const pergKilometri = document.getElementById("pergKilometri");
const pergKupacIme = document.getElementById("pergKupacIme");
const pergKupacAdresa = document.getElementById("pergKupacAdresa");
const pergKupacOIB = document.getElementById("pergKupacOIB");
const pergKupacNapomena = document.getElementById("pergKupacNapomena");
const pergRal = document.getElementById("pergRal");
const pergResult = document.getElementById("pergResult");
const pergPdfBtn = document.getElementById("pergPdfBtn");

/* NADSTREŠNICA */
const nadDuzina = document.getElementById("nadDuzina");
const nadSirina = document.getElementById("nadSirina");
const nadStupovi = document.getElementById("nadStupovi");
const nadVisinaStupova = document.getElementById("nadVisinaStupova");
const nadMontaza = document.getElementById("nadMontaza");
const nadKilometri = document.getElementById("nadKilometri");
const nadKupacIme = document.getElementById("nadKupacIme");
const nadKupacAdresa = document.getElementById("nadKupacAdresa");
const nadKupacOIB = document.getElementById("nadKupacOIB");
const nadKupacNapomena = document.getElementById("nadKupacNapomena");
const nadRal = document.getElementById("nadRal");
const nadResult = document.getElementById("nadResult");
const nadPdfBtn = document.getElementById("nadPdfBtn");

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
  screen2.classList.add("hidden");
  screen3.classList.add("hidden");
  screenPergola.classList.add("hidden");
  screenNadstresnica.classList.add("hidden");

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
   IZRAČUN – Ograde (PROŠIRENO)
--------------------------------------------------------- */

function calculate() {
  const sirinaVal = parseFloat(sirina.value) || 0;
  const visinaVal = parseFloat(visina.value) || 0;

  const ulaznaSirinaVal = parseFloat(ulaznaSirina.value) || 0;
  const ulaznaVisinaVal = parseFloat(ulaznaVisina.value) || 0;

  const povrsinaUlaznih = ulaznaSirinaVal * ulaznaVisinaVal;
  const cijenaUlaznih = povrsinaUlaznih * CijeneVrata.ulazna;

  const kliznaDuzinaVal = parseFloat(kliznaDuzina.value) || 0;
  const kliznaVisinaVal = parseFloat(kliznaVisina.value) || 0;

  const povrsinaKliznih = kliznaDuzinaVal * kliznaVisinaVal;
  const cijenaKliznih = povrsinaKliznih * CijeneVrata.klizna;

  const ralBojaVal = ralBoja.value || "Nije odabrano";

  const montazaVal = montaza.value;
  const kmVal = parseFloat(kilometri.value) || 0;

  const kupacImeVal = kupacIme.value.trim();
  const kupacAdresaVal = kupacAdresa.value.trim();
  const kupacOIBVal = kupacOIB.value.trim();
  const kupacNapomenaVal = kupacNapomena.value.trim();

  if (!sirinaVal || !visinaVal)
    return alert("Unesite širinu i visinu ograde.");

  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const kvadratura = sirinaVal * visinaVal;
  const cijenaKvadrature = CijeneKvadrature[selectedType];
  const iznosOgrade = kvadratura * cijenaKvadrature;

  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const osnovica =
    iznosOgrade +
    cijenaUlaznih +
    cijenaKliznih +
    cijenaMontaze +
    cijenaUdaljenosti;

  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "ograda",
    model: selectedType,

    sirinaVal,
    visinaVal,
    kvadratura,

    ulazna: {
      ulaznaSirinaVal,
      ulaznaVisinaVal,
      povrsinaUlaznih,
      cijenaUlaznih
    },

    klizna: {
      kliznaDuzinaVal,
      kliznaVisinaVal,
      povrsinaKliznih,
      cijenaKliznih
    },

    ralBojaVal,
    montazaVal,
    kmVal,

    cijenaKvadrature,
    iznosOgrade,
    cijenaMontaze,
    cijenaUdaljenosti,

    osnovica,
    pdv,
    ukupno,

    kupacImeVal,
    kupacAdresaVal,
    kupacOIBVal,
    kupacNapomenaVal
  };

  result.textContent = `
PONUDA – Model ${selectedType}

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Ograda:
  Širina: ${sirinaVal} m
  Visina: ${visinaVal} m
  Površina: ${kvadratura.toFixed(2)} m²

Ulazna vrata:
  Širina: ${ulaznaSirinaVal} m
  Visina: ${ulaznaVisinaVal} m
  Površina: ${povrsinaUlaznih.toFixed(2)} m²

Klizna vrata:
  Širina: ${kliznaDuzinaVal} m
  Visina: ${kliznaVisinaVal} m
  Površina: ${povrsinaKliznih.toFixed(2)} m²

RAL boja: ${ralBojaVal}

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
   IZRAČUN – PERGOLA (s RAL bojom)
--------------------------------------------------------- */

function calculatePergola() {
  const duzinaVal = parseFloat(pergDuzina.value) || 0;
  const sirinaVal = parseFloat(pergSirina.value) || 0;
  const stupoviVal = parseInt(pergStupovi.value) || 0;
  const visinaStupovaVal = parseFloat(pergVisinaStupova.value) || 0;
  const montazaVal = pergMontaza.value;
  const kmVal = parseFloat(pergKilometri.value) || 0;

  const ralBojaVal = pergRal.value || "Nije odabrano";

  const kupacImeVal = pergKupacIme.value.trim();
  const kupacAdresaVal = pergKupacAdresa.value.trim();
  const kupacOIBVal = pergKupacOIB.value.trim();
  const kupacNapomenaVal = pergKupacNapomena.value.trim();

  if (!duzinaVal || !sirinaVal)
    return alert("Unesite dužinu i širinu pergole.");

  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const povrsina = duzinaVal * sirinaVal;
  const cijenaPovrsine = povrsina * CijenePergola.m2;
  const cijenaStupova = stupoviVal * CijenePergola.stup;
  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const osnovica =
    cijenaPovrsine +
    cijenaStupova +
    cijenaMontaze +
    cijenaUdaljenosti;

  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "pergola",

    duzina: duzinaVal,
    sirina: sirinaVal,
    povrsina,
    stupovi: stupoviVal,
    visinaStupova: visinaStupovaVal,

    ralBojaVal,
    montazaVal,
    kmVal,

    osnovica,
    pdv,
    ukupno,

    kupacImeVal,
    kupacAdresaVal,
    kupacOIBVal,
    kupacNapomenaVal
  };

  pergResult.textContent = `
PONUDA – Pergola

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Dužina: ${duzinaVal} m
Širina: ${sirinaVal} m
Površina: ${povrsina.toFixed(2)} m²
Broj stupova: ${stupoviVal}
Visina stupova: ${visinaStupovaVal} m

RAL boja: ${ralBojaVal}

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}

Cijena je informativnog karaktera.
${Firma.naziv}
`;

  pergResult.classList.remove("hidden");
  pergPdfBtn.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – NADSTREŠNICA (s RAL bojom)
--------------------------------------------------------- */

function calculateNadstresnica() {
  const duzinaVal = parseFloat(nadDuzina.value) || 0;
  const sirinaVal = parseFloat(nadSirina.value) || 0;
  const stupoviVal = parseInt(nadStupovi.value) || 0;
  const visinaStupovaVal = parseFloat(nadVisinaStupova.value) || 0;
  const montazaVal = nadMontaza.value;
  const kmVal = parseFloat(nadKilometri.value) || 0;

  const ralBojaVal = nadRal.value || "Nije odabrano";

  const kupacImeVal = nadKupacIme.value.trim();
  const kupacAdresaVal = nadKupacAdresa.value.trim();
  const kupacOIBVal = nadKupacOIB.value.trim();
  const kupacNapomenaVal = nadKupacNapomena.value.trim();

  if (!duzinaVal || !sirinaVal)
    return alert("Unesite dužinu i širinu nadstrešnice.");

  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const povrsina = duzinaVal * sirinaVal;
  const cijenaPovrsine = povrsina * CijeneNadstresnica.m2;
  const cijenaStupova = stupoviVal * CijeneNadstresnica.stup;
  const cijenaMontaze = CijeneMontaze[montazaVal];
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const osnovica =
    cijenaPovrsine +
    cijenaStupova +
    cijenaMontaze +
    cijenaUdaljenosti;

  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "nadstresnica",

    duzina: duzinaVal,
    sirina: sirinaVal,
    povrsina,
    stupovi: stupoviVal,
    visinaStupova: visinaStupovaVal,

    ralBojaVal,
    montazaVal,
    kmVal,

    osnovica,
    pdv,
    ukupno,

    kupacImeVal,
    kupacAdresaVal,
    kupacOIBVal,
    kupacNapomenaVal
  };

  nadResult.textContent = `
PONUDA – Nadstrešnica

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Dužina: ${duzinaVal} m
Širina: ${sirinaVal} m
Površina: ${povrsina.toFixed(2)} m²
Broj stupova: ${stupoviVal}
Visina stupova: ${visinaStupovaVal} m

RAL boja: ${ralBojaVal}

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}

Cijena je informativnog karaktera.
${Firma.naziv}
`;

  nadResult.classList.remove("hidden");
  nadPdfBtn.classList.remove("hidden");
}

/* ---------------------------------------------------------
   PDF GENERATOR — PDFMAKE (PROŠIRENO)
--------------------------------------------------------- */

function downloadPDF() {
  if (!lastOfferData) return alert("Prvo izračunaj ponudu.");

  if (!LogoBase64) {
    alert("Logo se još učitava... pokušajte ponovno.");
    return;
  }

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

  let stavkaNaslov = "";
  let tableBody = [];

  /* ---------------------------------------------------------
     OGRADA
  --------------------------------------------------------- */
  if (lastOfferData.tip === "ograda") {
    stavkaNaslov =
      selectedCategory === "laserske"
        ? `Laserski rezana ograda ${lastOfferData.model}`
        : `Aluminijska ograda ${lastOfferData.model}`;

    tableBody = [
      [{ text: "Opis", bold: true }, { text: "Vrijednost", bold: true }],

      ["Širina ograde", lastOfferData.sirinaVal + " m"],
      ["Visina ograde", lastOfferData.visinaVal + " m"],
      ["Površina ograde", lastOfferData.kvadratura.toFixed(2) + " m²"],

      ["Ulazna vrata – širina", lastOfferData.ulazna.ulaznaSirinaVal + " m"],
      ["Ulazna vrata – visina", lastOfferData.ulazna.ulaznaVisinaVal + " m"],
      ["Ulazna vrata – površina", lastOfferData.ulazna.povrsinaUlaznih.toFixed(2) + " m²"],
      //["Ulazna vrata – cijena", lastOfferData.ulazna.cijenaUlaznih.toFixed(2) + " €"],

      ["Klizna vrata – dužina", lastOfferData.klizna.kliznaDuzinaVal + " m"],
      ["Klizna vrata – visina", lastOfferData.klizna.kliznaVisinaVal + " m"],
      ["Klizna vrata – površina", lastOfferData.klizna.povrsinaKliznih.toFixed(2) + " m²"],
      //["Klizna vrata – cijena", lastOfferData.klizna.cijenaKliznih.toFixed(2) + " €"],

      ["RAL boja", lastOfferData.ralBojaVal],

      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"]
    ];
  }

  /* ---------------------------------------------------------
     PERGOLA
  --------------------------------------------------------- */
  if (lastOfferData.tip === "pergola") {
    stavkaNaslov = "Pergola";

    tableBody = [
      [{ text: "Opis", bold: true }, { text: "Vrijednost", bold: true }],

      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],

      ["RAL boja", lastOfferData.ralBojaVal],

      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"]
    ];
  }

  /* ---------------------------------------------------------
     NADSTREŠNICA
  --------------------------------------------------------- */
  if (lastOfferData.tip === "nadstresnica") {
    stavkaNaslov = "Nadstrešnica";

    tableBody = [
      [{ text: "Opis", bold: true }, { text: "Vrijednost", bold: true }],

      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],

      ["RAL boja", lastOfferData.ralBojaVal],

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

      { text: "Kupac", style: "sectionTitle" },
      {
        stack: [
          "Ime: " + lastOfferData.kupacImeVal,
          "Adresa: " + lastOfferData.kupacAdresaVal,
          "OIB: " + lastOfferData.kupacOIBVal
        ]
      },

      "\n",

      { text: stavkaNaslov, style: "sectionTitle" },

      {
        table: {
          widths: ["*", "auto"],
          body: tableBody
        },
        layout: "lightHorizontalLines"
      },

      "\n",

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