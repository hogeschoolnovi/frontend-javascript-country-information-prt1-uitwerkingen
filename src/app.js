import axios from 'axios';

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
  // sla de referentie op naar ons 'anker' element, de <ul> met id country-list
  const countryList = document.getElementById('country-list');

  // OPTIE 1
  countryList.innerHTML = countries.map((country) => {
    return `
      <li>
        <img src="${country.flag}" alt="Vlag van ${country.name}" class="flag" />
        <span class="${getRegionClass(country.region)}">${country.name}</span>
        <p class="population">Has a population of ${country.population} people</p>
      </li>
    `;
  }).join('');

  // OPTIE 2 (dit had overigens ook gekunt met een for-loop!)
  // countries.map((country) => {
  //   // maak een li-element aan
  //   const countryElement = document.createElement('li');
  //
  //   // stop er een afbeelding, span en p in
  //   countryElement.innerHTML = `
  //     <img src="${country.flag}" alt="Vlag van ${country.name}" class="flag" />
  //     <span class="${getRegionClass(country.region)}">${country.name}</span>
  //     <p class="population">Has a population of ${country.population} people</p>
  //   `;
  //
  //   // voeg het list-element toe aan het ul-element
  //   countryList.appendChild(countryElement);
  // });
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
