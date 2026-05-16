/* =============================================
   TPTP Projekat - Grupa 15
   Audi BiH web stranica
   JavaScript: Andrej Hajdukov
   ============================================= */


/* =============================================
   1. TAMNI / SVJETLI MOD (Dark Mode Toggle)
   ============================================= */

function kreirajTamniModDugme() {
  const header = document.querySelector('header');
  if (!header) return;

  const dugme = document.createElement('button');
  dugme.id = 'darkModeToggle';
  dugme.setAttribute('aria-label', 'Prebaci tamni/svjetli mod');
  dugme.textContent = '🌙';

  dugme.style.cssText = `
    padding: 5px 9px;
    border: 2px solid #BB0A21;
    background: transparent;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.2s;
    vertical-align: middle;
    margin-left: 16px;
  `;

  dugme.addEventListener('mouseenter', () => {
    dugme.style.background = '#BB0A21';
  });
  dugme.addEventListener('mouseleave', () => {
    dugme.style.background = 'transparent';
  });

  dugme.addEventListener('click', prebacTamniMod);

  
  const menuUl = header.querySelector('nav.menu > ul');
  if (menuUl) {
    const li = document.createElement('li');
    li.style.cssText = 'display: flex; align-items: center; list-style: none;';
    li.appendChild(dugme);
    menuUl.appendChild(li);
  } else {
    
    const navNav = header.querySelector('nav.nav');
    if (navNav) {
      navNav.appendChild(dugme);
    } else {
      header.appendChild(dugme);
    }
  }
}

function prebacTamniMod() {
  const dugme = document.getElementById('darkModeToggle');
  const sacuvano = localStorage.getItem('darkMode');

  
  if (document.body.classList.contains('dark-mode-manual')) {
    document.body.classList.remove('dark-mode-manual');
    document.body.classList.add('light-mode-manual');
    localStorage.setItem('darkMode', 'svjetli');
    if (dugme) dugme.textContent = '☀️';
  }
 
  else if (document.body.classList.contains('light-mode-manual')) {
    document.body.classList.remove('light-mode-manual');
    document.body.classList.add('dark-mode-manual');
    localStorage.setItem('darkMode', 'tamni');
    if (dugme) dugme.textContent = '🌙';
  }
  
  else {
    const sistemTamni = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (sistemTamni) {
      
      document.body.classList.add('light-mode-manual');
      localStorage.setItem('darkMode', 'svjetli');
      if (dugme) dugme.textContent = '☀️';
    } else {
      
      document.body.classList.add('dark-mode-manual');
      localStorage.setItem('darkMode', 'tamni');
      if (dugme) dugme.textContent = '🌙';
    }
  }
}

function ucitajTamniMod() {
  const sacuvano = localStorage.getItem('darkMode');
  const dugme = document.getElementById('darkModeToggle');

  if (sacuvano === 'tamni') {
    document.body.classList.add('dark-mode-manual');
    if (dugme) dugme.textContent = '🌙';
  } else if (sacuvano === 'svjetli') {
    document.body.classList.add('light-mode-manual');
    if (dugme) dugme.textContent = '☀️';
  } else {
    // Bez sačuvane preference — postavi ikonu prema sistemskom modu
    const sistemTamni = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dugme) dugme.textContent = sistemTamni ? '☀️' : '🌙';
  }
}

