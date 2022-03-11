var i = 1;

let container = document.getElementById("container");
let record = document.getElementById("record");

container.addEventListener("scroll", check);

function check() {
  let x = container.scrollTop;
  let y = container.clientHeight;
  let currentHeight = Math.ceil(x + y);
  if (currentHeight >= container.scrollHeight) {
    let arr = JSON.parse(localStorage.getItem("countries"));
    let x = arr.splice(0, 24);
    localStorage.setItem("countries", JSON.stringify(arr));
    display(x);
    record.textContent = i;
  }
}

let result;

countries();

async function countries() {
  let res = await fetch(
    "https://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/poplution-countries-yearwise.json"
  );
  let data = await res.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Country Name"] !== "CountryName") {
      Object.defineProperty(
        data[i],
        "CountryName",
        Object.getOwnPropertyDescriptor(data[i], "Country Name")
      );
    }
    if (data[i]["Country Code"] !== "CountryCode") {
      Object.defineProperty(
        data[i],
        "CountryCode",
        Object.getOwnPropertyDescriptor(data[i], "Country Code")
      );
    }
    delete data[i]["Country Name"];
    delete data[i]["Country Code"];
  }

  let x = data.splice(0, 24);
  localStorage.setItem("countries", JSON.stringify(data));
  display(x);
}

function display(data) {
  data.map((item, idx) => {
    let item_div = document.createElement("div");
    item_div.setAttribute("class", "item_div");

    let p1 = document.createElement("p");
    p1.innerHTML = `<span>Country Name</span> - <span>${item.CountryName}</span>`;
    let p2 = document.createElement("p");
    p2.innerHTML = `<span>Country Code</span> - <span>${item.CountryCode}</span>`;
    let p3 = document.createElement("p");
    p3.innerHTML = `<span>Year</span> - <span>${item.Year}</span>`;
    let p4 = document.createElement("p");
    p4.innerHTML = `<span>Population</span> - <span>${item.Value}</span>`;
    let p5 = document.createElement("p");
    p5.innerHTML = `<span>Id</span> - <span>${i}</span>`;

    item_div.append(p1, p2, p3, p4, p5);

    container.append(item_div);
    i++;
  });
}
