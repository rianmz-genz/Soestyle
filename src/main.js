let shop = document.getElementById("shop");
let details = document.getElementById("details");
let bg = document.getElementById("bg");
let pojok = document.getElementById("pojokkanan")

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */
let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price, overview } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3 class="title1">${name}</h3>
        <p class="title2">${desc}</p>
        <div class="overview">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-half"></i>
        <p>${overview}</p>
        </div>
        <div class="price-quantity">
          <p class="title3">Rp. ${price.toLocaleString("id-ID")} </p>
          <div class="buttons" id=btn>
            <i onclick="decrement(${id})" class="bi bi-dash-lg bgicon"></i>
             <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg bgicon"></i>
          </div>
        </div>
        <div id=tmbh class="onbutton" onclick="detail(${id})">
          Detail
          </div>
      </div>
    </div>
    `;
    })
    .join(""));
};

generateShop();


let findUser = () => {
if(users.uname !== undefined ){
  pojok.innerHTML = `
  <div class="isipesan">
  <span id="kabupaten">Hi! ${users.uname}</span>
  <span class="textpesan" id="textpesan"></span>
  </div>
  <i class="bi bi-truck bgiconb"></i>
  `
}else{
      return pojok.innerHTML = "<div class='loginBtn' onclick='gin()'>Login</div>"
    }
    if(daftarPesanan.length !== 0){
      document.getElementById("textpesan").innerHTML = `Ada ${daftarPesanan.length} pesanan nih!`;
    }else{
      document.getElementById("textpesan").innerHTML = `Belum ada pesanan`;
    }
}

findUser()

const gin = () => {
  window.location.href = "login.html"
}

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  if(users.uname === undefined){
    return window.location.href = "login.html"
  }
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerText = search.item;
  calculation();
};

// conditional render

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let pesanIcon = document.getElementById("pesananAmount");
  let panjang = [daftarPesanan.length];
  pesanIcon.innerHTML = panjang.reduce((x, y) => x + y, 0);
  panjang.map((x) => {
    if (x === 0) {
      pesanIcon.style.display = "none";
    } else {
      pesanIcon.style.display = "flex";
    }
  });
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  if (basket.find((x) => x.item) === undefined) {
    cartIcon.style.display = "none";
  } else {
    cartIcon.style.display = "flex";
  }
};
calculation();

let detail = (id) => {
  details.style.bottom = "0";
  bg.style.display = "block";
  let selected = id;
  return (details.innerHTML = shopItemsData
    .filter((x) => x.id === selected.id)
    .map((x) => {
      let { id, name, desc, img, price, overview } = x;
      return `
      <div class="wow">
      <i class="bi bi-x-circle tutup" onclick="closebtn()"></i>
      <img width="220" src=${img} alt="" />
      <div class="isidetail">
      <h3 class="titled1">${name}</h3>
      <p class="titled2">${desc}</p>
      <div class="overviewd">
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-half"></i>
      <p>${overview}</p>
      </div>
      <p class="titled3">Rp. ${price.toLocaleString("id-ID")} </p>
      <div id=tmbh class="onbutton" onclick="increment(${id})">
      Masukan Keranjang
      </div>
      <div>
      </div>
    `;
    }));
};

let closebtn = () => {
  details.style.bottom = "-85%";
  bg.style.display = "none";
};

// sticky
// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  stickySearch();
};

// Get the navbar
let search = document.getElementById("search");

var sticky = search.offsetTop;

// Get the offset position of the navbar

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickySearch() {
  if (window.pageYOffset >= sticky) {
    search.classList.add("sticky");
  } else {
    search.classList.remove("sticky");
  }
}

// kategori active

let category1 = document.getElementById("active1");
let category2 = document.getElementById("active2");
let category3 = document.getElementById("active3");
let category4 = document.getElementById("active4");
let category5 = document.getElementById("active5");
let category6 = document.getElementById("active6");

category1.addEventListener("click", () => {
  category1.classList.add("active");
  category2.classList.remove("active");
  category3.classList.remove("active");
  category4.classList.remove("active");
  category5.classList.remove("active");
  category6.classList.remove("active");
});
category2.addEventListener("click", () => {
  category2.classList.add("active");
  category1.classList.remove("active");
  category3.classList.remove("active");
  category4.classList.remove("active");
  category5.classList.remove("active");
  category6.classList.remove("active");
});
category3.addEventListener("click", () => {
  category3.classList.add("active");
  category2.classList.remove("active");
  category1.classList.remove("active");
  category4.classList.remove("active");
  category5.classList.remove("active");
  category6.classList.remove("active");
});
category4.addEventListener("click", () => {
  category4.classList.add("active");
  category2.classList.remove("active");
  category3.classList.remove("active");
  category1.classList.remove("active");
  category5.classList.remove("active");
  category6.classList.remove("active");
});
category5.addEventListener("click", () => {
  category5.classList.add("active");
  category2.classList.remove("active");
  category3.classList.remove("active");
  category4.classList.remove("active");
  category1.classList.remove("active");
  category6.classList.remove("active");
});
category6.addEventListener("click", () => {
  category6.classList.add("active");
  category2.classList.remove("active");
  category3.classList.remove("active");
  category4.classList.remove("active");
  category1.classList.remove("active");
  category5.classList.remove("active");
});
// let nammma = () => {
//   if (tumbas.nama === undefined) {
//     document.getElementById("kabupaten").innerHTML = "Belum ada pesanan";
//     document.getElementById("textpesan").innerHTML = "Jalan jalan dulu lah";
//   } else {
//     document.getElementById("textpesan").innerHTML = `${tumbas.nama}`;
//   }
// };
// nammma();