function dodajTamniModStilove() {
  const stil = document.createElement('style');
  stil.textContent = `

    /* ── FORSIRANI SVJETLI MOD (override sistemskog dark) ── */
    body.light-mode-manual {
      background-color: #ebe8e8 !important;
      color: #111111 !important;
    }
    body.light-mode-manual header,
    body.light-mode-manual .header {
      background-color: #ffffff !important;
    }
    body.light-mode-manual .logo {
      filter: none !important;
    }
    body.light-mode-manual .car-card {
      background-color: #ffffff !important;
      color: #111111 !important;
    }
    body.light-mode-manual .car-name {
      color: #111111 !important;
    }
    body.light-mode-manual .spec-table tbody tr:nth-child(even) {
      background-color: #f5f5f5 !important;
    }
    body.light-mode-manual .spec-table td {
      border-bottom-color: #dddddd !important;
      color: #111111 !important;
    }
    body.light-mode-manual aside {
      background-color: #f0f0f0 !important;
    }
    body.light-mode-manual .newsletter {
      background-color: #ebe8e8 !important;
    }
    body.light-mode-manual .opismodela {
      background-color: #ffffff !important;
    }
    body.light-mode-manual .opismodela h3,
    body.light-mode-manual .opismodela p {
      color: #111111 !important;
    }
    body.light-mode-manual .dropdown-menu {
      background-color: #ffffff !important;
    }
    body.light-mode-manual .dropdown-menu li a {
      color: #111111 !important;
    }
    body.light-mode-manual .form-group input,
    body.light-mode-manual .form-group select,
    body.light-mode-manual .form-group textarea {
      background-color: #ffffff !important;
      color: #111111 !important;
      border-color: #dddddd !important;
    }
    body.light-mode-manual .selected-model-box {
      background-color: #ffffff !important;
      color: #111111 !important;
    }
    body.light-mode-manual .config-box {
      background-color: #ffffff !important;
    }
    body.light-mode-manual .config-box h3 {
      color: #000000 !important;
    }
    body.light-mode-manual .config-btn {
      color: #646464 !important;
    }
    body.light-mode-manual .ispodtabele {
      background-color: #f5f5f5 !important;
      color: #555555 !important;
    }
    body.light-mode-manual p,
    body.light-mode-manual h1,
    body.light-mode-manual h2,
    body.light-mode-manual h3,
    body.light-mode-manual h4,
    body.light-mode-manual span,
    body.light-mode-manual li,
    body.light-mode-manual td,
    body.light-mode-manual label {
      color: #111111 !important;
    }
    body.light-mode-manual .tech-box {
      background-color: #646464 !important;
    }
    body.light-mode-manual .tech-box p {
      color: #d3d1d1 !important;
    }
    body.light-mode-manual .github-icon {
      filter: none !important;
    }
    body.light-mode-manual .uvod-modeli {
      background-color: #d3d1d1 !important;
    }
    body.light-mode-manual .glavni-naslov {
      color: #000000 !important;
    }
    body.light-mode-manual .hero-btn {
      background-color: #111111 !important;
      color: #ffffff !important;
    }
    body.light-mode-manual .side-nav {
      background-color: #111111 !important;
    }
    body.light-mode-manual .modern-info,
    body.light-mode-manual .uvodnastrana,
    body.light-mode-manual .tech-section {
      background-color: #ebe8e8 !important;
    }
    body.light-mode-manual .saloni li a {
      background-color: #646464 !important;
      color: #ffffff !important;
    }
    body.light-mode-manual .header {
      background-color: #ffffff !important;
      border-bottom-color: #BB0A21 !important;
    }
    body.light-mode-manual .title,
    body.light-mode-manual .nav a {
      color: #111111 !important;
    }

    /* ── FORSIRANI TAMNI MOD ── */
    body.dark-mode-manual {
      background-color: #1a1a1a !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual header,
    body.dark-mode-manual .header {
      background-color: #2a2a2a !important;
    }
    body.dark-mode-manual .logo {
      filter: invert(1) !important;
    }
    body.dark-mode-manual .car-card {
      background-color: #2a2a2a !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual .car-name {
      color: #ffffff !important;
    }
    body.dark-mode-manual .spec-table tbody tr:nth-child(even) {
      background-color: #2a2a2a !important;
    }
    body.dark-mode-manual .spec-table td {
      border-bottom-color: #333333 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual .spec-table th {
      background-color: #BB0A21 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual aside {
      background-color: #1a1a1a !important;
    }
    body.dark-mode-manual .newsletter {
      background-color: #1a1a1a !important;
    }
    body.dark-mode-manual .opismodela {
      background-color: #161616 !important;
    }
    body.dark-mode-manual .opismodela h3,
    body.dark-mode-manual .opismodela p {
      color: #ffffff !important;
    }
    body.dark-mode-manual .dropdown-menu {
      background-color: #2a2a2a !important;
    }
    body.dark-mode-manual .dropdown-menu li a {
      color: #ffffff !important;
    }
    body.dark-mode-manual .form-group input,
    body.dark-mode-manual .form-group select,
    body.dark-mode-manual .form-group textarea {
      background-color: #646464 !important;
      color: #ffffff !important;
      border-color: #444444 !important;
    }
    body.dark-mode-manual .selected-model-box {
      background-color: #646464 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual .config-box {
      background-color: #111111 !important;
    }
    body.dark-mode-manual .config-box h3,
    body.dark-mode-manual .config-btn {
      color: #ffffff !important;
    }
    body.dark-mode-manual .ispodtabele {
      background-color: #3a3939 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual p,
    body.dark-mode-manual h1,
    body.dark-mode-manual h2,
    body.dark-mode-manual h3,
    body.dark-mode-manual h4,
    body.dark-mode-manual span,
    body.dark-mode-manual li,
    body.dark-mode-manual td,
    body.dark-mode-manual label {
      color: #ffffff !important;
    }
    body.dark-mode-manual .section-tag,
    body.dark-mode-manual .malinaslov,
    body.dark-mode-manual .malitekstmodel {
      color: #BB0A21 !important;
    }
    body.dark-mode-manual .tech-box {
      background-color: #111111 !important;
    }
    body.dark-mode-manual .tech-box p {
      color: #d3d1d1 !important;
    }
    body.dark-mode-manual .tech-box:hover p {
      color: #ffffff !important;
    }
    body.dark-mode-manual .github-icon {
      filter: invert(1) !important;
    }
    body.dark-mode-manual .uvod-modeli {
      background-color: #111111 !important;
    }
    body.dark-mode-manual .glavni-naslov {
      color: #ffffff !important;
    }
    body.dark-mode-manual .opis-modela {
      color: #aaaaaa !important;
    }
    body.dark-mode-manual .hero-btn {
      background-color: #111111 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual #darkModeToggle {
      color: #ffffff !important;
    }
    body.dark-mode-manual .gallery img {
      background-color: #3a3939 !important;
    }
    body.dark-mode-manual #contactForm button {
      color: #ffffff !important;
    }
    body.dark-mode-manual .side-nav {
      background-color: #000000 !important;
    }
    body.dark-mode-manual .modern-info,
    body.dark-mode-manual .uvodnastrana,
    body.dark-mode-manual .tech-section {
      background-color: #1a1a1a !important;
    }
    body.dark-mode-manual .tekstuvoda,
    body.dark-mode-manual .tekstvideo,
    body.dark-mode-manual .tekstmape {
      color: #aaaaaa !important;
    }
    body.dark-mode-manual .footer-title,
    body.dark-mode-manual .team-label,
    body.dark-mode-manual .footer-links a,
    body.dark-mode-manual .member a {
      color: #aaaaaa !important;
    }
    body.dark-mode-manual .footer-links a:hover,
    body.dark-mode-manual .member a:hover {
      color: #BB0A21 !important;
    }
    body.dark-mode-manual .saloni li a {
      background-color: #111111 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual .newsletter input[type="email"] {
      background-color: #646464 !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual #leasingKalkulator {
      background: #111111 !important;
    }
    body.dark-mode-manual #leasingKalkulator > div {
      background: #2a2a2a !important;
    }
    body.dark-mode-manual #leasingKalkulator input,
    body.dark-mode-manual #leasingKalkulator select {
      background-color: #3a3939 !important;
      color: #ffffff !important;
      border-color: #555555 !important;
    }
    body.dark-mode-manual #kalkRezultat {
      background: #1a1a1a !important;
      color: #ffffff !important;
    }
    body.dark-mode-manual #audiStatistika {
      background: #000000 !important;
    }
    body.dark-mode-manual .model-section {
      border-bottom-color: #333333 !important;
    }
    body.dark-mode-manual .nav a {
      color: #ffffff !important;
      border-color: #444444 !important;
    }
    body.dark-mode-manual .nav a:hover {
      background-color: #BB0A21 !important;
      border-color: #BB0A21 !important;
    }
    body.dark-mode-manual .list-section h2 {
      color: #ffffff !important;
    }
    body.dark-mode-manual .model-list > li {
      color: #ffffff !important;
    }
    body.dark-mode-manual .model-list > li > ul > li a {
      color: #aaaaaa !important;
    }
    body.dark-mode-manual .overlay-tekst p {
      color: #aaaaaa !important;
    }
    body.dark-mode-manual .uvod-modeli .glavni-naslov {
      color: #ffffff !important;
    }
    body.dark-mode-manual .title {
      color: #ffffff !important;
    }
  `;
  document.head.appendChild(stil);
}


