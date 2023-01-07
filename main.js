const siteBody = document.querySelector(".site-body");
const bodyColorChangerBtn = document.querySelector(".color-changer-btn");
const countryForm = document.querySelector(".country-form");
const countryInput = document.querySelector(".search-country-input");
const counrtyRegionSelect = document.querySelector(".region-filter-select");
const countryList = document.querySelector(".country-list");
const countryTemplate = document.querySelector(".country-template").content;
const countryOpenModalBtn = document.querySelector(".country-open-modal-btn");

const mainModal = document.querySelector(".main-modal");
const modalTitle = document.querySelector(".modal-title");
const modalFlagImg = document.querySelector(".modal-flag-img");
const modalRating = document.querySelector(".movie-modal-rating");
const modalRegionText = document.querySelector(".modal-region-text");
const modalCurrencyText = document.querySelector(".modal-currency-text");
const modalLanguagesText = document.querySelector(".modal-languages-text");
const modalSubregionText = document.querySelector(".modal-subregion-text");
const modalBordersText = document.querySelector(".modal-borders-text");
const modalMapLink = document.querySelector(".link-show-maps");
const modalCloseBtn = document.querySelector(".modal-close-btn");

const countryFragment = document.createDocumentFragment();
const country_API = "https://restcountries.com/v3.1/all";

function countryRender(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        countryList.innerHTML = "";
        let cloneCountryTemplate = countryTemplate.cloneNode(true);
        cloneCountryTemplate.querySelector(".country-item-img").src =
          item.flags.svg;
        cloneCountryTemplate.querySelector(
          ".country-item-img"
        ).alt = `${item.name.common}'s flag`;
        cloneCountryTemplate.querySelector(".country-item-title").textContent =
          item.name.common;
        cloneCountryTemplate.querySelector(
          ".country-item-population-text"
        ).textContent = `Population: ${item.population.toLocaleString()}`;
        cloneCountryTemplate.querySelector(
          ".country-item-region-text"
        ).textContent = `Region: ${item.region}`;
        cloneCountryTemplate.querySelector(
          ".country-item-capital-text"
        ).textContent = `Capital: ${item.capital}`;
        cloneCountryTemplate.querySelector(
          ".country-open-modal-btn"
        ).dataset.btnModalId = item.name.official;
        countryFragment.appendChild(cloneCountryTemplate);
      });
      countryList.appendChild(countryFragment);
    })
    .catch((err) => console.log(err));
}
countryRender(country_API);

counrtyRegionSelect.addEventListener("change", () => {
  if (counrtyRegionSelect.value == "europe") {
    countryRender("https://restcountries.com/v3.1/region/Europe");
  } else if (counrtyRegionSelect.value == "asia") {
    countryRender("https://restcountries.com/v3.1/region/asia");
  } else if (counrtyRegionSelect.value == "africa") {
    countryRender("https://restcountries.com/v3.1/region/africa");
  } else if (counrtyRegionSelect.value == "oceania") {
    countryRender("https://restcountries.com/v3.1/region/oceania");
  } else if (counrtyRegionSelect.value == "americas") {
    countryRender("https://restcountries.com/v3.1/region/americas");
  } else if (counrtyRegionSelect.value == "antarctic") {
    countryRender("https://restcountries.com/v3.1/region/antarctic");
  }
});

countryInput.addEventListener("keyup", () => {
  let searchedCountry = `https://restcountries.com/v3.1/name/${countryInput.value}`;
  countryRender(searchedCountry);
});

async function showModal(modalID, url) {
  let res = await fetch(url);
  let data = await res.json();

  let countryFindedItem = data.find((item) => item.name.official == modalID);
  modalTitle.textContent = countryFindedItem.name.official;
  modalFlagImg.src = countryFindedItem.flags.svg;
  modalRegionText.textContent = `Region: ${countryFindedItem.region}`;
  modalCurrencyText.textContent = `Currencies: ${Object.keys(
    countryFindedItem.currencies
  )}`;

  if (countryFindedItem.borders != undefined) {
    modalBordersText.textContent = `Border: ${countryFindedItem.borders}`;
  } else {
    modalBordersText.textContent = `Border: No borders`;
  }

  if (countryFindedItem.subregion != undefined) {
    modalSubregionText.textContent = `Subregion: ${countryFindedItem.subregion}`;
  } else {
    modalSubregionText.textContent = `Subregion: No Subregions`;
  }

  modalLanguagesText.textContent = `Language: ${Object.values(
    countryFindedItem.languages
  ).join(", ")}`;

  modalMapLink.href = countryFindedItem.maps.googleMaps;
}

countryList.addEventListener("click", function (evt) {
  if (evt.target.matches(".country-open-modal-btn")) {
    mainModal.classList.add("main-modal--on");
    showModal(evt.target.dataset.btnModalId, country_API);
  }

  modalCloseBtn.addEventListener("click", () => {
    mainModal.classList.remove("main-modal--on");
  });
});

bodyColorChangerBtn.addEventListener("click", () => {
  siteBody.classList.toggle("body-night");
});
