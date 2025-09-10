import { config } from "@/config";

export function LogOut(setLogin) {
  localStorage.clear();
  setLogin(false);
}

export function showicon(e) {
  const resnav = document.getElementById("nav-items");
  resnav.style.display = "block";
}

export function RQ_Login(islogin) {
  if (!islogin) {
    // DiscordAUth();
  }
}

export function showcmenu() {
  const Cmenu = document.getElementById("cmenu");
  Cmenu.style.display = "block";
}

export function showcadmin() {
  const cadmin = document.getElementById("cadmin");
  cadmin.style.display = "block";
}

export function isAdmin(user, router) {
  let admin = false;
  const objuser = JSON.parse(user);
  if (!objuser) admin = false
  for (let x in config.Admin) {
    if (objuser?.uid == config.Admin[x]) {
      admin = true;
    }
  }

  if (!admin) {
    router.push("/");
  }
}
