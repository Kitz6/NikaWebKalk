/* ---------------------------------------------------------
   KONFIGURACIJA CIJENA
--------------------------------------------------------- */

/* Ograde – cijena po m² (dvorišna) */
const CijeneKvadratureDvorišna = {
  TE00: 216, TE01: 159.60, TE02: 186, TE03: 168, TE04: 150, TE05: 156,
  TE06: 175.20, TE07: 126, TE08: 138, TE09: 120, TE10: 0, TE11: 210,

  LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0,
  LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0
};

/* Ograde – cijena po m² (balkonska) */
const CijeneKvadratureBalkonska = {
  TE00: 228, TE01: 180, TE02: 206.40, TE03: 186, TE04: 228, TE05: 214.50,
  TE06: 192, TE07: 144, TE08: 156, TE09: 138, TE10: 0, TE11: 234,

  LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0,
  LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0
};

/* Vrata – TE modeli (po m²) */
const CijeneVrataTE = {
  jednokrilna: {
    TE00: 372, TE01: 319.20, TE02: 348, TE03: 330, TE04: 307.20, TE05: 318,
    TE06: 319.20, TE07: 288, TE08: 295.20, TE09: 282, TE10: 0, TE11: 366
  },
  dvokrilna: {
    TE00: 318, TE01: 247.20, TE02: 276, TE03: 258, TE04: 240, TE05: 246,
    TE06: 282, TE07: 216, TE08: 228, TE09: 210, TE10: 0, TE11: 306
  },
  klizna: {
    TE00: 324, TE01: 264, TE02: 288, TE03: 276, TE04: 252, TE05: 259,
    TE06: 300, TE07: 234, TE08: 240, TE09: 228, TE10: 0, TE11: 318
  },
  samonosiva: {
    TE00: 474, TE01: 342, TE02: 0, TE03: 444, TE04: 324, TE05: 0,
    TE06: 0, TE07: 318, TE08: 330, TE09: 372, TE10: 0, TE11: 400
  }
};

/* Vrata – LAS modeli */
const CijeneVrataLAS = {
  jednokrilna: { LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0, LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0 },
  dvokrilna: { LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0, LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0 },
  klizna:     { LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0, LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0 },
  samonosiva: { LAS01: 0, LAS02: 0, LAS03: 0, LAS04: 0, LAS05: 0, LAS06: 0, LAS07: 0, LAS08: 0, LAS09: 0, LAS10: 0 }
};

/* Pergola */
const CijenePergola = {
  m2: 400,
  stup: 0,
  motor: 1200
};

/* Nadstrešnica */
const CijeneNadstresnica = {
  m2: 260,
  stup: 0
};

/* Montaža */
const CijeneMontaze = {
  "dvorišna": 0,
  "balkonska": 0
};

/* Prijevoz */
const CijenaPoKilometru = 0.35;

/* PDV */
const PDV_STOPA = 0.25;

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

/* ---------------------------------------------------------
   GLOBALNE VARIJABLE
--------------------------------------------------------- */

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
const kilometri = document.getElementById("kilometri");
const ralBoja = document.getElementById("ralBoja");

const kupacIme = document.getElementById("kupacIme");
const kupacAdresa = document.getElementById("kupacAdresa");
const kupacOIB = document.getElementById("kupacOIB");
const kupacNapomena = document.getElementById("kupacNapomena");

const result = document.getElementById("result");
const pdfBtn = document.getElementById("pdfBtn");

/* VRATA */
const chkJednokrilna = document.getElementById("chkJednokrilna");
const chkDvokrilna = document.getElementById("chkDvokrilna");
const chkKlizna = document.getElementById("chkKlizna");
const chkSamonosiva = document.getElementById("chkSamonosiva");

const jednokrilnaSirina = document.getElementById("jednokrilnaSirina");
const jednokrilnaVisina = document.getElementById("jednokrilnaVisina");
const dvokrilnaSirina = document.getElementById("dvokrilnaSirina");
const dvokrilnaVisina = document.getElementById("dvokrilnaVisina");
const kliznaDuzina = document.getElementById("kliznaDuzina");
const kliznaVisina = document.getElementById("kliznaVisina");
const samonosivaDuzina = document.getElementById("samonosivaDuzina");
const samonosivaVisina = document.getElementById("samonosivaVisina");

