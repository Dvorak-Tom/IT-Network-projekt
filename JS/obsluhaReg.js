import {ulozDoLocalStorage } from './obsluhaUloziste.js';
import { RegPojistence } from './RegPojistence.js';


const inputTel = document.getElementById('inputTel');
const inputVek = document.getElementById('inputVek');
const inputJmeno = document.getElementById('inputJmeno');
const inputPrijmeni = document.getElementById('inputPrijmeni');

const regPojistence = new RegPojistence();

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


// Define the file path of the JSON data file
const filePath = './JS/testovaciData.json';

// Function to load and store data in localStorage
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

// Get reference to the jsonLoader button
const jsonLoaderButton = document.getElementById('jsonLoader');

// Add event listener to the jsonLoader button
jsonLoaderButton.addEventListener('click', loadAndStoreData);
  