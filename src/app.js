import axios from 'axios';

// sla de referentie op naar ons 'anker' element, de <ul> met id country-list
const countryList = document.getElementById('country-list');

async function fetchCountries() {
  try {
    const result = await axios.get('https://restcountries.com/v2/all');
    const countries = result.data;

    // sorteer de huidige data array op de populatie-property van elk land
    countries.sort((a, b) => {
      return a.population - b.population;
    });

    // geef de gesorteerde data array mee aan de functie die de elementen op de pagina injecteert
    createListItems(countries);

  } catch (e) {
    console.error(e);
  }
}

fetchCountries();

function createListItems(countries) {
  // dit had ook gemogen met een for-loop, maar het is gebruikelijker om hier map voor te gebruiken
  countries.map((country) => {
    // <li> element maken om alle informatie in op te slaan
    const countryElement = document.createElement('li');

    // <img> element maken voor de vlag
    const flagElement = document.createElement('img');
    flagElement.setAttribute('src', country.flag);
    flagElement.setAttribute('class', 'flag');
    // <img> aan ons <li> element toevoegen
    countryElement.appendChild(flagElement);

    // <span> element voor de naam
    const countryNameElement = document.createElement('span');
    countryNameElement.textContent = country.name;
    // we voegen een specifieke class toe op basis van de region, die het land een kleur geeft
    countryNameElement.setAttribute('class', getRegionClass(country.region));
    // <span> aan ons <li> element toevoegen
    countryElement.appendChild(countryNameElement);

    // <p> element voor de populatie
    const populationText = document.createElement('p');
    populationText.setAttribute('class', 'population');
    populationText.textContent = `Has a population of ${country.population} people`;
    // voeg <p> element toe aan <li> element
    countryElement.appendChild(populationText);

    countryList.appendChild(countryElement);
  });
}

// deze functie wordt voor elk land opnieuw aangeroepen en krijgt dan de region mee. Op basis daarvan
// voert de switch zijn vergelijking uit, en geeft dan de naam van de class mee die wij op het element zetten.
function getRegionClass(currentRegion) {
  switch (currentRegion) {
    case 'Africa':
      return 'blue';
    case 'Americas':
      return 'green';
    case 'Asia':
      return 'red';
    case 'Europe':
      return 'yellow';
    case 'Oceania':
      return 'purple';
    default:
      return 'default';
  }
}
