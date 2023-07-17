'use strict';
import { nacistZLocalStorage, ulozDoLocalStorage } from './obsluhaUloziste.js';

export class RegPojistence {
    constructor() {
        this.idNum = 100;

        this.inputJmeno = document.getElementById('inputJmeno');
        this.inputPrijmeni = document.getElementById('inputPrijmeni');
        this.inputTelefon = document.getElementById('inputTel');
        this.inputVek = document.getElementById('inputVek');
        this.sortColumn = 'idNum';
        this.vyplnenaPole = false;
        this.firstRun = true;
        this.sortTabulku = true;
    }

    // localStorage - ulozeni a nacteni pojistencu
    nacistPriStartu() {
        window.onload = () => {
            let pojistenci = nacistZLocalStorage();
            pojistenci = pojistenci.map(pojistenec => {
                pojistenec.idNum = Number(pojistenec.idNum);
                return pojistenec;
            });
            if (pojistenci.length > 0) {
                this.generatorTabulky();
            }
        }
    }
    // vymaze obsah inputu po ulozeni
    vymazatInputPole() {
        this.inputJmeno.value = '';
        this.inputPrijmeni.value = '';
        this.inputVek.value = '';
        this.inputTelefon.value = '';
    }

    smazPojistence(idNum) {
        let pojistenci = nacistZLocalStorage();
        pojistenci = pojistenci.filter(pojistenec => {
            return pojistenec.idNum !== idNum;
        });
        if (confirm('Opravdu chcete smazat?')) {
            ulozDoLocalStorage(pojistenci);
            this.generatorTabulky();
        }
    }

    // vytvoreni tlacitka pro smazani pojistence
    tlacitkoSmazat(idNum) {
        const button = document.createElement('button');
        button.textContent = 'Smaž';
        button.classList.add('btn-smazat');
        button.addEventListener('click', () => {
            this.smazPojistence(idNum);
        });
        return button;


    }

    tlacitkoEdit(idNum) {
        const button = document.createElement('button');
        button.classList.add('btn-edit');
        button.textContent = 'Edituj';
        button.addEventListener('click', () => {
            window.location.href = `detailPojistence.html?idNum=${idNum}`;
        });
        return button;
    }

    tlacitkoTisk() {
        const btnTisk = document.getElementById('btn-print');
        btnTisk.addEventListener('click', this.tiskTabulky.bind(this));
    }

    tiskTabulky() {
        const divToPrint = document.getElementById('table');
        const htmlToPrint = `
          <style type="text/css">
            table {
              border-collapse: collapse;
            }
            table th,
            table td {
              border: 1px solid #000;
              padding: 0.5em;
            }
            table td:last-child {
              display: none;
            }
          </style>
          ${divToPrint.outerHTML}
        `;
        const newWin = window.open('', '_blank');
        newWin.document.write(htmlToPrint);
        newWin.document.close();
        newWin.print();
        newWin.close();
    }
    /*funkce na trideni tabulky*/
    sortByIdNum(pojistenci) {
        return pojistenci.sort((a, b) => {
            if (this.sortTabulku) {
                return a.idNum - b.idNum;
            } else {
                return b.idNum - a.idNum;
            }
        });
    }

    sortByPrijmeni(pojistenci) {
        return pojistenci.sort((a, b) => {
            if (this.sortTabulku) {
                return a.prijmeni.localeCompare(b.prijmeni);
            } else {
                return b.prijmeni.localeCompare(a.prijmeni);
            }
        });
    }
    sortByTelefon(pojistenci) {
        return pojistenci.sort((a, b) => {
            if (this.sortTabulku) {
                return a.tel - b.tel;
            } else {
                return b.tel - a.tel;
            }
        });
    }

    sortByVek(pojistenci) {
        return pojistenci.sort((a, b) => {
            if (this.sortTabulku) {
                return a.vek - b.vek;
            } else {
                return b.vek - a.vek;
            }
        });
    }
    /*KONEC funkce na trideni tabulky*/

