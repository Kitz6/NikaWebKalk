/* ---------------------------------------------------------
   MODELI KOJI SE NE KORISTE
--------------------------------------------------------- */

const hiddenModels = ["TE10"];

/* ---------------------------------------------------------
   CIJENE
--------------------------------------------------------- */

/* Ograde – cijena po m² (dvorišna) */
const CijeneDvorišna = {
  TE00: 216, 
  TE01: 159.60, 
  TE02: 186, 
  TE03: 168, 
  TE04: 150, 
  TE05: 156,
  TE06: 175.20, 
  TE07: 126, 
  TE08: 138, 
  TE09: 120, 
  TE10: 0, 
  TE11: 210,

  LAS: 216
};

/* Ograde – cijena po m² (balkonska) */
const CijeneBalkonska = {
  TE00: 228, 
  TE01: 180, 
  TE02: 206.40, 
  TE03: 186, 
  TE04: 228, 
  TE05: 214.50,
  TE06: 192, 
  TE07: 144, 
  TE08: 156, 
  TE09: 138, 
  TE10: 0, 
  TE11: 234,

  LAS: 228
};

/* Vrata – TE modeli */
const VrataTE = {
  jednokrilna: {
    TE00: 372, 
    TE01: 319.20, 
    TE02: 348, 
    TE03: 330, 
    TE04: 307.20, 
    TE05: 318,
    TE06: 319.20, 
    TE07: 288, 
    TE08: 295.20, 
    TE09: 282, 
    TE10: 0, 
    TE11: 366
  },
  dvokrilna: {
    TE00: 318, 
    TE01: 247.20, 
    TE02: 276, 
    TE03: 258, 
    TE04: 240, 
    TE05: 246,
    TE06: 282, 
    TE07: 216, 
    TE08: 228, 
    TE09: 210, 
    TE10: 0, 
    TE11: 306
  },
  klizna: {
    TE00: 324, 
    TE01: 264, 
    TE02: 288, 
    TE03: 276, 
    TE04: 252, 
    TE05: 259,
    TE06: 300, 
    TE07: 234, 
    TE08: 240, 
    TE09: 228, 
    TE10: 0, 
    TE11: 318
  },
  samonosiva: {
    TE00: 474, 
    TE01: 342, 
    TE02: 0, 
    TE03: 444, 
    TE04: 324, 
    TE05: 0,
    TE06: 0, 
    TE07: 318, 
    TE08: 330, 
    TE09: 372, 
    TE10: 0, 
    TE11: 400
  }
};

/* Vrata – LAS */
const VrataLAS = {
  jednokrilna: 372,
  dvokrilna: 318,
  klizna: 324,
  samonosiva: 474
};

/* Pergola */
const CijenePergola = { 
  m2: 400, 
  motor: 1200 
};

/* Nadstrešnica */
const CijeneNadstresnica = { 
  m2: 260 
};

/* PDV */
const PDV = 0.25;

/* ---------------------------------------------------------
   PODACI O FIRMI
--------------------------------------------------------- */

const Firma = {
  naziv: "NIKA KONSTRUKCIJE d.o.o.",
  adresa: "Braće Radića 23, 42208 Petrijanec",
  kontakt: "info@nika-konstrukcije.hr",
  telefon: "+385 042-303-166",
  web: "www.nika-konstrukcije.hr"
};

/* ---------------------------------------------------------
   GLOBALNE VARIJABLE
--------------------------------------------------------- */

let LogoBase64 = null;
let selectedCategory = "";
let selectedType = "";
let lastOffer = null;

/* ---------------------------------------------------------
   LOGO — učitaj u Base64
--------------------------------------------------------- */

fetch("img/logo.png")
  .then(res => res.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.onloadend = () => {
      LogoBase64 = reader.result;
    };
    reader.readAsDataURL(blob);
  })
  .catch(err => console.error("Logo se ne može učitati:", err));

