const searchCountry = function () {
  const countryInput = document.querySelector("#search-input").value;

  if (!countryInput.trim()) {
    alert("나라를 입력해 주세요!");
    return;
  }

  const url = `https://restcountries.com/v3.1/name/${countryInput}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showResult(data);
    })
    .catch((err) => console.error(err));
};

const showResult = function (data) {
  const result = document.querySelector(".country-container");

  result.innerHTML = "";

  data.forEach((country) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper-result";
    const name = document.createElement("div");
    const flag = document.createElement("img");
    const capital = document.createElement("div");

    const ticker = country.cca2.toLowerCase();

    name.innerText = country.name?.common
      ? country.name.common
      : "이름 정보 없음";
    capital.innerText = capital.innerText = country.capital?.[0]
      ? `수도: ${country.capital[0]}`
      : "수도 정보 없음";
    flag.src = `https://flagcdn.com/w320/${ticker}.png`;

    wrapper.appendChild(flag);
    wrapper.appendChild(name);
    wrapper.appendChild(capital);
    result.appendChild(wrapper);
  });
};
