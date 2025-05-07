const countryInput = document.querySelector("#search-input");
const selectElement = document.querySelector("#choseRegion");
const mainElement = document.querySelector(".wrapper-main");
const wrapperDetail = document.querySelector(".wrapper-detail");

let timer;

const searchCountry = function () {
  nameInput = countryInput.value.toLowerCase();

  if (!nameInput.trim()) {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => showResult(data));
    return;
  }

  const url = `https://restcountries.com/v3.1/name/${nameInput}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const filtered = data.filter((country) =>
        country.name.common.toLowerCase().includes(nameInput)
      );
      showResult(filtered);
      // console.log(filtered);
    })
    .catch((error) => console.log(error));
};

const showResult = function (data) {
  const result = document.querySelector(".country-container");

  result.innerHTML = "";

  data.forEach((country) => {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper-result";
    const name = document.createElement("h3");
    const flag = document.createElement("img");
    const region = document.createElement("div");
    const population = document.createElement("div");
    population.className = "population";

    country.cca2.toLowerCase();

    name.innerText = country.name?.common
      ? country.name.common
      : "이름 정보 없음";
    region.innerText = country.region ? country.region : "지역 정보 없음";
    population.innerText = `👥${country.population.toLocaleString()}`;
    flag.src = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;

    wrapper.appendChild(flag);
    wrapper.appendChild(name);
    wrapper.appendChild(region);
    wrapper.appendChild(population);
    result.appendChild(wrapper);

    wrapper.addEventListener("click", () => {
      showDetail(country);
    });
  });
};

const showDetail = function (country) {
  const detail = document.createElement("aside");
  detail.className = "detail";
  wrapperDetail.innerHTML = "";
  const detailFlag = document.createElement("img");
  detailFlag.className = "detailFlag";
  const detailName = document.createElement("h3");
  const ulTag = document.createElement("ul");
  const officialName = document.createElement("ol");
  const detailCapital = document.createElement("ol");
  const detailPopulation = document.createElement("ol");
  const area = document.createElement("ol");
  const money = document.createElement("ol");
  const language = document.createElement("ol");
  const time = document.createElement("ol");
  const cancelBtn = document.createElement("button");

  detailFlag.src = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;

  detailName.innerText = country.name?.common
    ? country.name.common
    : "이름 정보 없음";

  officialName.innerText = country.name?.official
    ? `공식 명칭: ${country.name.official}`
    : "이름 정보 없음";

  detailCapital.innerText = country.capital?.[0]
    ? `수도: ${country.capital[0]}`
    : "수도 정보 없음";

  detailPopulation.innerText = `인구: ${country.population.toLocaleString()}`;

  area.innerText = `지역: ${country.region} / ${country.subregion}`;

  const currencyObj = country.currencies;
  // Object.keys(obj)는 객체의 키들을 배열로 반환
  const currencyKey = Object.keys(currencyObj)[0]; //KWR
  // console.log(currencyObj);
  // console.log(Object.keys(currencyObj));
  // console.log(currencyKey);
  money.innerText = `통화: ${country.currencies[currencyKey].name} (${country.currencies[currencyKey].symbol})`;

  const languageValues = Object.values(country.languages);
  language.innerText = `언어: ${languageValues.join(", ")}`;

  time.innerText = `시간: ${country.timezones[0]}`;

  cancelBtn.innerText = "닫기";

  ulTag.appendChild(officialName);
  ulTag.appendChild(detailCapital);
  ulTag.appendChild(detailPopulation);
  ulTag.appendChild(area);
  ulTag.appendChild(money);
  ulTag.appendChild(language);
  ulTag.appendChild(time);
  detail.appendChild(detailFlag);
  detail.appendChild(detailName);
  detail.appendChild(ulTag);
  detail.appendChild(cancelBtn);
  wrapperDetail.appendChild(detail);

  cancelBtn.addEventListener("click", () => {
    wrapperDetail.innerHTML = "";
  });
};

countryInput.addEventListener("input", () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    searchCountry();
  }, 300);
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      showResult(data);
    })
    .catch((error) => console.log(error));
});

selectElement.addEventListener("change", () => {
  const selectedValue = selectElement.value.toLowerCase();
  // console.log(selectedValue);
  if (selectedValue === "전체 대륙") {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => showResult(data))
      .catch((error) => console.log(error));
  } else {
    fetch(`https://restcountries.com/v3.1/region/${selectedValue}`)
      .then((response) => response.json())
      .then((data) => {
        showResult(data);
      })
      .catch((error) => console.log(error));
  }
});
