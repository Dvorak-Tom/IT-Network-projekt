import { nacistZLocalStorage, ulozDoLocalStorage } from './obsluhaUloziste.js';

class PojistenecHandler {
    constructor(idNum) {
        this.pojistenci = nacistZLocalStorage();
        this.pojistenec = this.pojistenci.find(pojistenec => pojistenec.idNum === idNum);
        this.pojistenec.idNum = parseInt(this.pojistenec.idNum);

        this.nacteniDat();
        this.ovladaniTlacitek();
        this.nacteniDatProEditor();

        this.pojistenci = nacistZLocalStorage();
        this.pojistenec = this.pojistenci.find(pojistenec =>
            pojistenec.idNum === idNum);
        console.log(this.pojistenec.jmeno)

        console.log(typeof this.pojistenec.idNum);
    }

    ulozit() {
        this.updateZEditoru();
        ulozDoLocalStorage(this.pojistenci);
    }

    smazat() {
        let prijmeni = document.getElementById('prijmeni').value;
        let telefon = document.getElementById('tel').value;
        this.pojistenci = this.pojistenci.filter(pojistenec =>
            pojistenec.prijmeni !== prijmeni ||
            pojistenec.tel !== telefon
        );
        if (confirm('Opravdu chcete smazat?')) {
            ulozDoLocalStorage(this.pojistenci);
            window.location.href = 'index.html';
        }
    }

    updateZEditoru() {
        this.pojistenec.jmeno = document.getElementById('jmeno').value;
        this.pojistenec.prijmeni = document.getElementById('prijmeni').value;
        this.pojistenec.vek = document.getElementById('vek').value;
        this.pojistenec.tel = document.getElementById('tel').value;
        this.pojistenec.poznamka = document.getElementById('poznamka').value;
        this.pojistenec.druhPojisteni = document.getElementById('druhPojisteni').value;
    }
    nacteniDatProEditor() {
        document.getElementById('jmeno').value = this.pojistenec.jmeno;
        document.getElementById('prijmeni').value = this.pojistenec.prijmeni;
        document.getElementById('vek').value = this.pojistenec.vek;
        document.getElementById('tel').value = this.pojistenec.tel;
        document.getElementById('poznamka').value = '';
        document.getElementById('druhPojisteni').value = this.pojistenec.druhPojisteni;
    }
    nacteniDat() {
        document.getElementById('info-idNum').textContent = this.pojistenec.idNum;
        document.getElementById('info-jmeno').textContent = this.pojistenec.jmeno;
        document.getElementById('info-prijmeni').textContent = this.pojistenec.prijmeni;
        document.getElementById('info-vek').textContent = this.pojistenec.vek;
        document.getElementById('info-tel').textContent = this.pojistenec.tel;
        document.getElementById('info-poznamka').textContent = this.pojistenec.poznamka;
        document.getElementById('info-druhPojisteni').textContent = this.pojistenec.druhPojisteni;
    }

    ukazEditor() {
        document.getElementById('container-editor').style.display = 'block';
        document.getElementById('container-info').style.display = 'none';
    }

    ovladaniTlacitek() {
        document.getElementById('btn-edit').addEventListener('click', () => this.ukazEditor());
        document.getElementById('btn-ulozit').addEventListener('click', () => {
            this.ulozit();
            this.nacteniDat();
            document.getElementById('container-editor').style.display = 'none';
            document.getElementById('container-info').style.display = 'block';
        });
        document.getElementById('btn-smazat').addEventListener('click', () => this.smazat());
    }


}

let urlParams = new URLSearchParams(window.location.search);

let idNum = urlParams.get('idNum');
idNum = parseInt(idNum);
let jmeno = urlParams.get('jmeno');
let prijmeni = urlParams.get('prijmeni');
let vek = urlParams.get('vek');
let telefon = urlParams.get('telefon')

new PojistenecHandler(idNum, jmeno, prijmeni, vek, telefon);

