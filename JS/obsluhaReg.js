import { ulozDoLocalStorage } from './obsluhaUloziste.js';
import { RegPojistence } from './RegPojistence.js';


const inputTel = document.getElementById('inputTel');
const inputVek = document.getElementById('inputVek');
const inputJmeno = document.getElementById('inputJmeno');
const inputPrijmeni = document.getElementById('inputPrijmeni');

const regPojistence = new RegPojistence();

/*Prvni pismeno vzdy velke */
inputJmeno.addEventListener('input', function () {
    const capitalized = capitalizeFirstLetter(inputJmeno.value);
    inputJmeno.value = capitalized;
});

inputPrijmeni.addEventListener('input', function () {
    const capitalized = capitalizeFirstLetter(inputPrijmeni.value);
    inputPrijmeni.value = capitalized;
});

function capitalizeFirstLetter(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);
}

/*Omezeni na cisla */
inputTel.addEventListener('input', function () {
    const maxTel = 999999999;

    if (inputTel.value > maxTel) {
        inputTel.value = maxTel;
    }

});

inputVek.addEventListener('input', function () {
    const maxVek = 130;

    if (inputVek.value > maxVek) {
        inputVek.value = maxVek;
    }
});


// načtení testovacích dat
const filePath = './JS/testovaciData.json';

function loadAndStoreData() {
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            ulozDoLocalStorage(data);
            regPojistence.generatorTabulky();
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

const jsonLoaderButton = document.getElementById('jsonLoader');

jsonLoaderButton.addEventListener('click', loadAndStoreData);
