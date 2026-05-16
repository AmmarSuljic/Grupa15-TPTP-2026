/* ==========================================================
   TPTP Projekat - Grupa 15
   Audi BiH web stranica
   JavaScript: filtriranje, dark/light mod, forma,
   statistika i smooth scroll
   ========================================================== */


   document.addEventListener("DOMContentLoaded", function () {
    postaviKategorijeKarticama();
    podesiFiltriranjeKartica();
    podesiTamniSvijetliMod();
    podesiOdabraniModel();
    podesiTemuIzUrl();
    validacijaKontaktForme();
    podesiSmoothScroll();
    dodajDugmeNazadNaVrh();
    podesiInteraktivniSat();
});


  /* ==========================================================
   1. KATEGORIJE KARTICA NA INDEX STRANICI
 ========================================================== */

function postaviKategorijeKarticama() {
    const kartice = document.querySelectorAll(".car-card");

    if (kartice.length === 0) {
        return;
    }

    kartice.forEach(function (kartica) {
        const nazivElement = kartica.querySelector(".car-name");

        if (!nazivElement) {
            return;
        }

        const naziv = nazivElement.textContent.trim().toLowerCase();

        if (
            naziv.includes("a3") ||
            naziv.includes("a5") ||
            naziv.includes("a6") ||
            naziv.includes("a7")
        ) {
            kartica.dataset.kategorija = "sedan";
        } else if (
            naziv.includes("q3") ||
            naziv.includes("q5") ||
            naziv.includes("q7")
        ) {
            kartica.dataset.kategorija = "suv";
        } else if (
            naziv.includes("q6") ||
            naziv.includes("e-tron") ||
            naziv.includes("e tron")
        ) {
            kartica.dataset.kategorija = "electric";
        } else if (
            naziv.includes("rsq8")
        ) {
            kartica.dataset.kategorija = "sport";
        } else {
            kartica.dataset.kategorija = "ostalo";
        }
    });
}


/* ==========================================================
   2. FILTRIRANJE KARTICA BEZ RELOADA
   ========================================================== */

function podesiFiltriranjeKartica() {
    const kartice = document.querySelectorAll(".car-card");
    const sideNav = document.querySelector(".side-nav");
    const modelsContainer = document.querySelector(".models");

    if (kartice.length === 0 || !sideNav || !modelsContainer) {
        return;
    }

    const statistika = document.createElement("section");
    statistika.className = "js-statistika";
    statistika.innerHTML = `
        <p id="filterStatus">Prikazani su svi Audi modeli.</p>
        <p id="brojacModela">Broj prikazanih modela: ${kartice.length}</p>
    `;

    modelsContainer.before(statistika);

    const filterLinkovi = sideNav.querySelectorAll("a");

    filterLinkovi.forEach(function (link) {
        const tekst = link.textContent.trim().toLowerCase();

        if (
            tekst === "ponuda modela" ||
            tekst === "sedan" ||
            tekst === "suv" ||
            tekst === "sport" ||
            tekst === "električni" ||
            tekst === "elektricni"
        ) {
            link.addEventListener("click", function (event) {
                event.preventDefault();

                let kategorija = "sve";

                if (tekst === "sedan") {
                    kategorija = "sedan";
                } else if (tekst === "suv") {
                    kategorija = "suv";
                } else if (tekst === "sport") {
                    kategorija = "sport";
                } else if (tekst === "električni" || tekst === "elektricni") {
                    kategorija = "electric";
                } else {
                    kategorija = "sve";
                }

                filtrirajKartice(kategorija);
                oznaciAktivniFilter(filterLinkovi, link);
            });
        }
    });

    filtrirajKartice("sve");
}


function filtrirajKartice(kategorija) {
    const kartice = document.querySelectorAll(".car-card");
    const filterStatus = document.getElementById("filterStatus");
    const brojacModela = document.getElementById("brojacModela");

    let brojPrikazanih = 0;

    kartice.forEach(function (kartica) {
        if (kategorija === "sve" || kartica.dataset.kategorija === kategorija) {
            kartica.style.display = "block";
            brojPrikazanih++;
        } else {
            kartica.style.display = "none";
        }
    });

    if (filterStatus) {
        if (kategorija === "sve") {
            filterStatus.textContent = "Prikazani su svi Audi modeli.";
        } else if (kategorija === "sedan") {
            filterStatus.textContent = "Prikazani su limuzina i Sportback modeli.";
        } else if (kategorija === "suv") {
            filterStatus.textContent = "Prikazani su SUV modeli.";
        } else if (kategorija === "electric") {
            filterStatus.textContent = "Prikazani su električni modeli.";
        } else if (kategorija === "sport") {
            filterStatus.textContent = "Prikazani su sportski modeli.";
        }
    }

    if (brojacModela) {
        brojacModela.textContent = "Broj prikazanih modela: " + brojPrikazanih;
    }
}


function oznaciAktivniFilter(linkovi, aktivniLink) {
    linkovi.forEach(function (link) {
        link.classList.remove("active-filter");
    });

    aktivniLink.classList.add("active-filter");
}


/* ==========================================================
   3. TAMNI / SVIJETLI MOD + LOCALSTORAGE
   ========================================================== */

function podesiTamniSvijetliMod() {
    const sacuvanaTema = localStorage.getItem("audiTema");

    if (sacuvanaTema === "tamna") {
        document.body.classList.add("dark-mode-js");
    }

    const dugme = document.createElement("button");
    dugme.id = "themeToggle";
    dugme.type = "button";

    if (document.body.classList.contains("dark-mode-js")) {
        dugme.textContent = "Svijetli mod";
    } else {
        dugme.textContent = "Tamni mod";
    }

    const header = document.querySelector("header");

    if (header) {
        header.appendChild(dugme);
    } else {
        document.body.prepend(dugme);
    }

    dugme.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode-js");

        if (document.body.classList.contains("dark-mode-js")) {
            localStorage.setItem("audiTema", "tamna");
            dugme.textContent = "Svijetli mod";
        } else {
            localStorage.setItem("audiTema", "svijetla");
            dugme.textContent = "Tamni mod";
        }
    });
}


/* ==========================================================
   4. ODABRANI MODEL IZ URL-a
   Primjer: kontakt.html?model=Audi A3
   ========================================================== */

function podesiOdabraniModel() {
    const selectedModel = document.getElementById("selectedModel");
    const modelSelect = document.getElementById("modelSelect");

    if (!selectedModel || !modelSelect) {
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const modelIzUrl = urlParams.get("model");

    if (modelIzUrl) {
        selectedModel.textContent = modelIzUrl;
        modelSelect.value = modelIzUrl;
    }

    modelSelect.addEventListener("change", function () {
        if (modelSelect.value === "") {
            selectedModel.textContent = "Opšti upit";
        } else {
            selectedModel.textContent = modelSelect.value;
        }
    });
}