/* ---------------------------------------------------------
   DOM ELEMENTI
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
const montaza = document.getElementById("montaza");

const kupacIme = document.getElementById("kupacIme");
const kupacAdresa = document.getElementById("kupacAdresa");
const kupacKontakt = document.getElementById("kupacOIB");
const kupacNapomena = document.getElementById("kupacNapomena");

const result = document.getElementById("result");
const pdfBtn = document.getElementById("pdfBtn");

/* VRATA */
const chkJednokrilna = document.getElementById("chkJednokrilna");
const chkDvokrilna = document.getElementById("chkDvokrilna");
const chkKlizna = document.getElementById("chkKlizna");
const chkSamonosiva = document.getElementById("chkSamonosiva");

const jednokrilnaFields = document.getElementById("jednokrilnaFields");
const dvokrilnaFields = document.getElementById("dvokrilnaFields");
const kliznaFields = document.getElementById("kliznaFields");
const samonosivaFields = document.getElementById("samonosivaFields");

const jednokrilnaSirina = document.getElementById("jednokrilnaSirina");
const jednokrilnaVisina = document.getElementById("jednokrilnaVisina");
const dvokrilnaSirina = document.getElementById("dvokrilnaSirina");
const dvokrilnaVisina = document.getElementById("dvokrilnaVisina");
const kliznaDuzina = document.getElementById("kliznaDuzina");
const kliznaVisina = document.getElementById("kliznaVisina");
const samonosivaDuzina = document.getElementById("samonosivaDuzina");
const samonosivaVisina = document.getElementById("samonosivaVisina");

/* ---------------------------------------------------------
   NAVIGACIJA
--------------------------------------------------------- */

function selectCategory(cat) {
  selectedCategory = cat;

  // Sakrij sve ekrane
  screen1.classList.add("hidden");
  screen2.classList.add("hidden");
  screen3.classList.add("hidden");
  screenPergola.classList.add("hidden");
  screenNadstresnica.classList.add("hidden");

  // ALUMINIJ
  if (cat === "aluminijske") {
    screen2.classList.remove("hidden");
    loadTypes();
    return;
  }

  // LASERSKE — idu direktno na screen3
  if (cat === "laserske") {
    selectedType = "LAS";
    selectedTypeLabel.textContent = "LAS";
    screen3.classList.remove("hidden");
    handleMontazaChange();
    return;
  }

  // PERGOLA
  if (cat === "pergola") {
    screenPergola.classList.remove("hidden");
    return;
  }

  // NADSTREŠNICA
  if (cat === "nadstresnica") {
    screenNadstresnica.classList.remove("hidden");
    return;
  }
}

function loadTypes() {
  typeGrid.innerHTML = "";

  for (let i = 1; i <= 11; i++) {
    const t = "TE" + String(i).padStart(2, "0");

    // Ako je model u listi skrivenih → preskoči
    if (hiddenModels.includes(t)) continue;

    typeGrid.innerHTML += `
      <div class="card" onclick="selectType('${t}')">
        <img src="img/${t.toLowerCase()}.webp">
        <h3>${t}</h3>
      </div>`;
  }
}

function selectType(t) {
  selectedType = t;
  selectedTypeLabel.textContent = t;

  screen2.classList.add("hidden");
  screen3.classList.remove("hidden");

  handleMontazaChange();
}

function goBack() {
  // Ovo se koristi samo na screen2 → vrati na početak
  screen2.classList.add("hidden");
  screen1.classList.remove("hidden");
}

function goBackToTypes() {
  // Ako je laserska ograda → vrati na početak
  if (selectedCategory === "laserske") {
    screen3.classList.add("hidden");
    screen1.classList.remove("hidden");
    return;
  }

  // Inače (aluminijske) → vrati na odabir modela
  screen3.classList.add("hidden");
  screen2.classList.remove("hidden");
}

/* =========================================================
   LOGIKA VRATA
========================================================= */