/* PERGOLA */
const pergDuzina = document.getElementById("pergDuzina");
const pergSirina = document.getElementById("pergSirina");
const pergStupovi = document.getElementById("pergStupovi");
const pergVisinaStupova = document.getElementById("pergVisinaStupova");
const pergKilometri = document.getElementById("pergKilometri");
const pergMontaza = document.getElementById("pergMontaza");
const pergKupacIme = document.getElementById("pergKupacIme");
const pergKupacAdresa = document.getElementById("pergKupacAdresa");
const pergKupacOIB = document.getElementById("pergKupacOIB");
const pergKupacNapomena = document.getElementById("pergKupacNapomena");
const pergResult = document.getElementById("pergResult");
const pergPdfBtn = document.getElementById("pergPdfBtn");
const pergMotor = document.getElementById("pergMotor");
const pergRal = document.getElementById("pergRal");

/* NADSTREŠNICA */
const nadDuzina = document.getElementById("nadDuzina");
const nadSirina = document.getElementById("nadSirina");
const nadStupovi = document.getElementById("nadStupovi");
const nadVisinaStupova = document.getElementById("nadVisinaStupova");
const nadKilometri = document.getElementById("nadKilometri");
const nadMontaza = document.getElementById("nadMontaza");
const nadKupacIme = document.getElementById("nadKupacIme");
const nadKupacAdresa = document.getElementById("nadKupacAdresa");
const nadKupacOIB = document.getElementById("nadKupacOIB");
const nadKupacNapomena = document.getElementById("nadKupacNapomena");
const nadResult = document.getElementById("nadResult");
const nadPdfBtn = document.getElementById("nadPdfBtn");
const nadRal = document.getElementById("nadRal");

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

  screen1.classList.remove("hidden");
}