/* =============================================
   2. FILTRIRANJE KARTICA (index.html)
   ============================================= */

const kategorijeModela = {
  'sve':       ['audi-a3','audi-a5','audi-q5','audi-a6','audi-e-tron','audi-q3','audi-RSQ8','audi-Q7','audi-Q6','audi-A7'],
  'sedan':     ['audi-a3','audi-a5','audi-a6','audi-A7'],
  'suv':       ['audi-q5','audi-q3','audi-Q7'],
  'electric':  ['audi-e-tron','audi-Q6'],
  'sport':     ['audi-RSQ8']
};

function kreirajFilterDugmad() {
  const main = document.querySelector('main.models');
  if (!main) return;

  const filterWrapper = document.createElement('div');
  filterWrapper.id = 'filterKategorije';
  filterWrapper.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding: 20px 30px 10px 30px;
  `;

  const dugmad = [
    { vrijednost: 'sve',      labela: 'Svi modeli' },
    { vrijednost: 'sedan',    labela: 'Sedan / Sportback' },
    { vrijednost: 'suv',      labela: 'SUV' },
    { vrijednost: 'electric', labela: 'Električni' },
    { vrijednost: 'sport',    labela: 'Sportski' }
  ];

  dugmad.forEach(({ vrijednost, labela }) => {
    const btn = document.createElement('button');
    btn.textContent = labela;
    btn.dataset.filter = vrijednost;

    btn.style.cssText = `
      padding: 8px 20px;
      border: 2px solid #BB0A21;
      background: ${vrijednost === 'sve' ? '#BB0A21' : '#111111'};
      color: #ffffff;
      font-family: inherit;
      font-size: 13px;
      cursor: pointer;
      border-radius: 20px;
      transition: background 0.2s, color 0.2s;
    `;

    btn.addEventListener('mouseenter', () => {
      if (btn.dataset.filter !== filterWrapper.dataset.aktivan) {
        btn.style.background = '#880015';
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (btn.dataset.filter !== filterWrapper.dataset.aktivan) {
        btn.style.background = '#111111';
      }
    });

    btn.addEventListener('click', () => filtrirajKartice(vrijednost, filterWrapper));
    filterWrapper.appendChild(btn);
  });

  filterWrapper.dataset.aktivan = 'sve';
  main.parentNode.insertBefore(filterWrapper, main);
}

function filtrirajKartice(kategorija, filterWrapper) {
  const kartice = document.querySelectorAll('main.models .car-card');
  const vidljiviIds = kategorijeModela[kategorija] || [];

  kartice.forEach(kartica => {
    const idKartice = kartica.id;
    const treba = kategorija === 'sve' || vidljiviIds.includes(idKartice);

    kartica.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    if (treba) {
      kartica.style.display = 'block';
      setTimeout(() => {
        kartica.style.opacity = '1';
        kartica.style.transform = 'translateY(0)';
      }, 10);
    } else {
      kartica.style.opacity = '0';
      kartica.style.transform = 'translateY(10px)';
      setTimeout(() => { kartica.style.display = 'none'; }, 300);
    }
  });

  filterWrapper.dataset.aktivan = kategorija;

  filterWrapper.querySelectorAll('button').forEach(btn => {
    const aktivan = btn.dataset.filter === kategorija;
    btn.style.background = aktivan ? '#BB0A21' : '#111111';
    btn.style.color = '#ffffff';
  });
}


/* =============================================
   3. VALIDACIJA FORME (kontakt.html)
   ============================================= */

const emailRegex = /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i;
const telefonRegex = /^\+?[\d\s\-]{7,15}$/;

function inicijalizujFormu() {
  const forma = document.getElementById('contactForm');
  if (!forma) return;

  forma.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validirajFormu()) {
      prikaziUspjesnuPoruku();
    }
  });

  forma.addEventListener('reset', function () {
    setTimeout(ocistiSveGreske, 10);
    const uspjesna = document.getElementById('successMessage');
    if (uspjesna) uspjesna.textContent = '';
  });

  ucitajParametreIzURL();
}

function ucitajParametreIzURL() {
  const params = new URLSearchParams(window.location.search);

  const model = params.get('model');
  if (model) {
    const selectModel = document.getElementById('modelSelect');
    if (selectModel) {
      Array.from(selectModel.options).forEach(opcija => {
        if (opcija.value === model) opcija.selected = true;
      });
      azurirajOdabraniModel(model);
    }
  }

  const tema = params.get('tema');
  if (tema) {
    const selectTema = document.getElementById('tema');
    if (selectTema) {
      Array.from(selectTema.options).forEach(opcija => {
        if (opcija.value === tema) opcija.selected = true;
      });
    }
  }
}

function azurirajOdabraniModel(model) {
  const prikaz = document.getElementById('selectedModel');
  if (prikaz) {
    prikaz.textContent = model || 'Opšti upit';
  }
}

function inicijalizujModelSelect() {
  const selectModel = document.getElementById('modelSelect');
  if (!selectModel) return;

  selectModel.addEventListener('change', function () {
    azurirajOdabraniModel(this.value || 'Opšti upit');
  });
}

function prikaziGresku(idPolja, poruka) {
  const polje = document.getElementById(idPolja);
  const greska = document.getElementById(idPolja + 'Error');

  if (polje) {
    polje.style.borderColor = '#BB0A21';
    polje.style.boxShadow = '0 0 0 2px rgba(187,10,33,0.2)';
  }
  if (greska) {
    greska.textContent = poruka;
    greska.style.color = '#BB0A21';
    greska.style.fontSize = '12px';
    greska.style.marginTop = '4px';
    greska.style.display = 'block';
  }
}

function ukloniGresku(idPolja) {
  const polje = document.getElementById(idPolja);
  const greska = document.getElementById(idPolja + 'Error');

  if (polje) {
    polje.style.borderColor = '';
    polje.style.boxShadow = '';
  }
  if (greska) {
    greska.textContent = '';
    greska.style.display = 'none';
  }
}

function ocistiSveGreske() {
  ['ime', 'prezime', 'email', 'telefon', 'tema', 'poruka'].forEach(id => {
    ukloniGresku(id);
  });
}

function validirajFormu() {
  let ispravno = true;
  ocistiSveGreske();

  const ime = document.getElementById('ime')?.value.trim() || '';
  const prezime = document.getElementById('prezime')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const telefon = document.getElementById('telefon')?.value.trim() || '';
  const tema = document.getElementById('tema')?.value || '';
  const poruka = document.getElementById('poruka')?.value.trim() || '';

  if (ime.length < 2) {
    prikaziGresku('ime', 'Ime mora imati najmanje 2 znaka.');
    ispravno = false;
  }
  if (prezime.length < 2) {
    prikaziGresku('prezime', 'Prezime mora imati najmanje 2 znaka.');
    ispravno = false;
  }
  if (!emailRegex.test(email)) {
    prikaziGresku('email', 'Unesite ispravan email (npr. ime@domena.com).');
    ispravno = false;
  }
  if (!telefonRegex.test(telefon)) {
    prikaziGresku('telefon', 'Unesite ispravan broj telefona (samo cifre, razmaci, crtice).');
    ispravno = false;
  }
  if (!tema) {
    prikaziGresku('tema', 'Molimo odaberite temu upita.');
    ispravno = false;
  }
  if (poruka.length < 10) {
    prikaziGresku('poruka', 'Poruka mora imati najmanje 10 znakova.');
    ispravno = false;
  }

  return ispravno;
}

function prikaziUspjesnuPoruku() {
  const ime = document.getElementById('ime')?.value.trim() || 'korisniče';
  const model = document.getElementById('modelSelect')?.value || '';
  const uspjesna = document.getElementById('successMessage');

  if (uspjesna) {
    const modelTekst = model ? ` o modelu ${model}` : '';
    uspjesna.textContent = `Hvala, ${ime}! Vaš upit${modelTekst} je uspješno poslan. Kontaktiraćemo vas uskoro.`;
    uspjesna.style.color = 'green';
    uspjesna.style.fontSize = '14px';
    uspjesna.style.marginTop = '16px';
    uspjesna.style.padding = '12px';
    uspjesna.style.background = 'rgba(0,128,0,0.1)';
    uspjesna.style.borderLeft = '4px solid green';
    uspjesna.style.borderRadius = '4px';

    uspjesna.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      document.getElementById('contactForm')?.reset();
      ocistiSveGreske();
      uspjesna.textContent = '';
      uspjesna.style.background = '';
      uspjesna.style.borderLeft = '';
    }, 5000);
  }
}


/* =============================================
   4. SMOOTH SCROLL
   ============================================= */

function inicijalizujSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const cilj = document.querySelector(href);
      if (cilj) {
        e.preventDefault();
        const header = document.querySelector('header, .header');
        const offsetHeader = header ? header.offsetHeight + 16 : 80;
        const pozicija = cilj.getBoundingClientRect().top + window.pageYOffset - offsetHeader;
        window.scrollTo({ top: pozicija, behavior: 'smooth' });
      }
    });
  });
}


/* =============================================
   5. INTERAKTIVNI ELEMENT — BROJAČ / KALKULATOR
   ============================================= */

function animirajBrojac(element, cilj, trajanje) {
  let pocetak = null;
  const start = 0;

  function korak(timestamp) {
    if (!pocetak) pocetak = timestamp;
    const proteklo = timestamp - pocetak;
    const napredak = Math.min(proteklo / trajanje, 1);

    const eased = napredak < 0.5
      ? 2 * napredak * napredak
      : -1 + (4 - 2 * napredak) * napredak;

    element.textContent = Math.floor(start + (cilj - start) * eased);

    if (napredak < 1) {
      requestAnimationFrame(korak);
    } else {
      element.textContent = cilj;
    }
  }

  requestAnimationFrame(korak);
}

function kreirajStatinskuSekciju() {
  const kartice = document.querySelectorAll('main.models .car-card');
  if (!kartice.length) return;

  const ukupno = kartice.length;
  const suv = kategorijeModela['suv'].length;
  const elektricni = kategorijeModela['electric'].length;

  const sekcija = document.createElement('section');
  sekcija.id = 'audiStatistika';
  sekcija.style.cssText = `
    background: #111111;
    color: #ffffff;
    padding: 48px 40px;
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
    text-align: center;
  `;

  const podaci = [
    { broj: ukupno,     labela: 'Audi modela' },
    { broj: suv,        labela: 'SUV modela' },
    { broj: elektricni, labela: 'Električna vozila' },
    { broj: 5,          labela: 'Prodajnih salona' }
  ];

  podaci.forEach(({ broj, labela }) => {
    const item = document.createElement('div');
    item.style.cssText = 'min-width: 120px;';

    const brojEl = document.createElement('div');
    brojEl.style.cssText = `
      font-size: 48px;
      font-weight: bold;
      color: #BB0A21;
      line-height: 1;
      margin-bottom: 8px;
    `;
    brojEl.textContent = '0';

    const labelaEl = document.createElement('div');
    labelaEl.style.cssText = `
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #aaaaaa;
    `;
    labelaEl.textContent = labela;

    item.appendChild(brojEl);
    item.appendChild(labelaEl);
    sekcija.appendChild(item);

    const observer = new IntersectionObserver((unosi) => {
      if (unosi[0].isIntersecting) {
        animirajBrojac(brojEl, broj, 1500);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(sekcija);
  });

  const techSekcija = document.querySelector('.tech-section');
  if (techSekcija) {
    techSekcija.parentNode.insertBefore(sekcija, techSekcija);
  }
}

function kreirajKalkulator() {
  const main = document.querySelector('main.models');
  if (!main) return;

  const sekcija = document.createElement('section');
  sekcija.id = 'leasingKalkulator';
  sekcija.style.cssText = `
    padding: 60px 40px;
    background: #f5f5f5;
    text-align: center;
  `;

  sekcija.innerHTML = `
    <p style="font-size:13px; letter-spacing:0.1em; text-transform:uppercase; color:#888888; margin-bottom:12px;">
      Audi alat
    </p>
    <h2 style="font-size:28px; margin-bottom:8px; color:#111111;">Okvirni kalkulator leasinga</h2>
    <p style="font-size:14px; color:#888888; margin-bottom:32px; max-width:600px; margin-left:auto; margin-right:auto;">
      Unesite cijenu vozila i period otplate da vidite okvirnu mjesečnu ratu.
      (Informativan izračun, ne predstavlja ponudu.)
    </p>

    <div style="
      display: inline-flex;
      flex-direction: column;
      gap: 16px;
      min-width: 320px;
      max-width: 480px;
      width: 100%;
      background: #ffffff;
      padding: 32px;
      border-left: 5px solid #BB0A21;
      text-align: left;
    ">
      <label style="font-size:13px; font-weight:500; color:#111111;" for="kalkCijena">Cijena vozila (KM)</label>
      <input id="kalkCijena" type="number" placeholder="npr. 45000" min="5000" max="500000"
        style="padding:10px 12px; border:1px solid #dddddd; border-radius:6px; font-size:14px; font-family:inherit; color:#111111; background:#ffffff;">

      <label style="font-size:13px; font-weight:500; color:#111111;" for="kalkPeriod">Period otplate (mjeseci)</label>
      <select id="kalkPeriod" style="padding:10px 12px; border:1px solid #dddddd; border-radius:6px; font-size:14px; font-family:inherit; color:#111111; background:#ffffff;">
        <option value="24">24 mjeseca (2 godine)</option>
        <option value="36" selected>36 mjeseci (3 godine)</option>
        <option value="48">48 mjeseci (4 godine)</option>
        <option value="60">60 mjeseci (5 godina)</option>
      </select>

      <label style="font-size:13px; font-weight:500; color:#111111;" for="kalkUcescePosto">Učešće (%)</label>
      <input id="kalkUcescePosto" type="range" min="10" max="40" value="20" step="5"
        style="accent-color: #BB0A21;">
      <span id="kalkUcesceLabel" style="font-size:13px; color:#888888;">Učešće: 20%</span>

      <button id="kalkDugme" style="
        padding: 12px 24px;
        background: #BB0A21;
        color: #ffffff;
        border: none;
        font-family: inherit;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
      ">Izračunaj</button>

      <div id="kalkRezultat" style="
        padding: 16px;
        background: #f5f5f5;
        border-left: 4px solid #BB0A21;
        display: none;
        font-size: 14px;
        color: #111111;
      "></div>
    </div>
  `;

  const newsletter = document.querySelector('.newsletter');
  if (newsletter) {
    newsletter.parentNode.insertBefore(sekcija, newsletter);
  }

  const slider = document.getElementById('kalkUcescePosto');
  const ucesceLabel = document.getElementById('kalkUcesceLabel');
  if (slider && ucesceLabel) {
    slider.addEventListener('input', () => {
      ucesceLabel.textContent = `Učešće: ${slider.value}%`;
    });
  }

  const dugme = document.getElementById('kalkDugme');
  if (dugme) {
    dugme.addEventListener('click', izracunajLeasing);
    dugme.addEventListener('mouseenter', () => dugme.style.background = '#880015');
    dugme.addEventListener('mouseleave', () => dugme.style.background = '#BB0A21');
  }
}

function izracunajLeasing() {
  const cijena = parseFloat(document.getElementById('kalkCijena')?.value) || 0;
  const period = parseInt(document.getElementById('kalkPeriod')?.value) || 36;
  const ucescePosto = parseInt(document.getElementById('kalkUcescePosto')?.value) || 20;
  const rezultat = document.getElementById('kalkRezultat');

  if (!rezultat) return;

  if (cijena < 5000) {
    rezultat.style.display = 'block';
    rezultat.style.borderLeftColor = '#BB0A21';
    rezultat.innerHTML = '<strong>Unesite cijenu vozila veću od 5.000 KM.</strong>';
    return;
  }

  const ucesceKM = cijena * (ucescePosto / 100);
  const iznos = cijena - ucesceKM;
  const godisnjaKamata = 0.06;
  const mjKamata = godisnjaKamata / 12;
  let mjRata;

  if (mjKamata > 0) {
    const faktor = Math.pow(1 + mjKamata, period);
    mjRata = iznos * (mjKamata * faktor) / (faktor - 1);
  } else {
    mjRata = iznos / period;
  }

  rezultat.style.display = 'block';
  rezultat.style.borderLeftColor = 'green';
  rezultat.innerHTML = `
    <strong>Rezultat izračuna:</strong><br><br>
    Cijena vozila: <strong>${cijena.toLocaleString('bs-BA')} KM</strong><br>
    Učešće (${ucescePosto}%): <strong>${ucesceKM.toLocaleString('bs-BA', {maximumFractionDigits: 0})} KM</strong><br>
    Iznos finansiranja: <strong>${iznos.toLocaleString('bs-BA', {maximumFractionDigits: 0})} KM</strong><br>
    Period: <strong>${period} mjeseci</strong><br><br>
    <span style="font-size:18px; color:#BB0A21;">
      Okvirna rata: <strong>~${mjRata.toLocaleString('bs-BA', {maximumFractionDigits: 0})} KM/mj.</strong>
    </span><br><br>
    <small style="color:#888;">*Informativan izračun. Stvarne rate zavise od uslova finansiranja.</small>
  `;
}


/* =============================================
   6. NEWSLETTER VALIDACIJA
   ============================================= */

function inicijalizujNewsletter() {
  const forma = document.querySelector('.newsletter form');
  if (!forma) return;

  forma.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailPolje = document.getElementById('email');
    if (!emailPolje) return;

    const vrijed = emailPolje.value.trim();

    if (!emailRegex.test(vrijed)) {
      emailPolje.style.borderColor = '#BB0A21';
      emailPolje.title = 'Unesite ispravan email.';

      emailPolje.style.animation = 'none';
      void emailPolje.offsetWidth;
      emailPolje.style.animation = 'shake 0.4s ease';
      return;
    }

    emailPolje.style.borderColor = 'green';
    emailPolje.value = '';

    const potvrda = document.createElement('p');
    potvrda.textContent = 'Uspješno ste se prijavili na newsletter!';
    potvrda.style.cssText = 'color: green; font-size:14px; margin-top:8px;';
    forma.appendChild(potvrda);
    setTimeout(() => potvrda.remove(), 3000);
  });

  const shakeStil = document.createElement('style');
  shakeStil.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-6px); }
      80%       { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(shakeStil);
}


/* =============================================
   7. INICIJALIZACIJA
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  dodajTamniModStilove();
  kreirajTamniModDugme();
  ucitajTamniMod();
  inicijalizujSmoothScroll();

  if (document.querySelector('main.models')) {
    kreirajFilterDugmad();
    kreirajStatinskuSekciju();
    kreirajKalkulator();
    inicijalizujNewsletter();
  }

  if (document.getElementById('contactForm')) {
    inicijalizujFormu();
    inicijalizujModelSelect();
  }
inicijalizujCookieBanner();
});

/* =============================================
   8. COOKIE BANNER
============================================= */

function inicijalizujCookieBanner() {

    const banner = document.getElementById("cookieBanner");

    if (!banner) return;

    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    const consent = localStorage.getItem("cookieConsent");

    if (consent === "accepted" || consent === "declined") {

        banner.style.display = "none";

        return;
    }

    banner.style.display = "flex";

    
    if (acceptBtn) {

        acceptBtn.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.setItem("cookieConsent", "accepted");

            banner.style.transition = "opacity 0.3s ease";

            banner.style.opacity = "0";

            setTimeout(function () {

                banner.style.display = "none";

            }, 300);

        });

    }

    if (declineBtn) {

        declineBtn.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.setItem("cookieConsent", "declined");

            location.reload();

        });

    }

}