function handleMontazaChange() {
  const isBalkonska = montaza.value === "balkonska";

  const naslov = document.getElementById("vrataNaslov");
  const checkboxGroups = document.querySelectorAll(".checkbox-group");

  const sections = [
    { chk: chkJednokrilna, box: jednokrilnaFields },
    { chk: chkDvokrilna, box: dvokrilnaFields },
    { chk: chkKlizna, box: kliznaFields },
    { chk: chkSamonosiva, box: samonosivaFields }
  ];

  if (isBalkonska) {
    naslov.style.display = "none";
    checkboxGroups.forEach(el => el.style.display = "none");
    sections.forEach(s => s.box.classList.add("hidden"));
    chkJednokrilna.checked = false;
    chkDvokrilna.checked = false;
    chkKlizna.checked = false;
    chkSamonosiva.checked = false;
    return;
  }

  naslov.style.display = "block";
  checkboxGroups.forEach(el => el.style.display = "block");

  sections.forEach(s => {
    s.box.classList.toggle("hidden", !s.chk.checked);
  });
}

/* =========================================================
   IZRAČUN OGRADA
========================================================= */

function calculate() {
  const sir = parseFloat(sirina.value) || 0;
  const vis = parseFloat(visina.value) || 0;

  if (!sir || !vis) return alert("Unesite širinu i visinu ograde.");

  const kupac = {
    ime: kupacIme.value.trim(),
    adresa: kupacAdresa.value.trim(),
    kontakt: kupacKontakt.value.trim(),
    napomena: kupacNapomena.value.trim()
  };

  if (!kupac.ime || !kupac.adresa || !kupac.kontakt)
    return alert("Unesite sve podatke o kupcu.");

  const kvadratura = sir * vis;
  const jeDvorišna = montaza.value === "dvorišna";

  const cijenaM2 = jeDvorišna
    ? CijeneDvorišna[selectedType]
    : CijeneBalkonska[selectedType];

  const iznosOgrade = kvadratura * (cijenaM2 || 0);

  /* ---------------- VRATA ---------------- */

  function povrsina(s, v) {
    return (parseFloat(s) || 0) * (parseFloat(v) || 0);
  }

  const jeTE = selectedType.startsWith("TE");
  const jeLAS = selectedType === "LAS";

  function cijenaVrata(tip, pov) {
    if (jeLAS) return pov * VrataLAS[tip];
    return pov * (VrataTE[tip][selectedType] || 0);
  }

  const vrata = {
    jednokrilna: chkJednokrilna.checked ? {
      sirina: parseFloat(jednokrilnaSirina.value) || 0,
      visina: parseFloat(jednokrilnaVisina.value) || 0
    } : null,

    dvokrilna: chkDvokrilna.checked ? {
      sirina: parseFloat(dvokrilnaSirina.value) || 0,
      visina: parseFloat(dvokrilnaVisina.value) || 0
    } : null,

    klizna: chkKlizna.checked ? {
      duzina: parseFloat(kliznaDuzina.value) || 0,
      visina: parseFloat(kliznaVisina.value) || 0
    } : null,

    samonosiva: chkSamonosiva.checked ? {
      duzina: parseFloat(samonosivaDuzina.value) || 0,
      visina: parseFloat(samonosivaVisina.value) || 0
    } : null
  };

  let ukupnoVrata = 0;

  if (vrata.jednokrilna) {
    vrata.jednokrilna.pov = povrsina(vrata.jednokrilna.sirina, vrata.jednokrilna.visina);
    vrata.jednokrilna.cijena = cijenaVrata("jednokrilna", vrata.jednokrilna.pov);
    ukupnoVrata += vrata.jednokrilna.cijena;
  }

  if (vrata.dvokrilna) {
    vrata.dvokrilna.pov = povrsina(vrata.dvokrilna.sirina, vrata.dvokrilna.visina);
    vrata.dvokrilna.cijena = cijenaVrata("dvokrilna", vrata.dvokrilna.pov);
    ukupnoVrata += vrata.dvokrilna.cijena;
  }

  if (vrata.klizna) {
    vrata.klizna.pov = povrsina(vrata.klizna.duzina, vrata.klizna.visina);
    vrata.klizna.cijena = cijenaVrata("klizna", vrata.klizna.pov);
    ukupnoVrata += vrata.klizna.cijena;
  }

  if (vrata.samonosiva) {
    vrata.samonosiva.pov = povrsina(vrata.samonosiva.duzina, vrata.samonosiva.visina);
    vrata.samonosiva.cijena = cijenaVrata("samonosiva", vrata.samonosiva.pov);
    ukupnoVrata += vrata.samonosiva.cijena;
  }

  /* ---------------- UKUPNO ---------------- */

  const osnovica = iznosOgrade + ukupnoVrata;
  const pdv = osnovica * PDV;
  const ukupno = osnovica + pdv;

  /* ---------------- SPREMI ---------------- */

  lastOffer = {
    tip: "ograda",
    model: selectedType,
    sir,
    vis,
    kvadratura,
    montaza: montaza.value,
    iznosOgrade,
    vrata,
    osnovica,
    pdv,
    ukupno,
    kupac
  };

  /* ---------------- PRIKAZ ---------------- */

  let vrataTekst = "";

  function addVrata(label, v) {
    if (!v) return;
    vrataTekst += `
${label}:
  Površina: ${v.pov.toFixed(2)} m²
  Cijena: €${v.cijena.toFixed(2)}
`;
  }

  addVrata("Jednokrilna vrata", vrata.jednokrilna);
  addVrata("Dvokrilna vrata", vrata.dvokrilna);
  addVrata("Klizna vrata", vrata.klizna);
  addVrata("Samonosiva vrata", vrata.samonosiva);

  result.textContent = `
PONUDA – ${selectedType}

Kupac: ${kupac.ime}
Adresa: ${kupac.adresa}
Kontakt: ${kupac.kontakt}

Ograda:
  Širina: ${sir} m
  Visina: ${vis} m
  Površina: ${kvadratura.toFixed(2)} m²
  Iznos ograde: €${iznosOgrade.toFixed(2)}

${vrataTekst}

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena: ${kupac.napomena || "—"}
`;

  result.classList.remove("hidden");
  pdfBtn.classList.remove("hidden");
}

