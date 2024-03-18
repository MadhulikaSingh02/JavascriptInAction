const BASE_URL =
  "https://v6.exchangerate-api.com/v6/db9dd06ef07d2112693c914d/pair/";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");

//Get all the countries inside the 2 dropdowns
for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    //console.log(currencyCode, countryList[currencyCode]);
    //Every currency code should be in each dropdown
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  //whenever there is a change in the select dropdown, update the flag
  select.addEventListener("change", (event) => {
    updateFlag(event.target); //this will give me where the change was made ..from dropdown or to dropdown
  });
}
function updateFlag(selectedDropdown) {
  //From the selected dropdown(To or from) , get the currency code
  let currencyCode = selectedDropdown.value;
  //From currency code , get the country code
  let country = countryList[currencyCode];
  let newImgSrc = `https://flagsapi.com/${country}/shiny/64.png`;

  const img = selectedDropdown.parentElement.querySelector("img");
  img.src = newImgSrc;
}

async function updateExchangeRate() {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = amountValue;
  }

  //lets create the URL

  let URL = `${BASE_URL}/${fromCurrency.value}/${toCurrency.value}`;
  let output = await fetch(URL);
  let response = await output.json();
  let exchangeRate = response.conversion_rate;
  let msg = document.querySelector(".msg");
  let text = `${amountValue} ${fromCurrency.value} =  ${
    exchangeRate * amountValue
  } ${toCurrency.value} `;
  msg.innerText = text;
}
button.addEventListener("click", (event) => {
  //Removes the default behaviour, the page is refreshingtoo fast and the queryparams are showing up.
  //we dont want that
  //Clicking on a "Submit" button, prevents it from submitting a form.
  event.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => updateExchangeRate());
