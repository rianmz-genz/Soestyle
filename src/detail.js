let pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let thisId = JSON.parse(localStorage.getItem("thisid")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];

const payment = document.getElementById("payment");
const rincian = document.getElementById("rincian");

let now = new Date();

function getDayName(d) {
  var months = new Array(
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  );

  return months[d];
}
let threeday = now.getDay() + 3;
let rilThreeDay = getDayName(threeday);
let rilDay = getDayName(now.getDay());

let generatePesanan = () => {
    let mbh = daftarPesanan.filter(y=> y.datas.id === `${thisId}`)
  mbh.map((x) => {
    let { datas } = x;
    const angkaTotal = datas.basket.length;
    payment.innerHTML = `
       <div class="text-center">
        <p class="pembeliT">Detail Pesanan</p>
        <div class="detailPesananIsi">
            <span class="rincian-bayar">
                <p>Status</p>
                <p class="kanan">Di kirim</p>
            </span>
            <span class="rincian-bayar">
                <p>Total Pembayaran</p>
                <p class="kanan">Rp.${datas.totalfixbanget}</p>
            </span>
            <span class="rincian-bayar">
            <p>Metode Pembayaran</p>
            <img src="${datas.pay}" />
            </span>
            <span class="rincian-bayar">
                <p>Order Id</p>
                <p class="kanan">${datas.id}</p>
            </span>
            <span class="rincian-bayar">
                <p>Tanggal Pengiriman</p>
                <p class="kanan">${rilDay}, ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}</p>
            </span>
        </div>
       </div>
       <div class="text-center">
        <p class="pembeliT">Pesanan Kamu (${angkaTotal})</p>
        <div id="barangPesanan"></div>
        </div>
        <div id="ingfoPembeli"></div>
       `;
    document.getElementById("barangPesanan").innerHTML = datas.basket
      .map((x) => {
        let { id, item } = x;
        const daftaritem = shopItemsData.find((y) => y.id === id) || [];
        let { img, price, name, desc } = daftaritem;
        return `
        <div class="pesanan-list">
            <div class="pesanan-gambar">
                <img src="${img}" />
            </div>
            <div class="pesanan-detail">
                <p class="titleProduct">${name}</p>
                <p>${desc}</p>
                <p>Rp.${price.toLocaleString("id-ID")}</p>
            </div>
            <div class="pesanan-pcs">
            <p>${item}x</p>
            </div>
        </div>
        `;
      })
      .join("");
    document.getElementById("ingfoPembeli").innerHTML = datas.tumbas.map(
      (x) => {
        let { nama, wa, kab, kec, kel, comment, jln } = x;
        let hadiah = false;
        if (comment === "") {
        } else {
          hadiah = true;
        }
        return `
        <div class="text-center">
        <p class="pembeliT">Informasi Penerima</p>
         <div class="isi-ingfo-pembeli">
            <p class="isi-kiri">Nama</p>
            <p class="isi-kanan">${nama} </p>
         </div>
         <div class="isi-ingfo-pembeli">
            <p class="isi-kiri">Nomor Wa</p>
            <p class="isi-kanan">${wa} </p>
         </div>
         <div class="isi-ingfo-pembeli">
            <p class="isi-kiri">Alamat</p>
            <p class="isi-kanan">${kab}, ${kec}, ${kel},${jln} </p>
         </div>
         <div class="isi-ingfo-pembeli">
            <p class="isi-kiri">Estimasi Diterima</p>
            <p class="isi-kanan">${rilThreeDay}, ${
          now.getDate() + 3
        }-${now.getMonth()}-${now.getFullYear()}</p>
         </div>
         ${
           hadiah ?
           `
         <p style="margin-bottom:1rem; color: #298E0C;"><i class="bi bi-gift"></i> Dikirim sebagai hadiah</p>
         <div class="bordered">
            <div class="isi-ingfo-pembelih">
             <p class="isi-kiri">Pesan</p>
             <p class="isi-kanan">${comment}</p>
            </div>
         </div>
         `: ""
         }

        </div> 
        <div class="cancelBtn" onclick="cancelPesanan()">Batalkan Pesanan</div>
        `;
      }
    );
  });
};
generatePesanan();

let cancelPesanan = () => {
  let filtered = daftarPesanan.filter(y=> y.datas.id !== `${thisId}`)
  localStorage.setItem("daftarpesanan", JSON.stringify(filtered));
  localStorage.removeItem("thisid");
  window.location.href = "pesanan.html";
};
let cancelPay = () => {
localStorage.removeItem("thisid");
  window.location.href = "pesanan.html";
};