/* =========================================================
   PERGOLA — IZRAČUN
========================================================= */

function calculatePergola() {
  const duzina = parseFloat(pergDuzina.value) || 0;
  const sirina = parseFloat(pergSirina.value) || 0;

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu pergole.");

  const kupac = {
    ime: pergKupacIme.value.trim(),
    adresa: pergKupacAdresa.value.trim(),
    kontakt: pergKupacOIB.value.trim(),
    napomena: pergKupacNapomena.value.trim()
  };

  if (!kupac.ime || !kupac.adresa || !kupac.kontakt)
    return alert("Unesite sve podatke o kupcu.");

  const povrsina = duzina * sirina;
  const cijenaPovrsine = povrsina * CijenePergola.m2;
  const cijenaMotora = pergMotor.value === "sa" ? CijenePergola.motor : 0;

  const osnovica = cijenaPovrsine + cijenaMotora;
  const pdv = osnovica * PDV;
  const ukupno = osnovica + pdv;

  lastOffer = {
    tip: "pergola",
    duzina,
    sirina,
    povrsina,
    cijenaPovrsine,
    cijenaMotora,
    osnovica,
    pdv,
    ukupno,
    kupac
  };

  pergResult.textContent = `
PONUDA – PERGOLA

Kupac: ${kupac.ime}
Adresa: ${kupac.adresa}
Kontakt: ${kupac.kontakt}

Pergola:
  Dužina: ${duzina} m
  Širina: ${sirina} m
  Površina: ${povrsina.toFixed(2)} m²
  Cijena pergole: €${cijenaPovrsine.toFixed(2)}
  Motor: ${cijenaMotora > 0 ? "DA (+" + cijenaMotora + " €)" : "NE"}

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena: ${kupac.napomena || "—"}
`;

  pergResult.classList.remove("hidden");
  pergPdfBtn.classList.remove("hidden");
}