function loadTypes() {
  typeGrid.innerHTML = "";

  if (selectedCategory === "aluminijske") {
    for (let i = 0; i <= 11; i++) {
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
  if (selectedTypeLabel) selectedTypeLabel.textContent = t;

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
   IZRAČUN – Ograde (TE + LAS + vrata)
--------------------------------------------------------- */

function calculate() {
  const sirinaVal = parseFloat(sirina?.value) || 0;
  const visinaVal = parseFloat(visina?.value) || 0;
  const montazaVal = montaza?.value;
  const kmVal = parseFloat(kilometri?.value) || 0;
  const ralBojaVal = ralBoja?.value || "Nije odabrano";

  const kupacImeVal = kupacIme?.value.trim() || "";
  const kupacAdresaVal = kupacAdresa?.value.trim() || "";
  const kupacOIBVal = kupacOIB?.value.trim() || "";
  const kupacNapomenaVal = kupacNapomena?.value.trim() || "";

  if (!sirinaVal || !visinaVal) return alert("Unesite širinu i visinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const kvadratura = sirinaVal * visinaVal;

  const jeDvorišna = montazaVal === "dvorišna";
  const cijenaKvadrature = jeDvorišna
    ? CijeneKvadratureDvorišna[selectedType]
    : CijeneKvadratureBalkonska[selectedType];

  const cijenaMontaze = kvadratura * (CijeneMontaze[montazaVal] || 0);
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  const iznosOgrade = kvadratura * (cijenaKvadrature || 0);

  /* ---------------------------------------------------------
     VRATA – priprema objekata
  --------------------------------------------------------- */

  const jeTE = selectedType.startsWith("TE");
  const jeLAS = selectedType.startsWith("LAS");

  function vrataPovrsina(s, v) {
    return (parseFloat(s) || 0) * (parseFloat(v) || 0);
  }

  /* ---------------- JEDNOKRILNA ---------------- */
  let jednokrilna = {
    aktivno: chkJednokrilna?.checked || false,
    sirina: 0,
    visina: 0,
    povrsina: 0,
    cijena: 0
  };

  if (jednokrilna.aktivno) {
    jednokrilna.sirina = parseFloat(jednokrilnaSirina?.value) || 0;
    jednokrilna.visina = parseFloat(jednokrilnaVisina?.value) || 0;
    jednokrilna.povrsina = vrataPovrsina(jednokrilna.sirina, jednokrilna.visina);

    jednokrilna.cijena =
      jednokrilna.povrsina *
      ((jeTE ? CijeneVrataTE.jednokrilna[selectedType] : CijeneVrataLAS.jednokrilna[selectedType]) || 0);
  }

  /* ---------------- DVOKRILNA ---------------- */
  let dvokrilna = {
    aktivno: chkDvokrilna?.checked || false,
    sirina: 0,
    visina: 0,
    povrsina: 0,
    cijena: 0
  };

  if (dvokrilna.aktivno) {
    dvokrilna.sirina = parseFloat(dvokrilnaSirina?.value) || 0;
    dvokrilna.visina = parseFloat(dvokrilnaVisina?.value) || 0;
    dvokrilna.povrsina = vrataPovrsina(dvokrilna.sirina, dvokrilna.visina);

    dvokrilna.cijena =
      dvokrilna.povrsina *
      ((jeTE ? CijeneVrataTE.dvokrilna[selectedType] : CijeneVrataLAS.dvokrilna[selectedType]) || 0);
  }

  /* ---------------- KLIZNA ---------------- */
  let klizna = {
    aktivno: chkKlizna?.checked || false,
    duzina: 0,
    visina: 0,
    povrsina: 0,
    cijena: 0
  };

  if (klizna.aktivno) {
    klizna.duzina = parseFloat(kliznaDuzina?.value) || 0;
    klizna.visina = parseFloat(kliznaVisina?.value) || 0;
    klizna.povrsina = vrataPovrsina(klizna.duzina, klizna.visina);

    klizna.cijena =
      klizna.povrsina *
      ((jeTE ? CijeneVrataTE.klizna[selectedType] : CijeneVrataLAS.klizna[selectedType]) || 0);
  }

  /* ---------------- SAMONOSIVA ---------------- */
  let samonosiva = {
    aktivno: chkSamonosiva?.checked || false,
    duzina: 0,
    visina: 0,
    povrsina: 0,
    cijena: 0
  };

  if (samonosiva.aktivno) {
    samonosiva.duzina = parseFloat(samonosivaDuzina?.value) || 0;
    samonosiva.visina = parseFloat(samonosivaVisina?.value) || 0;
    samonosiva.povrsina = vrataPovrsina(samonosiva.duzina, samonosiva.visina);

    samonosiva.cijena =
      samonosiva.povrsina *
      ((jeTE ? CijeneVrataTE.samonosiva[selectedType] : CijeneVrataLAS.samonosiva[selectedType]) || 0);
  }

  /* ---------------------------------------------------------
     UKUPNO VRATA
  --------------------------------------------------------- */

  const ukupnoVrata =
    jednokrilna.cijena +
    dvokrilna.cijena +
    klizna.cijena +
    samonosiva.cijena;

  /* ---------------------------------------------------------
     UKUPNA OSNOVICA
  --------------------------------------------------------- */

  const osnovica =
    iznosOgrade +
    cijenaMontaze +
    cijenaUdaljenosti +
    ukupnoVrata;

  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  /* ---------------------------------------------------------
     SPREMANJE PODATAKA
  --------------------------------------------------------- */

  lastOfferData = {
    tip: "ograda",
    model: selectedType,
    sirinaVal,
    visinaVal,
    kvadratura,
    montazaVal,
    kmVal,
    ralBojaVal,
    cijenaKvadrature: cijenaKvadrature || 0,
    iznosOgrade,
    cijenaMontaze,
    cijenaUdaljenosti,
    jednokrilna,
    dvokrilna,
    klizna,
    samonosiva,
    osnovica,
    pdv,
    ukupno,
    kupacImeVal,
    kupacAdresaVal,
    kupacOIBVal,
    kupacNapomenaVal
  };

  /* ---------------------------------------------------------
     PRIKAZ REZULTATA – OGRADA
  --------------------------------------------------------- */

  let vrataTekst = "";

  if (jednokrilna.aktivno) {
    vrataTekst += `
Jednokrilna vrata:
  širina: ${jednokrilna.sirina} m
  visina: ${jednokrilna.visina} m
  površina: ${jednokrilna.povrsina.toFixed(2)} m²
  cijena: €${jednokrilna.cijena.toFixed(2)}
`;
  }

  if (dvokrilna.aktivno) {
    vrataTekst += `
Dvokrilna vrata:
  širina: ${dvokrilna.sirina} m
  visina: ${dvokrilna.visina} m
  površina: ${dvokrilna.povrsina.toFixed(2)} m²
  cijena: €${dvokrilna.cijena.toFixed(2)}
`;
  }

  if (klizna.aktivno) {
    vrataTekst += `
Klizna vrata:
  dužina: ${klizna.duzina} m
  visina: ${klizna.visina} m
  površina: ${klizna.povrsina.toFixed(2)} m²
  cijena: €${klizna.cijena.toFixed(2)}
`;
  }

  if (samonosiva.aktivno) {
    vrataTekst += `
Samonosiva vrata:
  dužina: ${samonosiva.duzina} m
  visina: ${samonosiva.visina} m
  površina: ${samonosiva.povrsina.toFixed(2)} m²
  cijena: €${samonosiva.cijena.toFixed(2)}
`;
  }

  result.textContent = `
PONUDA – Model ${selectedType}

Kupac: ${kupacImeVal}
Adresa: ${kupacAdresaVal}
OIB: ${kupacOIBVal}

Ograda:
  Širina: ${sirinaVal} m
  Visina: ${visinaVal} m
  Površina (m²): ${kvadratura.toFixed(2)} m²
  Iznos ograde: €${iznosOgrade.toFixed(2)}

${vrataTekst || ""}

RAL boja: ${ralBojaVal}

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Montaža: €${cijenaMontaze.toFixed(2)}
Udaljenost: €${cijenaUdaljenosti.toFixed(2)}

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}

Cijena je informativnog karaktera.
${Firma.naziv}
`;

  result.classList.remove("hidden");
  pdfBtn?.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – Pergola
--------------------------------------------------------- */

function calculatePergola() {
  const duzina = parseFloat(pergDuzina?.value) || 0;
  const sirina = parseFloat(pergSirina?.value) || 0;
  const stupovi = parseInt(pergStupovi?.value) || 0;
  const visinaStupova = parseFloat(pergVisinaStupova?.value) || 0;

  const kmVal = parseFloat(pergKilometri?.value) || 0;
  const montazaVal = pergMontaza?.value;
  const ralBojaVal = pergRal?.value || "Nije odabrano";

  const kupacImeVal = pergKupacIme?.value.trim() || "";
  const kupacAdresaVal = pergKupacAdresa?.value.trim() || "";
  const kupacOIBVal = pergKupacOIB?.value.trim() || "";
  const kupacNapomenaVal = pergKupacNapomena?.value.trim() || "";

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const povrsina = duzina * sirina;

  const cijenaPovrsine = povrsina * (CijenePergola.m2 || 0);
  const cijenaStupova = stupovi * visinaStupova * (CijenePergola.stup || 0);
  const cijenaMontaze = povrsina * (CijeneMontaze[montazaVal] || 0);
  const cijenaUdaljenosti = kmVal * CijenaPoKilometru;

  let cijenaMotora = 0;
  const pergMotorVal = pergMotor?.value || "bez";
  if (pergMotorVal === "sa") {
    cijenaMotora = CijenePergola.motor || 0;
  }

  const osnovica =
    cijenaPovrsine +
    cijenaStupova +
    cijenaMontaze +
    cijenaUdaljenosti +
    cijenaMotora;

  const pdv = osnovica * PDV_STOPA;
  const ukupno = osnovica + pdv;

  lastOfferData = {
    tip: "pergola",
    duzina,
    sirina,
    povrsina,
    stupovi,
    visinaStupova,
    montazaVal,
    kmVal,
    ralBojaVal,
    cijenaPovrsine,
    cijenaStupova,
    cijenaMontaze,
    cijenaUdaljenosti,
    pergMotorVal,
    cijenaMotora,
    osnovica,
    pdv,
    ukupno,
    kupacImeVal,
    kupacAdresaVal,
    kupacOIBVal,
    kupacNapomenaVal
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
RAL boja: ${ralBojaVal}

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Motor: ${pergMotorVal === "sa" ? "DA (+" + cijenaMotora + " €)" : "NE"}

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}
`;

  pergResult.classList.remove("hidden");
  pergPdfBtn?.classList.remove("hidden");
}

/* ---------------------------------------------------------
   IZRAČUN – Nadstrešnica
--------------------------------------------------------- */

function calculateNadstresnica() {
  const duzina = parseFloat(nadDuzina?.value) || 0;
  const sirina = parseFloat(nadSirina?.value) || 0;
  const stupovi = parseInt(nadStupovi?.value) || 0;
  const visinaStupova = parseFloat(nadVisinaStupova?.value) || 0;

  const kmVal = parseFloat(nadKilometri?.value) || 0;
  const montazaVal = nadMontaza?.value;
  const ralBojaVal = nadRal?.value || "Nije odabrano";

  const kupacImeVal = nadKupacIme?.value.trim() || "";
  const kupacAdresaVal = nadKupacAdresa?.value.trim() || "";
  const kupacOIBVal = nadKupacOIB?.value.trim() || "";
  const kupacNapomenaVal = nadKupacNapomena?.value.trim() || "";

  if (!duzina || !sirina) return alert("Unesite dužinu i širinu.");
  if (!kupacImeVal || !kupacAdresaVal || !kupacOIBVal)
    return alert("Unesite podatke o kupcu.");

  const povrsina = duzina * sirina;

  const cijenaPovrsine = povrsina * (CijeneNadstresnica.m2 || 0);
  const cijenaStupova = stupovi * visinaStupova * (CijeneNadstresnica.stup || 0);
  const cijenaMontaze = povrsina * (CijeneMontaze[montazaVal] || 0);
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
    duzina,
    sirina,
    povrsina,
    stupovi,
    visinaStupova,
    montazaVal,
    kmVal,
    ralBojaVal,
    cijenaPovrsine,
    cijenaStupova,
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
RAL boja: ${ralBojaVal}

Tip montaže: ${montazaVal}
Udaljenost: ${kmVal} km

Osnovica: €${osnovica.toFixed(2)}
PDV 25%: €${pdv.toFixed(2)}
Ukupno: €${ukupno.toFixed(2)}

Napomena kupca: ${kupacNapomenaVal || "—"}
`;

  nadResult.classList.remove("hidden");
  nadPdfBtn?.classList.remove("hidden");
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
     TABLICA – priprema
  --------------------------------------------------------- */

  let stavkaNaslov = "";
  let tableBody = [];

  /* ---------------------------------------------------------
     OGRADA
  --------------------------------------------------------- */

  if (lastOfferData.tip === "ograda") {
    stavkaNaslov = selectedCategory === "laserske"
      ? `Laserski rezana ograda ${lastOfferData.model}`
      : `Aluminijska ograda ${lastOfferData.model}`;

    tableBody = [
      ["Opis", "Vrijednost"],
      ["Širina", lastOfferData.sirinaVal + " m"],
      ["Visina", lastOfferData.visinaVal + " m"],
      ["Površina", lastOfferData.kvadratura.toFixed(2) + " m²"],
      ["Iznos ograde", lastOfferData.iznosOgrade.toFixed(2) + " €"],
    ];

    /* ---------------- VRATA ---------------- */

    if (lastOfferData.jednokrilna?.aktivno) {
      tableBody.push(["Jednokrilna vrata – širina", lastOfferData.jednokrilna.sirina + " m"]);
      tableBody.push(["Jednokrilna vrata – visina", lastOfferData.jednokrilna.visina + " m"]);
      tableBody.push(["Jednokrilna vrata – površina", lastOfferData.jednokrilna.povrsina.toFixed(2) + " m²"]);
      tableBody.push(["Jednokrilna vrata – cijena", lastOfferData.jednokrilna.cijena.toFixed(2) + " €"]);
    }

    if (lastOfferData.dvokrilna?.aktivno) {
      tableBody.push(["Dvokrilna vrata – širina", lastOfferData.dvokrilna.sirina + " m"]);
      tableBody.push(["Dvokrilna vrata – visina", lastOfferData.dvokrilna.visina + " m"]);
      tableBody.push(["Dvokrilna vrata – površina", lastOfferData.dvokrilna.povrsina.toFixed(2) + " m²"]);
      tableBody.push(["Dvokrilna vrata – cijena", lastOfferData.dvokrilna.cijena.toFixed(2) + " €"]);
    }

    if (lastOfferData.klizna?.aktivno) {
      tableBody.push(["Klizna vrata – dužina", lastOfferData.klizna.duzina + " m"]);
      tableBody.push(["Klizna vrata – visina", lastOfferData.klizna.visina + " m"]);
      tableBody.push(["Klizna vrata – površina", lastOfferData.klizna.povrsina.toFixed(2) + " m²"]);
      tableBody.push(["Klizna vrata – cijena", lastOfferData.klizna.cijena.toFixed(2) + " €"]);
    }

    if (lastOfferData.samonosiva?.aktivno) {
      tableBody.push(["Samonosiva vrata – dužina", lastOfferData.samonosiva.duzina + " m"]);
      tableBody.push(["Samonosiva vrata – visina", lastOfferData.samonosiva.visina + " m"]);
      tableBody.push(["Samonosiva vrata – površina", lastOfferData.samonosiva.povrsina.toFixed(2) + " m²"]);
      tableBody.push(["Samonosiva vrata – cijena", lastOfferData.samonosiva.cijena.toFixed(2) + " €"]);
    }

    /* ---------------- RAL / MONTAŽA / UDALJENOST ---------------- */

    tableBody.push(["RAL boja", lastOfferData.ralBojaVal]);
    tableBody.push(["Tip montaže", lastOfferData.montazaVal]);
    tableBody.push(["Udaljenost", lastOfferData.kmVal + " km"]);
    tableBody.push(["Montaža", lastOfferData.cijenaMontaze.toFixed(2) + " €"]);
    tableBody.push(["Udaljenost (trošak)", lastOfferData.cijenaUdaljenosti.toFixed(2) + " €"]);
  }

  /* ---------------------------------------------------------
     PERGOLA
  --------------------------------------------------------- */

  if (lastOfferData.tip === "pergola") {
    stavkaNaslov = "Pergola";

    tableBody = [
      ["Opis", "Vrijednost"],
      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Cijena pergole", lastOfferData.cijenaPovrsine.toFixed(2) + " €"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],
      ["RAL boja", lastOfferData.ralBojaVal],
      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"],
      ["Cijena stupova", lastOfferData.cijenaStupova.toFixed(2) + " €"],
      ["Montaža", lastOfferData.cijenaMontaze.toFixed(2) + " €"],
      ["Udaljenost (trošak)", lastOfferData.cijenaUdaljenosti.toFixed(2) + " €"],
      ["Motor", lastOfferData.pergMotorVal === "sa" ? "DA" : "NE"],
      ["Cijena motora", lastOfferData.cijenaMotora.toFixed(2) + " €"],
    ];
  }

  /* ---------------------------------------------------------
     NADSTREŠNICA
  --------------------------------------------------------- */

  if (lastOfferData.tip === "nadstresnica") {
    stavkaNaslov = "Nadstrešnica";

    tableBody = [
      ["Opis", "Vrijednost"],
      ["Dužina", lastOfferData.duzina + " m"],
      ["Širina", lastOfferData.sirina + " m"],
      ["Površina", lastOfferData.povrsina.toFixed(2) + " m²"],
      ["Cijena nadsrešnice", lastOfferData.cijenaPovrsine.toFixed(2) + " €"],
      ["Broj stupova", lastOfferData.stupovi],
      ["Visina stupova", lastOfferData.visinaStupova + " m"],
      ["RAL boja", lastOfferData.ralBojaVal],
      ["Tip montaže", lastOfferData.montazaVal],
      ["Udaljenost", lastOfferData.kmVal + " km"],
      ["Cijena stupova", lastOfferData.cijenaStupova.toFixed(2) + " €"],
      ["Montaža", lastOfferData.cijenaMontaze.toFixed(2) + " €"],
      ["Udaljenost (trošak)", lastOfferData.cijenaUdaljenosti.toFixed(2) + " €"],
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
            ["Osnovica", lastOfferData.osnovica.toFixed(2) + " €"],
            ["PDV 25%", lastOfferData.pdv.toFixed(2) + " €"],
            ["Ukupno", lastOfferData.ukupno.toFixed(2) + " €"]
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