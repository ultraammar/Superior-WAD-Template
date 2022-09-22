const currencyList =document.querySelectorAll(".currency-list select");
const fromCurrency =document.querySelector(".currency-list .from select");
const toCurrency =document.querySelector(".currency-list .to select");
getButton = document.querySelector(".formsCust button");
for (var i = 0; i < currencyList.length; i++) {
  for (currency_code in country_list) {
    //console.log(curreny_code);
    let selected;
    if (i == 0){
      selected = currency_code == "USD" ? "selected" : "";
    }
    else if (i == 1){
      selected = currency_code == "NPR" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    currencyList[i].insertAdjacentHTML("beforeend", optionTag);

  }
}


getButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
})


function getExchangeRate(){
  const apiKey = "b0fb19d04b5c3e14441a2868";

  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if(amount.value == "" || amount.value =="0"){
    amount.value = 1;
    amountVal = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url).then(response => response.json()).then(result =>{
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal*exchangeRate).toFixed(2);
      const exchangeRateTxt = document.querySelector(".rate-exchanged");

      exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
      console.log(exchangeRate);
  });
}