/* =========================================================
   NADSTREŠNICA — IZRAČUN
========================================================= */

function calculateNadstresnica() {
  const duzina = parseFloat(nadDuzina.value) || 0;
  const sirina = parseFloat(nadSirina.value) || 0;

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu nadstrešnice.");

  const kupac = {
    ime: nadKupacIme.value.trim(),
    adresa: nadKupacAdresa.value.trim(),
    kontakt: nadKupacOIB.value.trim(),
    napomena: nadKupacNapomena.value.trim()
  };

  if (!kupac.ime || !kupac.adresa || !kupac.kontakt)
    return alert("Unesite sve podatke o kupcu.");

  const povrsina = duzina * sirina;
  const cijenaPovrsine = povrsina * CijeneNadstresnica.m2;

  const osnovica = cijenaPovrsine;
  const pdv = osnovica * PDV;
  const ukupno = osnovica + pdv;

  lastOffer = {
    tip: "nadstresnica",
    duzina,
    sirina,
    povrsina,
    cijenaPovrsine,
    osnovica,
    pdv,
    ukupno,
    kupac
  };

  nadResult.textContent = `
PONUDA – NADSTREŠNICA

Kupac: ${kupac.ime}
Adresa: ${kupac.adresa}
Kontakt: ${kupac.kontakt}

Nadstrešnica:
  Dužina: ${duzina} m
  Širina: ${sirina} m
  Površina: ${povrsina.toFixed(2)} m²
  Cijena nadstrešnice: €${cijenaPovrsine.toFixed(2)}

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena: ${kupac.napomena || "—"}
`;

  nadResult.classList.remove("hidden");
  nadPdfBtn.classList.remove("hidden");
}

/* =========================================================
   PDF GENERATOR — PRILAGOĐEN ORIGINALNOM PDF-u
========================================================= */

