let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let thisId = JSON.parse(localStorage.getItem("thisid")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];

let daftaritem = document.getElementById("daftaritem")

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

let generateIsi = () => {
  if(daftarPesanan.length !== 0 ){
    daftaritem.innerHTML = daftarPesanan.map(x=> {
      let {datas} = x
       return `
      <div class="borderedpesan" onclick="linked(${datas.id})">
      <div class="kiripesan">
        <i class="bi bi-box-seam"></i>
      </div>
      <div class="tengahpesan">
        <p style="font-weight:700; color: #333;">${datas.id}</p>
        <p>Sedang di kirim</p>
      </div>
      <div class="kananpesan">
      <i class="bi bi-chevron-right"></i>
      </div>
      </div>
      `
    }).join("")
  }else {
    document.getElementById("parent").style.display = "none";
    document.getElementById("label").innerHTML = `
    <p style="display: flex; justify-content: center; align-items:center; width: 100%; height:100vh;">Pesanan Kosong<i class="bi bi-emoji-dizzy"></i></p>
    `;
  }
}
generateIsi()



let linked = (id) => {
  localStorage.setItem("thisid", JSON.stringify(id))
  window.location.href = "detail.html"
  console.log(thisId)
}