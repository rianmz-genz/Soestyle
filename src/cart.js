let ShoppingCart = document.getElementById("shopping-cart");
let Detailcart = document.getElementById("detailcart");
let label = document.getElementById("label");
let hadiah = document.getElementById("hadiah");
let titlee = document.getElementById("titlee");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */
let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let pesanIcon = document.getElementById("pesananAmount");
  let panjang = [daftarPesanan.length]
  pesanIcon.innerHTML = panjang.reduce(( x, y ) => x + y, 0)
  panjang.map(x=> {
    if(x === 0) {
      pesanIcon.style.display = "none";
    } else {
      pesanIcon.style.display = "flex";
    }
  })
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  if (basket.find((x) => x.item) === undefined) {
    cartIcon.style.display = "none";
  } else {
    cartIcon.style.display = "flex";
  }
};

calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 * ? When basket is blank -> show's Cart is Empty
 */

let generateCartItems = () => {
  if (basket.length !== 0) {
    titlee.innerHTML = `<h1>DaftarItem</h1><p onclick="clearCart()">Kosongin Keranjang</p>`;
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);
    Detailcart.innerHTML = `
    <div class="pay">
    <h2>Total Belanja :</h2>
    Rp.${amount}
    </div>
    `;
    ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name, desc } = search;
        return `
      <div class="cart-item">
      <div class="leftitem">
        <img width="100" src=${img} alt="" />
      </div>
        <div class="detailss">
          <div class="title-price-x">
            <div class="title-price">
              <p>${name}</p>
              <p>${desc}</p>
            </div>
            <i onclick="removeItem(${id})" class="bi bi-x-lg tutups"></i>
          </div>
          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg bgicon"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg bgicon"></i>
            </div>
          </div>
          <p class="cart-item-price">Rp.${price.toLocaleString("id-ID")}</p>
        </div>
      </div>
      `;
      })
      .join("");
  } else {
    titlee.style.display = "none";
    ShoppingCart.style.display = "none";
    Detailcart.style.display = "none";
    label.innerHTML = `
    <p style="display: flex; justify-content: center; align-items:center; width: 100%; height:100vh;">Keranjang kosong nih <i class="bi bi-emoji-dizzy"></i></p>
    `;
  }
};

generateCartItems();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
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

  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
      <form method="POST" enctype="multipart/form-data" onsubmit="return check(event)" class="forem" id="local">
      <div class="text-center">
      <p class="pembeliT">Informasi Pembeli</p>
        <label>
          <p for="nama">Nama Lengkap</p>
          <input type="text" name="nama" id="jeneng" placeholder="Adrian" class="inputan" required/>
        <label>
        <label>
          <p for="wa">Nomor Whatsapp</p>
          <input type="text" name="wa" id="nowa" class="inputan" placeholder="08 Berapa?" required/>
        <label>
        </div>
        <div class="text-center">
        <div class="inihadiah">
        <div class="hadiahtop">
          <i class="bi bi-gift"></i>
          <span>
            <h3>Kirim Sebagai Hadiah?</h3>
            <p class="">Informasi harga tidak akan muncul pada invoice yang didapat oleh penerima</p>
          </span>
          <input type="checkbox" id="checkboxx" onclick="display()"/>
        </div>
        <div id="contenttext" class="content">
        <p style="margin-top:1rem;">Pesan Khusus</p>
        <textarea type="text" id="comment" name="comment" class="inputan" placeholder="Selamat ulang tahun bro!"></textarea>
         </div>
         </div>
        </div>
        <div class="text-center" id="localdua">
        <p class="pembeliT">Detail Pengiriman</p>
          <label>
            <p for="kab">Kota/Kabupaten</p>
            <input type="text" name="kab" id="kab" placeholder="Banyumas" class="inputan" required/>
          <label>
          <label>
            <p for="kec">Kecamatan</p>
            <input type="text" name="kec" id="kec" class="inputan" placeholder="Purwokerto Timur" required/>
          <label>
          <label>
            <p for="kel">Kelurahan</p>
            <input type="text" name="kel" id="kel" class="inputan" placeholder="Arcawinangun" required/>
          <label>
          <label>
            <p for="jln">Detail Jalan</p>
            <textarea type="text" name="jln" id="jln" class="inputan" placeholder="contoh : Jl.Nyimeleng Rt 06 / Rw 02" required></textarea>
          <label>
          </div>
          </div>
          <div class="text-center">
          <p class="pembeliT">Pilih Jasa Pengiriman</p>
           <div class="psatu">
            <div class="pdua">
              <input type="radio" value="JNE" name="pengiriman" />
              <div class="ptiga">
                <img width="80" src="images/PJNE.png" />
                <span class="pempat">
                  <h2>JNE EXPRESS</h2>
                  <p>Rp.12.000</p>
                  <p>Estimasi 1 - 3 hari</p>
                </span>
              </div>
            </div>
           </div >
           <div class="psatu">
            <div class="pdua">
              <input type="radio" value="JNT"  name="pengiriman"/>
              <div class="ptiga">
                <img width="80" src="images/PJNT.png" />
                <span class="pempat">
                  <h2>JNT</h2>
                  <p>Rp.12.500</p>
                  <p>Estimasi 1-2 hari</p>
                </span>
              </div>
            </div>
           </div >
           <div class="psatu">
            <div class="pdua">
              <input type="radio" value="SICEPAT" name="pengiriman" />
              <div class="ptiga">
                <img width="80" src="images/PSICEPAT.png" />
                <span class="pempat">
                  <h2>SICEPAT</h2>
                  <p>Rp.13.000</p>
                  <p>Estimasi 1 hari</p>
                </span>
              </div>
            </div>
           </div >
          </div>
          <button class="myBtn" value="Submit">Lanjutkan</button>
      <form>
      `);
  } else return;
};
const date = new Date()
const generateId = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`

const check = (e) => {
  const form = new FormData(e.target);
  const nama = form.get("nama");
  const wa = form.get("wa");
  const comment = form.get("comment");
  const kab = form.get("kab");
  const kec = form.get("kec");
  const kel = form.get("kel");
  const jln = form.get("jln");
  const jasa = form.get("pengiriman");
  const data = {  nama, wa, comment, kab, kec, kel, jln, jasa };
  tumbas.push(data);
  localStorage.setItem("pembeli", JSON.stringify(tumbas));
  document.getElementById("nowa").value = "";
  document.getElementById("jeneng").value = "";
  document.getElementById("comment").value = "";
  document.getElementById("kab").value = "";
  document.getElementById("kec").value = "";
  document.getElementById("kel").value = "";
  document.getElementById("jln").value = "";
  pesanan.push({id:generateId, tumbas, basket})
  localStorage.setItem("pesanan", JSON.stringify(pesanan));
  window.location.href = "payment.html"
  return false;
};

const display = () => {
  let cheeek = document.getElementById("checkboxx");
  let ten = document.getElementById("contenttext");
  if (cheeek.checked == true) {
    ten.style.maxHeight = "400px";
    ten.style.transition = ".35s";
  } else {
    ten.style.maxHeight = "0px";
    ten.style.transition = ".35s";
  }
};

TotalAmount();

/**
 * ! Used to clear cart, and remove everything from local storage
 */

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