function generatePDF() {
  if (!lastOffer) {
    alert("Prvo izračunaj ponudu.");
    return;
  }

  if (!LogoBase64) {
    alert("Logo se još učitava... pokušajte ponovno.");
    return;
  }

  /* ---------------------------------------------------------
     HEADER — kao u tvom PDF-u
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
     TABLICA — priprema
  --------------------------------------------------------- */

  let naslov = "";
  let tableBody = [["Opis", "Vrijednost"]];

  /* ---------------------------------------------------------
     OGRADA
  --------------------------------------------------------- */

  if (lastOffer.tip === "ograda") {
    naslov = `Aluminijska ograda ${lastOffer.model}`;

    tableBody.push(["Tip montaže", lastOffer.montaza]);

    tableBody.push(["Širina ograde", lastOffer.sir + " m"]);
    tableBody.push(["Visina ograde", lastOffer.vis + " m"]);
    tableBody.push(["Površina ograde", lastOffer.kvadratura.toFixed(2) + " m2"]);
    tableBody.push(["Iznos ograde", lastOffer.iznosOgrade.toFixed(2) + " €"]);

    const V = lastOffer.vrata;

    /* ---------------- JEDNOKRILNA ---------------- */
    if (V.jednokrilna) {
      tableBody.push(["Jednokrilna vrata - širina", V.jednokrilna.sirina + " m"]);
      tableBody.push(["Jednokrilna vrata - visina", V.jednokrilna.visina + " m"]);
      tableBody.push(["Jednokrilna vrata - površina", V.jednokrilna.pov.toFixed(2) + " m2"]);
      tableBody.push(["Jednokrilna vrata - cijena", V.jednokrilna.cijena.toFixed(2) + " €"]);
    }

    /* ---------------- DVOKRILNA ---------------- */
    if (V.dvokrilna) {
      tableBody.push(["Dvokrilna vrata - širina", V.dvokrilna.sirina + " m"]);
      tableBody.push(["Dvokrilna vrata - visina", V.dvokrilna.visina + " m"]);
      tableBody.push(["Dvokrilna vrata - površina", V.dvokrilna.pov.toFixed(2) + " m2"]);
      tableBody.push(["Dvokrilna vrata - cijena", V.dvokrilna.cijena.toFixed(2) + " €"]);
    }

    /* ---------------- KLIZNA ---------------- */
    if (V.klizna) {
      tableBody.push(["Klizna vrata - dužina", V.klizna.duzina + " m"]);
      tableBody.push(["Klizna vrata - visina", V.klizna.visina + " m"]);
      tableBody.push(["Klizna vrata - površina", V.klizna.pov.toFixed(2) + " m2"]);
      tableBody.push(["Klizna vrata - cijena", V.klizna.cijena.toFixed(2) + " €"]);
    }

    /* ---------------- SAMONOSIVA ---------------- */
    if (V.samonosiva) {
      tableBody.push(["Samonosiva vrata - dužina", V.samonosiva.duzina + " m"]);
      tableBody.push(["Samonosiva vrata - visina", V.samonosiva.visina + " m"]);
      tableBody.push(["Samonosiva vrata - površina", V.samonosiva.pov.toFixed(2) + " m2"]);
      tableBody.push(["Samonosiva vrata - cijena", V.samonosiva.cijena.toFixed(2) + " €"]);
    }

  }

  /* ---------------------------------------------------------
     PERGOLA
  --------------------------------------------------------- */

  if (lastOffer.tip === "pergola") {
    naslov = "Pergola";

    tableBody.push(["Dužina", lastOffer.duzina + " m"]);
    tableBody.push(["Širina", lastOffer.sirina + " m"]);
    tableBody.push(["Površina", lastOffer.povrsina.toFixed(2) + " m2"]);
    tableBody.push(["Cijena pergole", lastOffer.cijenaPovrsine.toFixed(2) + " €"]);
    tableBody.push(["Motor", lastOffer.cijenaMotora > 0 ? "DA" : "NE"]);
  }

  /* ---------------------------------------------------------
     NADSTREŠNICA
  --------------------------------------------------------- */

  if (lastOffer.tip === "nadstresnica") {
    naslov = "Nadstrešnica";

    tableBody.push(["Dužina", lastOffer.duzina + " m"]);
    tableBody.push(["Širina", lastOffer.sirina + " m"]);
    tableBody.push(["Površina", lastOffer.povrsina.toFixed(2) + " m2"]);
    tableBody.push(["Cijena nadstrešnice", lastOffer.cijenaPovrsine.toFixed(2) + " €"]);
  }

  /* ---------------------------------------------------------
     PDF DEFINICIJA — kao u tvom PDF-u
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
          Firma.kontakt,
          Firma.telefon,
          Firma.web
        ]
      },

      "\n",

      { text: "Kupac", style: "sectionTitle" },
      {
        stack: [
          "Ime: " + lastOffer.kupac.ime,
          "Adresa: " + lastOffer.kupac.adresa,
          "OIB: " + lastOffer.kupac.kontakt
        ]
      },

      "\n",

      { text: naslov, style: "sectionTitle" },

      {
        table: {
          widths: ["*", "auto"],
          body: tableBody
        },
        layout: {
          hLineColor: '#cccccc',
          vLineColor: '#cccccc',
          hLineWidth: () => 0.7,
          vLineWidth: () => 0.7,
          paddingLeft: () => 6,
          paddingRight: () => 6,
          paddingTop: () => 4,
          paddingBottom: () => 4
        }
      },

      { text: "Sažetak iznosa", style: "sectionTitle", margin: [0, 15, 0, 5] },

      {
        table: {
          widths: ["*", "auto"],
          body: [
            ["Osnovica:", lastOffer.osnovica.toFixed(2) + " €"],
            ["PDV 25%:", lastOffer.pdv.toFixed(2) + " €"],
            ["Ukupno:", lastOffer.ukupno.toFixed(2) + " €"]
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

  pdfMake.createPdf(docDefinition).download(`Ponuda_${naslov}.pdf`);
}