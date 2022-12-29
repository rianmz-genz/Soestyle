let pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
let tumbas = JSON.parse(localStorage.getItem("pembeli")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let thisId = JSON.parse(localStorage.getItem("thisid")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let daftarPesanan = JSON.parse(localStorage.getItem("daftarpesanan")) || [];

let namaa = document.getElementById("namanya");
let waa = document.getElementById("wanya");
let bg = document.getElementById("bgchange");
let modal = document.getElementById("change");
let us = document.getElementById("username");
let nowa = document.getElementById("noWa");

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


  let closeModal = () => {
    bg.style.display = "none";
    modal.style.display = "none";
    bg.style.transition = ".35s"
    modal.style.transition = ".35s"
  }
  let openModal = () => {
    bg.style.display = "flex";
    modal.style.display = "block";
    bg.style.transition = ".35s"
    modal.style.transition = ".35s"
  }
  const check = (e) => {
    const form = new FormData(e.target);
    const uname = form.get("username");
    const nomer = form.get("noWa");
    const users = {uname, nomer} 
    
    bg.style.display = "none";
    modal.style.display = "none";
    bg.style.transition = ".35s"
    modal.style.transition = ".35s"
    nowa.value = ""
    us.value = ""
    localStorage.setItem("users", JSON.stringify(users))
    location.reload()
    return false;
}


let panggil = () => {
  if(users.uname !== undefined){

    namaa.innerHTML = "..."
    setInterval(() => {
      namaa.innerHTML = `${users.uname}`
    }, 1000);
    if(users.nomer === undefined){
      waa.innerHTML = "08123456789"
    }else{
      waa.innerHTML = "..."
      setInterval(() => {
        waa.innerHTML = `${users.nomer}`
      }, 1000);

    }
  }else{
    namaa.innerHTML = "Adrian Aji"
  }
}

panggil()

let logout = () => {
  localStorage.removeItem("daftarpesanan"); 
  localStorage.removeItem("pesanan"); 
  localStorage.removeItem("data"); 
  localStorage.removeItem("thisid"); 
  localStorage.removeItem("users"); 
  window.location.href = "login.html"
}