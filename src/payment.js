let pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let thisId = JSON.parse(localStorage.getItem("thisid")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];



const payment = document.getElementById("payment");
const rincian = document.getElementById("rincian");



let paymentFc = () => {
    if(pesanan.length !== 0){
        pesanan.map((x)=> {
            let amount = basket
            .map((x) => {
              let { id, item } = x;
              let filterData = shopItemsData.find((x) => x.id === id);
              return filterData.price * item;
            })
            .reduce((x, y) => x + y, 0);


            let totalfix = 0;

            let search = pesanan.find(y=> y.id === x.id)
            search.tumbas.map((x)=>{
                if(x.jasa === "JNE"){
                    totalfix = amount + 12000
                }
                if(x.jasa === "JNT"){
                    totalfix = amount + 12500
                }
                if(x.jasa === "SICEPAT"){
                    totalfix = amount + 13000
                }
            })

            const angkaTotal = search.basket.length
            x.basket.map((x)=>{
                payment.innerHTML = `
                <form method="POST" enctype="multipart/form-data" onsubmit="return check(event)" class="text-center">
                    <p class="pembeliT">Metode Pembayaran</p>
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="pay-bca" value="images/bank-bca.svg"  required/>
                        </div>
                        <label for="pay-bca" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/bank-bca.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Bank Bca</p>
                                <p class="text-pay-kecil">Pembayaran ini menggunakan biaya admin</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="pay-bni" value="images/bank-bni.svg" required />
                        </div>
                        <label for="pay-bni" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/bank-bni.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Bank Bni</p>
                                <p class="text-pay-kecil">Pembayaran ini menggunakan biaya admin</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="pay-mandiri" value="images/bank-mandiri.svg"  required/>
                        </div>
                        <label for="pay-mandiri" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/bank-mandiri.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Bank Mandiri</p>
                                <p class="text-pay-kecil">Pembayaran ini menggunakan biaya admin</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="e-gopay" value="images/ewallet-gopay.svg"  required/>
                        </div>
                        <label for="e-gopay" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/ewallet-gopay.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Gopay</p>
                                <p class="text-pay-kecil">Pembayaran ini dicek otomatis</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="e-dana" value="images/ewallet-dana.svg" required/>
                        </div>
                        <label for="e-dana" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/ewallet-dana.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Dana</p>
                                <p class="text-pay-kecil">Pembayaran ini dicek otomatis</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="e-ovo" value="images/ewallet-ovo.svg"  required/>
                        </div>
                        <label for="e-ovo" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/ewallet-ovo.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">Ovo</p>
                                <p class="text-pay-kecil">Pembayaran ini dicek otomatis</p>
                            </div>
                        </label>
                    </div >
                    <div class="metode-pembayaran-list-item" >
                        <div class="radio">
                            <input type="radio" name="pay" id="e-shopeepay" value="images/ewallet-shopeepay.svg"  required />
                        </div>
                        <label for="e-shopeepay" class="wrapper-pay">
                            <div class="logo">
                                <img src="images/ewallet-shopeepay.svg" />
                            </div>
                            <div class="text-pay">
                                <p class="text-pay-besar">ShopeePay</p>
                                <p class="text-pay-kecil">Pembayaran ini dicek otomatis</p>
                            </div>
                        </label>
                    </div >
                    <button value="Submit" class="HomeBtn">Selesai</button>
                </form>
                <div class="text-center">
                
                <p class="pembeliT">Voucher & Kode Promo</p>
                <div class="voucher-wrapper">
                    <input type="text" style="text-transform: uppercase; font-weight:600;" placeholder="GRATISONGKIR" id="promo" />
                    <button onclick="pakai()">Pakai</button>
                </div>
                </div>
                <div class="text-center">
                    <p class="pembeliT">Rincian Pembayaran</p>
                    <div class="rincian-bayar">
                        <p style="font-weight:600;">Sub Total</p>
                        <p style="font-weight:600;">Rp.${amount}</p>
                    </div>
                    <div class="rincian-bayar">
                        <p style="font-weight:600;">Biaya Pengiriman</p>
                        <p id="ongkirs" style="font-weight:600;"></p>
                    </div>
                    <div class="rincian-bayar">
                        <p style="color:#298E0C; font-weight:600;">Potongan Harga</p>
                        <p style="color:#298E0C; font-weight:600;" id="potongan">Rp.0</p>
                    </div>
                    <div class="pay">
                    <h2 style="font-weight:600;">Total Belanja :</h2>
                    <div>
                    <p id="totalfix" style="font-weight:600; transition: .35s; transform:scale(.9);">Rp.${totalfix}</p>
                    <p id="totalfixbanget"style="font-weight:600; transition: .35s;"></p>
                    </div>
                    </div>
                </div>
                <div  class="text-center">
                    <div class="pesanan-top-total">
                    <p style="font-size:1.4rem">Barang Pesanan</p>
                    <p>(${angkaTotal} Barang)</p>
                    </div>
                    <div id="totalpesan">
                    </div>
                </div>
                `
            }).join("")
            const listpesan = document.getElementById("totalpesan")

            listpesan.innerHTML = search.basket.map(x=>{
                let {id, item} =x
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
                        <p>Rp.${price}</p>
                    </div>
                    <div class="pesanan-pcs">
                    <p>${item}x</p>
                    </div>
                </div>
                `
            }).join("")
        })
    
    }else{
        rincian.innerHTML = `<div class="text-center"><p>Pesanan Kosong</p></div>`
    }
}
paymentFc()

const ongkir = () => {
    pesanan.map((x)=> {
        let search = pesanan.find(y=> y.id === x.id)
        search.tumbas.map((x)=>{
            const ongkirs = document.getElementById("ongkirs")
            if(x.jasa === "JNE"){
                ongkirs.innerHTML = "Rp.12000"
            }
            if(x.jasa === "JNT"){
                ongkirs.innerHTML = "Rp.12500"
            }
            if(x.jasa === "SICEPAT"){
                ongkirs.innerHTML = "Rp.13000"
            }
        })
    })
    }
    ongkir()

    const pakai = () => {
        document.getElementById("potongan").innerHTML = "Rp.12000"
        if(pesanan.length !== 0){
            pesanan.map((x)=> {
                let amount = basket
                .map((x) => {
                  let { id, item } = x;
                  let filterData = shopItemsData.find((x) => x.id === id);
                  return filterData.price * item;
                })
                .reduce((x, y) => x + y, 0);
    
                let totalfix = 0;
                let totalfixbanget = 0;
    
                let search = pesanan.find(y=> y.id === x.id)
                search.tumbas.map((x)=>{
                    if(x.jasa === "JNE"){
                        totalfix = amount + 12000
                        totalfixbanget = (amount + 12000) - 12000
                    }
                    if(x.jasa === "JNT"){
                        totalfix = amount + 12500
                        totalfixbanget = (amount + 12500) - 12000
                    }
                    if(x.jasa === "SICEPAT"){
                        totalfix = amount + 13000
                        totalfixbanget = (amount + 13000) - 12000
                    }
                })

                document.getElementById("totalfixbanget").innerHTML = `Rp.${totalfixbanget}`
                document.getElementById("totalfix").style.textDecoration = "line-through"
            })
        }
    }

    let check = (e) => {
        const form = new FormData(e.target);
        const pay = form.get("pay");
        selesai(pay)
        return false;
    }

const cancelPay = () => {
    localStorage.removeItem("data")
    localStorage.removeItem("pembeli")
    localStorage.removeItem("pesanan")
    window.location.href = "cart.html";
}

let selesai = (pay) => {
    pesanan.map(x=> {
        let amount = x.basket
        .map((x) => {
          let { id, item } = x;
          let filterData = shopItemsData.find((x) => x.id === id);
          return filterData.price * item;
        })
        .reduce((x, y) => x + y, 0);

        let totalfix = 0;
        let totalfixbanget = 0;

        let search = pesanan.find(y=> y.id === x.id)
        search.tumbas.map((x)=>{
            if(x.jasa === "JNE"){
                totalfix = amount + 12000
                totalfixbanget = (amount + 12000) - 12000
            }
            if(x.jasa === "JNT"){
                totalfix = amount + 12500
                totalfixbanget = (amount + 12500) - 12000
            }
            if(x.jasa === "SICEPAT"){
                totalfix = amount + 13000
                totalfixbanget = (amount + 13000) - 12000
            }
        })

        let {id, basket , tumbas} = x
        let datas = {id, basket, tumbas , totalfixbanget, pay }
        daftarPesanan.push({datas})
        localStorage.setItem("daftarpesanan", JSON.stringify(daftarPesanan))
        localStorage.setItem("thisid", JSON.stringify(id))
        console.log(daftarPesanan)
        console.log(thisId)
    })
    localStorage.removeItem("pesanan")
    localStorage.removeItem("pembeli")
    localStorage.removeItem("data")
    window.location.href = "detail.html"
}

