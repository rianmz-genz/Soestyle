const check = (e) => {
    const form = new FormData(e.target);
    const uname = form.get("username");
    const pw = form.get("password");
    const users = {uname, pw} 
    localStorage.setItem("users", JSON.stringify(users))
    window.location.href = "index.html"
    return false;
}
const back = () => {
    window.location.href = "akun.html"
}