    // zobrazeni pojistencu v tabulce
    generatorTabulky() {
        let pojistenci = nacistZLocalStorage();
        if (this.sortColumn === 'idNum') {
            pojistenci = this.sortByIdNum(pojistenci);
        } else if (this.sortColumn === 'jmeno a prijmeni') {
            pojistenci = this.sortByPrijmeni(pojistenci);
        } else if (this.sortColumn === 'vek') {
            pojistenci = this.sortByVek(pojistenci);
        } else if (this.sortColumn === 'telefon') {
            pojistenci = this.sortByTelefon(pojistenci);
        }

        let table = document.getElementById('table');
        let seznam = document.getElementById('container-seznam');
        let btnTisk = document.getElementById('btn-print');

        // vymazani obsahu tabulky
        table.innerHTML = '';

        let thead = document.createElement('thead');
        thead.id = 'table-head';
        let tr = document.createElement('tr');
        let headings = ['ID', 'Jméno', 'Věk', 'Telefon'];

        for (let i = 0; i < headings.length; i++) {
            let th = document.createElement('th');
            th.textContent = headings[i];
            /*sipky do th*/
            let sipky = document.createElement('span');
            sipky.textContent = '▼▲';
            sipky.id = 'sipky';
            th.appendChild(sipky);

            /*end sipky do th*/
            if (headings[i] === 'ID') {
                th.id = 'idHeader';
            } else if (headings[i] === 'Jméno') {
                th.id = 'jmenoHeader';

            }
            else if (headings[i] === 'Věk') {
                th.id = 'vekHeader';
            } else if (headings[i] === 'Telefon') {
                th.id = 'telefonHeader';
            }
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        // Prida radky s pojistenci do tabulky pokud existuji nejaci pojistenci
        if (pojistenci.length > 0) {
            for (let pojistenec of pojistenci) {
                let row = table.insertRow();
                row.insertCell().innerHTML = Number(pojistenec.idNum);
                row.insertCell().innerHTML = pojistenec.prijmeni + ' ' + pojistenec.jmeno;

                row.insertCell().innerHTML = pojistenec.vek;
                row.insertCell().innerHTML = Number(pojistenec.tel);

                let bunkaSmazatEdit = row.insertCell();
                bunkaSmazatEdit.id = 'bunka-smazat-edit';
                bunkaSmazatEdit.appendChild(this.tlacitkoSmazat(pojistenec.idNum));
                bunkaSmazatEdit.appendChild(this.tlacitkoEdit(pojistenec.idNum));
            }
            seznam.style.display = 'block';
            btnTisk.style.display = 'block';
        } else {
            // smazani hlavicky tabulky
            table.deleteRow(0);
            seznam.style.display = 'none';
            btnTisk.style.display = 'none';
        }
        // proklikavaní řadící hlavičky
        const idHeader = document.getElementById('idHeader');
        if (idHeader) {
            idHeader.addEventListener('click', () => {
                this.sortColumn = 'idNum';
                this.sortRefreshTabulku();
            })
        };


        const jmenoHeader = document.getElementById('jmenoHeader');
        if (jmenoHeader) {
            jmenoHeader.addEventListener('click', () => {
                this.sortColumn = 'jmeno a prijmeni';
                this.sortRefreshTabulku();
            });
        }

        const vekHeader = document.getElementById('vekHeader');
        if (vekHeader) {
            vekHeader.addEventListener('click', () => {
                this.sortColumn = 'vek';
                this.sortRefreshTabulku();
            });
        }

        const telefonHeader = document.getElementById('telefonHeader');
        if (telefonHeader) {
            telefonHeader.addEventListener('click', () => {
                this.sortColumn = 'telefon';
                this.sortRefreshTabulku();
            });
        }

    }

    // kontrola vyplneni vsech inputu
    kontrolaInput() {
        if (this.inputJmeno.value === '' || this.inputPrijmeni.value === '' || this.inputTelefon.value === '' || this.inputVek.value === '') {
            this.vyplnenaPole = false;
        } else {
            this.vyplnenaPole = true;
        }
        this.firstRun = false;
    }

    tlacitkoUloz() {
        const saveButton = document.getElementById('btn-uloz');
        if (saveButton) {
            saveButton.addEventListener('click', () => this.uloz());
        }
    }

    sortRefreshTabulku() {
        this.sortTabulku = !this.sortTabulku;
        this.generatorTabulky();
    }

    uloz() {
        this.kontrolaInput();

        let pojistenci = nacistZLocalStorage();

        if (pojistenci.length > 0) {
            this.idNum = pojistenci[pojistenci.length - 1].idNum + 1;
        }



        if (this.vyplnenaPole === true) {
            const idNum = this.idNum;
            const jmeno = this.inputJmeno.value;
            const prijmeni = this.inputPrijmeni.value;
            const tel = this.inputTelefon.value;
            const vek = this.inputVek.value;

            let pojistenci = nacistZLocalStorage();

            pojistenci.push({ idNum, jmeno, prijmeni, vek, tel });
            ulozDoLocalStorage(pojistenci);
            this.generatorTabulky()
            this.vymazatInputPole();



            const hlaskaElement = document.querySelector('#chybovaHlaska');
            if (hlaskaElement) {
                hlaskaElement.remove();
            }
        } else {
            // zobrazeni chybove hlasky
            const hlaskaElement = document.querySelector('#chybovaHlaska');
            if (!hlaskaElement) {
                const chybovaHlaska = document.createElement('div');
                chybovaHlaska.id = 'chybovaHlaska';
                chybovaHlaska.textContent = 'Vyplňte všechna pole!';
                chybovaHlaska.classList.add('message');

                // append this to div with id='chybovaHlaskaDiv' 
                const chybovaHlaskaDiv = document.getElementById('chybovaHlaskaDiv');
                chybovaHlaskaDiv.appendChild(chybovaHlaska);
            }

        }
    }
}

const regPojistence = new RegPojistence();
regPojistence.nacistPriStartu();
regPojistence.tlacitkoUloz();
regPojistence.tlacitkoTisk();




