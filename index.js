//Dark Mode Functions
const inputEl = document.querySelector(".dark-mode");
const bodyEl = document.querySelector("body");
inputEl.checked = JSON.parse(localStorage.getItem("mode"));
const inputs = document.querySelectorAll("input");
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

updateBody();
function updateBody() {
  if (inputEl.checked) {
    bodyEl.style.background = "black";
    bodyEl.style.color = "white";
    total.style.background = "none";
    total.style.border = "2px solid #ffffff";
  } else {
    bodyEl.style.background = "white";
    bodyEl.style.color = "black";
    total.style.border = "none";
  }
}

inputEl.addEventListener("input", () => {
  updateBody();
  UpdateLocalStorage();
});

function UpdateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}

// CRUD operations Functions

let mood = "create";
let tmp;
function getTotal() {
  if (price.value != "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(93, 12, 12)";
  }
}
//saving Data in Local Storage
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
 <td>${i + 1}</td>
 <td>${dataProduct[i].title}</td>
 <td>${dataProduct[i].price}</td>
 <td>${dataProduct[i].taxes}</td>
 <td>${dataProduct[i].ads}</td>
 <td>${dataProduct[i].discount}</td>
 <td>${dataProduct[i].total}</td>
  <td>${dataProduct[i].category}</td>
 <td><button onclick="updateData(${i})">update</button></td>
 <td><button id="deleteBtn" onclick="deleteData(${i})">delete</button></td>
 
</tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  const deleteAll = document.getElementById("deleteAll");

  if (dataProduct.length > 0) {
    deleteAll.innerHTML = `
<button id="deleteBtn" onclick="deleteAll ()">Delete All Data (${dataProduct.length}) </button>
`;
  } else {
    deleteAll.innerHTML = "";
  }
}

showData();

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  getTotal();
  count.style.display = "none";
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function Search(value) {
  let table = "";
  for (i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
 <td>${i + 1}</td>
 <td>${dataProduct[i].title}</td>
 <td>${dataProduct[i].price}</td>
 <td>${dataProduct[i].taxes}</td>
 <td>${dataProduct[i].ads}</td>
 <td>${dataProduct[i].discount}</td>
 <td>${dataProduct[i].total}</td>
  <td>${dataProduct[i].category}</td>
 <td><button onclick="updateData(${i})">update</button></td>
 <td><button id="deleteBtn" onclick="deleteData(${i})">delete</button></td>
 
</tr>`;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})">update</button></td>
        <td><button id="deleteBtn" onclick="deleteData(${i})">delete</button></td>
        
       </tr>`;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
